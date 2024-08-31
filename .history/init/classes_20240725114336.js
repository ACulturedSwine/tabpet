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
    addIfInvalid(el) {
        const value = el.value;
        const msg = this.#isInvalid(el, value);

        if (msg) {
            const label = el.getAttribute('aria-label');
            this.#add(label, el, msg);
        }
    }

    remove(label) {
        const indexInList = this.stack.indexOf(label);
        const inList = indexInList !== -1;
        const inInfo = label in this.info;

        if (!inList || !inInfo) {
            if (!inList) console.error(`${label} not in stack:` + this.stack);
            if (!inInfo) console.error(`${label} not in info: ` + this.info); 
            return;
        }

        // clear aria-invalid on element
        this.#displayValid(label);
        
        // remove from storage
        this.info[label] = null;
        this.splice(indexInList, 1);

        // if no more invalid inputs, clear warning
        if (this.stack.length === 0) this.#clearWarning(); 
    }

    clear() {
        this.list.forEach(label => {
            this.#displayValid(label);
        });
    }

    /* Private functions */
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

    #isInvalid(el, value) { // If invalid, return message describing why invalid.
                    // Currently, message is hard-coded, although it would be ideal to use the built-in reportMessage() instead.
                    // Which doesn't work for some reason, I'll have to check why
        if (el.min && value < el.min || el.max && value > el.max) { // Doesn't fit between min and max
            
        }

        if (!this.checkValidity()) { // Doesn't match pattern and not min/max
            return `Doesn't match pattern.`;
        }   
        else if (this.maxLength != -1 && this.value.length > this.maxLength) { // Doesn't match maxlength
            return `Enter a ${this.getAttribute('aria-label')} less than ${this.maxLength}`;
        }
        else { // skip invalid, update last valid value
            clearWarning();
            return false; // return false if invalid
        }
    
        return true; // return true if valid
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