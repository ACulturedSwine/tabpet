import * as PetUtils from '/interact/utils/pet-utils.js';

class Pet {
    constructor(createParams, personalInfo) {
        this.type = createParams.type;
        this.outerEl = this.#createEls(createParams);
    }

    #createEls(params) { // Create elements of pet, return outermost element
        this.moveEl = PetUtils.createMoveEl();
        this.flipEl = PetUtils.createFlipEl();
        this.animEl = PetUtils.createAnimEl();
        this.hitboxEl = PetUtils.createHitboxEl();
        this.imgEl = PetUtils.createImgEl(params.subtype);

        // Chain append with imgEl as innermost element and moveEl as outermost element. Return moveEl when done.
        return PetUtils.chainAppend([this.imgEl, this.hitboxEl, this.animEl, this.flipEl, this.moveEl]); 
    }
}

export { Pet };