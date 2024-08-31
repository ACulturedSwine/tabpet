class FormPage {
    constructor(name, title, desc) {
        this.name = name;
        this.title = title;
        this.desc = desc;
    }
}

class InvalidInputs {
    constructor() {
        this.info = {}; // Dictionary for invalid inputs info, indexed by aria-label
        this.stack = [];  // Stack of unique invalid inputs, by label
    }
    
    /* Public functions */
    validate(el) { // Add if invalid, remove if valid and currently in invalid inputs
        const msg = this.#isInvalid(el);
        const label = el.getAttribute('aria-label');

        if (msg) {
            this.#add(label, el, msg);
            return true;
        }
        else {
            if (this.#has(label)) this.#remove(label);
            return false; // Return false if valid
        }
    }

    clear() {
        this.list.forEach(label => {
            this.#displayValid(label);
        });
        this.#clearWarning();
    }

    /* Private functions */
    #has(label) {
        const indexInStack = this.stack.indexOf(label);
        const inStack = indexInStack !== -1;
        const inInfo = label in this.info; 

        if (inStack && inInfo) {
            return true;
        }
        else if (!inStack && !inInfo) {
            return false;
        }
        else {
            if (!inStack) throw new Error(`${label} in info, but not in stack`);
            else throw new Error(`${label} in stack, but not in info`);
        }
    }

    #add(label, el, msg) {
        if (label in this.info) { // If input already invalid, update message only
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
        this.info[label] = null;
        this.splice(indexInStack, 1);

        // if no more invalid inputs, clear warning
        if (this.stack.length === 0) this.#clearWarning(); 
    }

    #isInvalid(el) { // If invalid, return message describing why invalid.
        const value = el.value;
        const label = el.getAttribute('aria-label');

        if (!el.checkValidity()) { // Doesn't match pattern
            return el.validationMessage;
        }   
        else if (el.maxLength != -1 && value.length > el.maxLength) { // Doesn't match maxlength
            return `Enter a ${label} less than ${el.maxLength}`;
        }
        else {
            return false; // Not invalid, return false
        }
    }

    #displayValid(label) { // Label must already be in this.info to work
        if (label in this.info) {
            const el = this.info[label].el;
            el.setAttribute('aria-invalid', false);
        }
        else {
            console.error(`${label} not found in info: ${this.info}`);
        }
    }

    #displayInvalid(label, msg) { // Label must already be in this.info to work
        if (label in this.info) {
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

export { FormPage , InvalidInputs };