import * as PetUtils from '/interact/pet-utils.js';

class Pet {
    constructor(type) {
        this.type = type;
        this.container = this.#createEl();
    }

    #createEl() { // Create elements of pet, return outermost element
        this.moveEl = PetUtils.createMoveEl();
        this.flipEl = PetUtils.createFlipEl();
        this.animEl = PetUtils.createAnimEl();
        this.hitboxEl = PetUtils.createHitboxEl();
        this.imgEl = PetUtils.createImgEl();

        PetUtils.chainAppend(); // Chain 

        return this.moveEl;
    }
}