class Pet {
    constructor(type) {
        this.type = type;
        this.container = this.#createEl();
    }

    #createEl() { // Create elements of pet, return outermost element
        const imgEl = document.createElement('img');
        this.imgEl = imgEl;
    }
}