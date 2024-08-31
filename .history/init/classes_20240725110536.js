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
        this.stack = [];  // Stack of invalid inputs, by label
    }

    add(label, el, msg) {
        this.info[label] = {
            el: el,
            msg: msg
        };
        this.stack.push(label);
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
        this.splice();
    }
}

export { FormPage };