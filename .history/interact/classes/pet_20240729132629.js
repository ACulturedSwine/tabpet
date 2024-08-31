import * as PetUtils from '/interact/utils/pet-utils.js';

class Pet {
    constructor(createParams, personalInfo) {
        this.type = createParams.type;
        this.outerEl = this.#createEls(createParams);
        this.outerEl.classList.add('pet');
    }

    #move() {
        const keys = {
            w: this.#up,

        }
        window.addEventListener('keydown', (e)=> {

        })
    }

    #pos() {

    }

    #createEls(params) { // Create elements of pet, return outermost element
        this.moveEl = PetUtils.createMoveEl();
        this.flipEl = PetUtils.createFlipEl();
        this.animEl = PetUtils.createAnimEl();
        this.hitboxEl = PetUtils.createHitboxEl();
        this.imgEl = PetUtils.createImgEl(params.type, params.subtype);

        // Chain append with imgEl as innermost element and moveEl as outermost element. Return outermost element when done.
        return PetUtils.chainAppend([this.imgEl, this.hitboxEl, this.animEl, this.flipEl, this.moveEl]); 
    }
}

export { Pet };