import * as PetUtils from '/interact/utils/pet-utils.js';
import { isTouching, isFood } from '/interact/utils/interact-utils.js';

class Pet {
    constructor(createParams, personalInfo) {
        this.type = createParams.type;
        this.outerEl = this.#createEls(createParams);

        // Initialize behavior vars
        this.handlingFood = false;

        // Initialize movement vars
        this.speed = createParams.speed || 50;

        // Initial position
        let {x, y} = createParams;
        if (x && y) this.#pos(x, y);
        else this.#pos(0, 0);

        // Test movement
        this.#moveCtrls();
    }

    /* Macro behaviors */
    async handleFood(food) {
        if (this.handlingFood || !isFood(food)) return;
        
        this.handlingFood = true;

        if (!food.imgLoaded) {
            food.img.addEventListener('load', ()=> {
                food.imgLoaded = true;
            }, {once: true});
        }
        
        await this.#moveToEl(food.el);
        this.eat(food);
    }


    /* Micro behaviors */

    eat(food) {
        if (!isFood(food)) return;
        const updateTime = 1000;
        return new Promise((resolve)=> {
            let loopID = setInterval(function() {
                let finished = food.eat();
                if (finished) {
                    clearInterval(loopID);
                    resolve(true);
                }
            }, 1000);
        })
    }

    /* Interaction */
    touching(el) {
        return isTouching(this.hitboxEl, el);
    }

    /* Movement */

    #moveCtrls() {
        const keys = {
            w: this.#up.bind(this),
            a: this.#left.bind(this),
            s: this.#down.bind(this),
            d: this.#right.bind(this)
        }

        document.addEventListener('keydown', (e)=> {
            if (e.key in keys) keys[e.key]();
        })
    }

    #moveToEl(el) {
        const updateTime = 100;
        const pet = this;

        return new Promise((resolve)=> {
            const loopID = setInterval(function() {
                const collisionInfo = pet.touching(el);
                if (collisionInfo.touching) {
                    clearInterval(loopID);
                    resolve(true);
                }
                else {
                    if (collisionInfo.toLeft) pet.#left();
                    else if (collisionInfo.toRight) pet.#right();
                    if (collisionInfo.above) pet.#up();
                    if (collisionInfo.below) pet.#down();
                }
            }, updateTime);
        })
    }

    #move(xDis, yDis) { // Moves if hitbox not out-of-bounds. Returns true if can move, false if can't.
        let inBounds = true;
        if (inBounds) {
            if (xDis * this.flip < 0) this.#flip() // If xDis and scale are different signs, flip pet.
            this.#pos(this.x + xDis, this.y + yDis); 
        }
    }

    #pos(x, y) { // +x from left to right, +y from up to bottom
        this.x = x;
        this.y = y;
        this.moveEl.style.transform =  `scale(${this.scale}) translate(${x}px, ${y}px)`;
    }

    /* Micro functions for movement */
    #flip() {
        this.flip *= -1;
        this.flipEl.style.transform = `scaleX(${this.flip})`;
    }

    #up() {
        this.#move(0, -1 * this.speed);
    }
    #down() {
        this.#move(0, this.speed);
    }
    #left() {
        this.#move(-1 * this.speed, 0);
    }
    #right() {
        this.#move(this.speed, 0);
    }

    /* Init functions */

    #createEls(params) { // Create elements of pet, return outermost element
        this.scale = params.scale || 0.33; // Value resizes pet. Should only be positive.
        this.flip = params.flip || 1; // Either 1 or -1. 1 means facing right, -1 means facing left.
        this.anim = params.anim || 'squishing';

        this.moveEl = PetUtils.createMoveEl(this.scale);
        this.flipEl = PetUtils.createFlipEl(this.flip);
        this.rigidEl = PetUtils.createRigidEl();
        this.hitboxEl = PetUtils.createHitboxEl();
        this.animEl = PetUtils.createAnimEl(this.anim);
        this.imgEl = PetUtils.createImgEl(params.type, params.subtype);

        // Chain append with first element as innermost element and last element as outermost element. Return outermost element when done.
        const outerEl = PetUtils.chainAppend([this.imgEl, this.animEl, this.hitboxEl, this.rigidEl, this.flipEl, this.moveEl]);
        outerEl.classList.add('pet');
        return outerEl;
    }
}

export { Pet };