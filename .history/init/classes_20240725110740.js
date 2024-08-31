class FormPage {
    constructor(name, title, desc) {
        this.name = name;
        this.title = title;
        this.desc = desc;
    }
}

class InvalidInputsStack {
    constructor() {
        this.info = {}; // Dictionary for invalid inputs info, indexed by aria-label
        this.stack = [];  // Stack of unique invalid inputs, by label
    }

    add(label, el, msg) {
        if (label in this.info) {

        }
        else { // Create new input and log
            this.stack.push(label);
        }
        if (!(label in this.info)) 
        this.info[label] = {
            el: el,
            msg: msg
        };
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

        this.info[label] = null;
        this.splice(indexInList, 1);
    }
}

export { FormPage };