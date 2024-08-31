import * as PetUtils from '/interact/utils/pet-utils.js';

class Pet {
    constructor(createParams, personalInfo) {
        this.type = createParams.type;
        this.outerEl = this.#createEls(createParams);

        // Initialize movement vars
        this.speed = createParams.speed || 10;

        // Initial position
        let {x, y} = createParams;
        if (x && y) this.#pos(x, y);
        else this.#pos(0, 0);
    }

    #moveCtrls() {
        const keys = {
            w: this.#move(this.speed, ),

        }
        window.addEventListener('keydown', (e)=> {

        })
    }

    #move(xDis, yDis) { // Moves if hitbox not out-of-bounds. Returns true if can move, false if can't.
        let inBounds = true;
        if (inBounds) this.#pos(this.x + xDis, this.y + yDis);
    }

    #pos(x, y) {
        this.x = x;
        this.y = y;
        this.moveEl.style.transform =  `scale(${this.scale}) translate(${x}px, ${y}px)`;
    }

    /* Init functions */

    #createEls(params) { // Create elements of pet, return outermost element
        this.scale = params.scale || 1;

        this.moveEl = PetUtils.createMoveEl(this.scale);
        this.flipEl = PetUtils.createFlipEl();
        this.animEl = PetUtils.createAnimEl();
        this.hitboxEl = PetUtils.createHitboxEl();
        this.imgEl = PetUtils.createImgEl(params.type, params.subtype);

        // Chain append with imgEl as innermost element and moveEl as outermost element. Return outermost element when done.
        const outerEl = PetUtils.chainAppend([this.imgEl, this.hitboxEl, this.animEl, this.flipEl, this.moveEl]);
        outerEl.classList.add('pet');
        return outerEl;
    }
}

export { Pet };