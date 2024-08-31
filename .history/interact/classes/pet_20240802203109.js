import * as PetUtils from '/utils/pet-utils.js';
import * as EmoteUtils from '/utils/emote-utils.js';
import { isFood } from '/utils/interact-utils.js';
import { isColliding } from '/utils/collision.js';

class Pet {
    constructor(createParams, petInfo) {
        this.type = createParams.type.toLowerCase(); // Type and subtype must be lowercase to get correct pet image
        this.subtype = createParams.subtype.toLowerCase();
        this.poses = PetUtils.getPoses(this.type, this.subtype);
        this.outerEl = this.#createEls(createParams);

        // Initialize behavior vars
        this.events = [];
        this.moving = false;
        this.ongoingEvent = null;
        this.currentLoopID = null;

        // Initialize movement vars
        this.speed = createParams.speed || 50;

        // Initial position
        let {x, y} = createParams;
        if (x && y) this.#pos(x, y);
        else this.#pos(0, 0);
    }

    /* Event handling */
    addInteractEvent(name, params) {
        if (!name || !params) return;
        const event = {name: name, params: params};
        this.events.push(event);
    }

    executeEvent(event) {
        const name = event.name;
        const params = event.params;
        const pet = this;

        pet.ongoingEvent = event;

        let eventCompleted = null;

        return new Promise(async (resolve)=> {
            switch(name) {
                case 'eat':
                    eventCompleted = await pet.handleFood(params.food);
                    break;
            }
            pet.ongoingEvent = null;
            resolve(eventCompleted);
        })
    }

    /* Events */
    handleFood(food) {
        if (!isFood(food)) return;
        
        return new Promise(async (resolve)=> {
            if (!food.imgLoaded) {
                food.img.addEventListener('load', ()=> {
                    food.imgLoaded = true;
                }, {once: true});
            }
            
            const movedToFood = await this.moveTo(food.el);
            if (movedToFood) {
                await this.eat(food);
                resolve(true);
            }
            else {
                resolve(false); // Handling food stopped, try again
            }
        })
    }


    /* Micro behaviors */

    eat(food) {
        if (!isFood(food)) return;
        const updateTime = 1000;
        const pet = this;
        return new Promise((resolve)=> {
            // Food emote
            const emoteObj = pet.emote;
            emoteObj.createEmote({content: emoteObj.randomEmoji('special', 'food')});
            
            // Take a bite every updateTime millseconds
            pet.currentLoopID = setInterval(function() {
                let finished = food.eat();
                if (finished) {
                    clearInterval(pet.currentLoopID);
                    resolve(true);
                }
            }, updateTime);
        })
    }

    /* Interaction */
    isThisColliding(place) {
        return isColliding(this.hitboxEl, place);
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

    moveTo(place) { // Place is either HTML Element or position (x, y)
        const updateTime = 50;
        const pet = this;

        if (this.moving) return false;

        return new Promise((resolve)=> {
            pet.moving = true;
            pet.setPose('side');

            pet.currentLoopID = setInterval(function() {
                let collisionInfo = null;
                try {
                    collisionInfo = pet.isThisColliding(place);
                }
                catch(error){
                    throw new Error(error);
                }

                if (collisionInfo.yes) {
                    pet.moving = false;
                    clearInterval(pet.currentLoopID);
                    resolve(true);
                }
                else {
                    if (collisionInfo.toLeft) pet.#left();
                    else if (collisionInfo.toRight) pet.#right();
                    if (collisionInfo.above) pet.#up();
                    if (collisionInfo.below) pet.#down();
                }
            }, updateTime);
        });
    }

    #move(xDis, yDis) { // Moves if hitbox not out-of-bounds. Returns true if can move, false if can't.
        let inBounds = true;
        if (inBounds) {
            if (xDis * this.flipSide < 0) this.flip() // If xDis and scale are different signs, flip pet.
            this.#pos(this.x + xDis, this.y + yDis); 
        }
    }

    #pos(x, y) { // +x from left to right, +y from up to bottom
        this.x = x;
        this.y = y;
        this.moveEl.style.transform =  `scale(${this.scale}) translate(${x}px, ${y}px)`;
    }

    /* Micro functions for movement */
    flip() {
        this.flipSide *= -1;
        this.flipEl.style.transform = `scaleX(${this.flipSide})`;
    }

    randomFlipSide() {
        let num = Math.random(); // Generates number in interval [0, 1)
        if (num < 0.5) return 1;
        else return -1;
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

    /* Appearance and animation */
    setPose(pose) {
        this.imgEl.src = chrome.runtime.getURL(`/assets/${this.type}/${this.subtype}/${pose}.png`);
    }

    /* Init functions */

    #createEls(params) { // Create elements of pet, return outermost element
        this.scale = params.scale || 0.3; // Value resizes pet. Should only be positive.
        this.flipSide = params.flipSide || Math.floor(Math.random()); // Either 1 or -1. 1 means facing right, -1 means facing left.
        this.anim = params.anim || 'squishing';
        this.currentPose = params.pose || 'side';

        this.moveEl = PetUtils.createMoveEl(this.scale);
        this.flipEl = PetUtils.createFlipEl(this.flipSide);
        this.rigidEl = PetUtils.createRigidEl();
        this.hitboxEl = PetUtils.createHitboxEl();
        this.animEl = PetUtils.createAnimEl(this.anim);
        this.imgEl = PetUtils.createImgEl(params.type, params.subtype, this.currentPose);

        this.emote = EmoteUtils.createEmote();
        this.hitboxEl.appendChild(this.emote.containerEl);

        // Chain append with first element as innermost element and last element as outermost element. Return outermost element when done.
        const outerEl = PetUtils.chainAppend([this.imgEl, this.animEl, this.hitboxEl, this.rigidEl, this.flipEl, this.moveEl]);
        outerEl.classList.add('pet');
        return outerEl;
    }
}

export { Pet };