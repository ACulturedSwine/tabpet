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
        this.list = new Set();  // Set of invalid inputs
    }
}

export { FormPage };