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
        this.list = [];  // Stack of invalid inputs, by label
    }

    add(label, el, msg) {
        this.info[label] = {
            el: el,
            msg: msg
        };
        this.list.push(label);
    }

    remove(label) {
        const indexInList = this.list.indexOf(label);
        const inInfo = label in this.info;
        let invalid = false;
        if (indexInList === -1) {
            console.error(`${label} not in list` + this.list);
        }
        if (indexInList === -1 || !inInfo) {
            return;
        }
        else {
            if () console.error(`${label} not in info: ` + this.info);
            if () 
        }
        this.info[label] = null;
        this.list.remove(label);
    
    }
}

export { FormPage };