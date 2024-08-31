import { getBase64 } from '/utils/file.js';

class FormPage {
    constructor(name, title, desc) {
        this.name = name;
        this.title = title;
        this.desc = desc;
    }
}

class FormManager {
    constructor() {
        this.info = {}; // Dictionary for invalid inputs info, indexed by name
        this.stack = [];  // Stack of unique invalid inputs, by name
        this.savedInputs = {}; // Dictionary of saved inputs (valid and not blank), by name
        this.setType('gerbil');
    }

    /* Notes on semantics:
        - Inputs: input elements (i.e. free response)
        - Questions: input and select elements
        - Invalid: doesn't match pattern
        - Incomplete: required question with no answer (optional questions with no answer are considered complete)
        - Current questions: questions on current page
    */
    
    /* Public functions */
    setType(type) {
        this.info.type = type;
    }

    handleValidatePattern() {
        const inputs = this.#getAllInputs();
        inputs.forEach((input)=> {
            let lastValidValue = '';
            const self = this;
            input.addEventListener('input', function() { // for hard invalids (not blank), prevent user from changing input to invalid input
                const isInvalid = self.#validate(this);
                if (isInvalid) this.value = lastValidValue;
                else lastValidValue = this.value;
            })
        })
    }

    handleSaveInputs(currentPageEl) {
        const questions = this.#getCurrentQuestions(currentPageEl);
        const formManager = this;
        questions.forEach(q=> {
            // Save default value if not blank
            formManager.saveInput(q);
            
            // Save value on change if not blank and valid (invalid answers are prevented in handleValidatePattern)
            q.addEventListener('input', function() {
                formManager.saveInput(q);
            })
        })
    }

    checkCurrentQuestions(currentPageEl) {  
        if (!currentPageEl) {
            throw new Error('Invalid current page element: please input and/or initialize: ' + currentPageEl);
        }

        // Run through all questions and save if not blank (applies to required and optional questions).
        // If blank, set question value to '' for those with white space.

        const questions = this.#getCurrentQuestions(currentPageEl);
        let firstIncompleteAnswer = null;

        questions.forEach(q=> {
            const isRequired = this.#isRequired(q);
            const isBlank = q.value.trim() === '';

            if (isBlank) {
                q.value = '';
                if (isRequired && !firstIncompleteAnswer) {
                    firstIncompleteAnswer = q;
                }
            }
            else {
                this.#displayAsValid(q);
            }
        });

        // Invalidate first incomplete answer (applies to required questions) and add warning.

        if (firstIncompleteAnswer) {
            const ariaLabel = firstIncompleteAnswer.getAttribute('aria-label');
            const type = firstIncompleteAnswer.getAttribute('type');
            if (type === 'file') {
                this.#updateWarning(`Upload a ${ariaLabel}`);
            }
            else {
                this.#updateWarning(`Enter a ${ariaLabel}`);
            }
            this.#displayAsInvalid(firstIncompleteAnswer);
        }
        else { // Clear invalid inputs and warning
            this.clear();
        }

        return firstIncompleteAnswer;
    }

    clear() { // Clear invalid inputs and warning
        this.stack.forEach(name => {
            this.#displayAsValid(name);
        });
        this.#clearWarning();
        this.info = {};
        this.stack = [];
    }

    async saveInput(questionEl) {
        const name = questionEl.getAttribute('name');
        let value = questionEl.value.trim();
        if (value === '') return; // Don't save value if blank
        
        if (questionEl.type === 'file') {
            value = await getBase64(questionEl.files[0]);
            console.log('file', value);
        }

        this.savedInputs[name] = value;
        console.log('Saved input', name, value);
    }

    /* Private functions for form management */

    #getAllInputs() {
        return document.querySelectorAll('input');
    }

    #getCurrentQuestions(currentPageEl) {
        if (!currentPageEl) {
            throw new Error('No current page element initialized');
        }
    
        return currentPageEl.querySelectorAll('input, select');
    }

    #isRequired(questionEl) {
        const ariaRequired = questionEl.getAttribute('aria-required');
        return ariaRequired === 'true';
    }

    /* Private functions for storing invalid inputs */
    #has(name) {
        const indexInStack = this.stack.indexOf(name);
        const inStack = indexInStack !== -1;
        const inInfo = this.info.hasOwnProperty(name);

        if (inStack && inInfo) {
            return true;
        }
        else if (!inStack && !inInfo) {
            return false;
        }
        else {
            if (!inStack) throw new Error(`${name} in info, but not in stack: ${this.stack}`);
            else throw new Error(`${name} in stack, but not in info: ${this.info}`);
        }
    }

    #add(name, el, msg) {
        if (this.#has(name)) { // If input already invalid, update message only
            this.info[name].msg = msg;
        }
        else { // Create new input and log
            this.stack.push(name);
            this.info[name] = {
                el: el,
                msg: msg
            };
        }

        this.#displayAsInvalid(el);
    }

    #remove(name) {
        const indexInStack = this.stack.indexOf(name);

        // clear aria-invalid on element
        this.#displayAsValid(name);
        
        // remove from storage
        delete this.info[name];
        this.stack.splice(indexInStack, 1);

        // if no more invalid inputs, clear warning
        if (this.stack.length === 0) this.#clearWarning(); 
    }

    /* Private functions for validating input */

    #validate(el) { // Add if invalid, remove if valid and currently in invalid inputs
        const msg = this.#isInvalid(el);
        const name = el.getAttribute('name');

        if (msg) { // Hard invalid, make input red and add to invalid inputs
            this.#add(name, el, msg);
            return true;
        }
        else if (msg === '') { // Soft invalid, only prevent user from entering the value
            return true;
        }
        else {
            if (this.#has(name)) this.#remove(name);
            return false; // Return false if valid
        }
    }

    #isInvalid(el) { // If invalid, return message describing why invalid.
        const value = el.value;

        if (!el.checkValidity()) { // Doesn't match pattern
            return el.validationMessage;
        }   
        else if (el.maxLength != -1 && value.length > el.maxLength) { // Input is "number" type and is more than maxlength (maxLength not built-in for number)
            return ''; // Soft invalid, only prevent user from entering the value
        }
        else {
            return false; // Not invalid, return false
        }
    }

    #getQuestionIfName(x) { // If name, converts to question element. Else, returns (presumably) question element.
        if (x instanceof Element) { // Already is HTML element
            return x;
        }
        else if (typeof x === 'string') { // Return HTML element given name
            const isName = x in this.info;
            if (isName) {
                return this.info[x];
            }
            else {
                throw new Error(`Name doesn't exist in info: ${this.info}`);
            }
        }
        else {
            throw new Error(`Enter an element or name: ${x}`);
        }
    }

    #displayAsValid(x) {
        const el = this.#getQuestionIfName(x);
        el.setAttribute('aria-invalid', false);
    }

    #displayAsInvalid(x) {
        const el = this.#getQuestionIfName(x);
        el.setAttribute('aria-invalid', true);
        el.focus();
    }

    #updateWarning(msg) {
        if (msg === '') return;

        const warningContainer = document.querySelector('.warning');
        const warningText = document.querySelector('.warning-text');
        warningText.textContent = msg;
        warningContainer.style.display = 'block';
    }

    #clearWarning() {
        const warningContainer = document.querySelector('.warning');
        const warningText = document.querySelector('.warning-text');
        warningText.textContent = '';
        warningContainer.style.display = 'none';
    }
}

export { FormPage , FormManager };