import * as PetUtils from '/interact/pet-utils.js';

class Pet {
    constructor(type) {
        this.type = type;
        this.container = this.#createEl();
        console.log(this.container);
    }

    #createEl() { // Create elements of pet, return outermost element
        this.moveEl = PetUtils.createMoveEl();
        this.flipEl = PetUtils.createFlipEl();
        this.animEl = PetUtils.createAnimEl();
        this.hitboxEl = PetUtils.createHitboxEl();
        this.imgEl = PetUtils.createImgEl();

        // Chain append with imgEl as innermost element and moveEl as outermost element. Return moveEl when done.
        return PetUtils.chainAppend([this.imgEl, this.hitboxEl, this.animEl, this.flipEl, this.moveEl]); 
    }
}