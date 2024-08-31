class Pet {
    constructor(type) {
        this.type = type;
        this.container = this.#createEl();
    }

    #createEl() { // Create elements of pet, return outermost element
        const 
        const imgEl = document.createElement('img');
        imgEl

        this.imgEl = imgEl;

        return imgEl;
    }
}