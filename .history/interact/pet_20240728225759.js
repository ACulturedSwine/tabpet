class Pet {
    constructor(type) {
        this.type = type;
        this.container = this.#createEl();
    }

    #createEl() { // Create elements of pet, return outermost element
        const moveEl = document.createElement('div');
        const flipEl = document.createElement('flip');
        const animEl = document.createElement('div');
        const imgEl = document.createElement('img');
        imgEl

        this.imgEl = imgEl;

        return moveEl;
    }
}