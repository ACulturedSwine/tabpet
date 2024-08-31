import * as PetUtils from '/interact/utils/pet-utils.js';

class Pet {
    constructor(createParams, personalInfo) {
        this.type = createParams.type;
        this.outerEl = this.#createEls(createParams);
        this.outerEl.classList.add('pet');
        this.#pos(x, y);
    }

    #moveCtrls() {
        const keys = {
            w: ,

        }
        window.addEventListener('keydown', (e)=> {

        })
    }

    #move(xDis, yDis) { // Moves with regard to hitbox. Returns true if can move, false if can't.
        
    }

    #pos(x, y) {
        this.x = x;
        this.y = y;
        this.moveEl.style.transform =  
    }

    #createEls(params) { // Create elements of pet, return outermost element
        this.moveEl = PetUtils.createMoveEl(params);
        this.flipEl = PetUtils.createFlipEl();
        this.animEl = PetUtils.createAnimEl();
        this.hitboxEl = PetUtils.createHitboxEl();
        this.imgEl = PetUtils.createImgEl(params);

        // Chain append with imgEl as innermost element and moveEl as outermost element. Return outermost element when done.
        return PetUtils.chainAppend([this.imgEl, this.hitboxEl, this.animEl, this.flipEl, this.moveEl]); 
    }
}

export { Pet };