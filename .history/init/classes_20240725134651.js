class FormPage {
    constructor(name, title, desc) {
        this.name = name;
        this.title = title;
        this.desc = desc;
    }
}

class FormManager {
    constructor() {
        this.info = {}; // Dictionary for invalid inputs info, indexed by aria-label
        this.stack = [];  // Stack of unique invalid inputs, by label
        this.savedInputs = {}; // Dictionary of saved inputs (valid and not blank), by label
    }

    /* Notes on semantics:
        - Inputs: input elements (i.e. free response)
        - Questions: input and select elements
        - Invalid: doesn't match pattern
        - Incomplete: required question with no answer (optional questions with no answer are considered complete)
        - Current questions: questions on current page
    */
    
    /* Public functions */
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

    checkCurrentQuestions(currentPageEl) {  
        if (!currentPageEl) {
            throw new Error('Invalid current page element: please input and/or initialize: ' + currentPageEl);
        }

        // Run through all questions and save if not blank (applies to required and optional questions).
        // If blank, set question value to '' for those with white space.

        const questions = this.#getCurrentQuestions(currentPageEl);
        let firstIncompleteAnswer = null;

        questions.forEach(q=> {
            const isRequired = q.getAttribute('aria-required');
            const isBlank = q.value.trim() === '';
            const label = q.getAttribute('aria-label');
            if (isBlank) {
                q.value = '';
                if (isRequired && !firstIncompleteAnswer) firstIncompleteAnswer = q; 
            }
            else {
                this.#saveInput(q.)
            }
        });

        // Invalidate first incomplete answer (applies to required questions) and add warning.

        if (firstIncompleteAnswer) {
            const label = firstIncompleteAnswer.getAttribute('aria-label');
            this.#updateWarning(`Enter a ${label}`);
        }
        else { // Clear invalid inputs and warning
            this.clear();
        }

        return firstIncompleteAnswer;
    }

    clear() { // Clear invalid inputs and warning
        this.list.forEach(label => {
            this.#displayValid(label);
        });
        this.#clearWarning();
        this.info = {};
        this.stack = [];
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

    #saveInput(label, value) {
        this.savedInputs[label] = value;
    }

    /* Private functions for storing invalid inputs */
    #has(label) {
        const indexInStack = this.stack.indexOf(label);
        const inStack = indexInStack !== -1;
        const inInfo = this.info.hasOwnProperty(label);

        if (inStack && inInfo) {
            return true;
        }
        else if (!inStack && !inInfo) {
            return false;
        }
        else {
            if (!inStack) throw new Error(`${label} in info, but not in stack: ${this.stack}`);
            else throw new Error(`${label} in stack, but not in info: ${this.info}`);
        }
    }

    #add(label, el, msg) {
        if (this.#has(label)) { // If input already invalid, update message only
            this.info[label].msg = msg;
        }
        else { // Create new input and log
            this.stack.push(label);
            this.info[label] = {
                el: el,
                msg: msg
            };
        }

        this.#displayInvalid(label, msg);
    }

    #remove(label) {
        const indexInStack = this.stack.indexOf(label);

        // clear aria-invalid on element
        this.#displayValid(label);
        
        // remove from storage
        delete this.info[label];
        this.stack.splice(indexInStack, 1);

        // if no more invalid inputs, clear warning
        if (this.stack.length === 0) this.#clearWarning(); 
    }

    /* Private functions for validating input */

    #validate(el) { // Add if invalid, remove if valid and currently in invalid inputs
        const msg = this.#isInvalid(el);
        const label = el.getAttribute('aria-label');

        if (msg) { // Hard invalid, make input red and add to invalid inputs
            this.#add(label, el, msg);
            return true;
        }
        else if (msg === '') { // Soft invalid, only prevent user from entering the value
            return true;
        }
        else {
            if (this.#has(label)) this.#remove(label);
            return false; // Return false if valid
        }
    }

    #isInvalid(el) { // If invalid, return message describing why invalid.
        const value = el.value;
        const label = el.getAttribute('aria-label');

        if (!el.checkValidity()) { // Doesn't match pattern
            return el.validationMessage;
        }   
        else if (el.maxLength != -1 && value.length > el.maxLength) { // Input is "number" type and doesn't match maxlength (maxLength not built-in for number)
            return ''; // Soft invalid, only prevent user from entering the value
        }
        else {
            return false; // Not invalid, return false
        }
    }

    #displayValid(label) { // Label must already be in this.info to work
        if (this.#has(label)) {
            const el = this.info[label].el;
            el.setAttribute('aria-invalid', false);
        }
    }

    #displayInvalid(label, msg) { // Label must already be in this.info to work
        if (this.#has(label)) {
            // update warning
            this.#updateWarning(msg);

            // make input element invalid and focused
            const el = this.info[label].el;
            el.setAttribute('aria-invalid', true);
            el.focus();
        }
        else {
            console.error(`${label} not found in info: ${this.info}`);
        }
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