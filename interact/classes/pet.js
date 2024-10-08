import * as PetUtils from '/utils/pet-utils.js';
import * as EmoteUtils from '/utils/emote-utils.js';
import { isFood } from '/utils/interact-utils.js';
import { isColliding } from '/utils/collision.js';
import { randomFromArray } from '/utils/general-utils.js';
import { createPopupMsg } from '/utils/popup-box.js'; 
import { pseudoTypeSearch } from '/ui/helpers/search-bar/search-bar-utils.js';

class Pet {
    constructor(createParams, petInfo) {
        this.type = petInfo.type.toLowerCase(); // Type and subtype must be lowercase to get correct pet image
        this.subtype = petInfo.subtype.toLowerCase();
        this.petInfo = petInfo;
        this.poses = PetUtils.getPoses(this.type, this.subtype);
        this.outerEl = this.#createEls(createParams);

        // For tracking exiting container
        this.parentContainerEl = createParams.parentContainerEl;
        this.exitedContainer = false;

        // Initialize behavior vars
        this.events = [];
        this.moving = false;
        this.ongoingEvent = null;
        this.currentLoopID = null;
        this.initActiveTypeSettings();

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
    async handleFood(food) {
        if (!isFood(food)) return;

        // Prevent gerbil from eating gerbils
        if (food.getImgSrc().includes('gerbil')) {
            createPopupMsg({content: `That's cannibalism!`, waitTime: 2000});
            await this.emote.emojiEmote('❓');
            return new Promise((resolve)=> {resolve(true)});
        }
        else return new Promise(async (resolve)=> {
            if (!food.imgLoaded) await waitUntilImgLoaded(food.img);

            resolve(true);
            
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

    /* Activity levels */
    initActiveTypeSettings(initType='normal') {
        this.activeIndex = {
            'normal': {breathTime: 2, anim: 'squish', icon: '😎', alerts: ['is up and ready to go!']},
            'relaxed': {breathTime: 4, anim: 'smoosh', icon: '🌿', alerts: ['is feeling cozy', 'purrs contentedly', 'is chilling']}
        };
        this.setActiveType(initType, false); // Update active level and don't send a popup message about it
    }

    displayActiveType() {
        const type = this.activeIndex[this.activeType];
        this.animate(type.anim, type.breathTime);
    }

    setActiveType(type, sendAlert=true) {
        this.activeType = type;
        const info = this.activeIndex[type];
        this.breathTime = info.breathTime;
        if (sendAlert) {
            const alert = info.icon + ' ' + this.petInfo.firstName + ' ' + randomFromArray(info.alerts);
            createPopupMsg({content: alert});
        }
    }

    excite(change) {
        // Don't excite more if at max level of excitation
        if (this.activeType === 'normal') return;

        // Else, update breath time and display active level
        this.breathTime -= change;
        const minBreathTime = this.activeIndex['normal'].breathTime;
        if (this.breathTime <= minBreathTime) this.setActiveType('normal');  // Clips breath time at normal
        this.displayActiveType();
    }

    relax(change) {
        // Don't relax more if at max level of relaxation
        if (this.activeType === 'relaxed') return;

        // Else, update breath time and display active level
        this.breathTime += change;
        const maxBreathTime = this.activeIndex['relaxed'].breathTime;
        if (this.breathTime >= maxBreathTime) this.setActiveType('relaxed'); // Clips breath time at relaxed
        this.displayActiveType();
    }

    animate(anim, animTime, timeFunc='cubic-bezier(0.280, 0.840, 0.420, 1)') {
        this.animEl.style.animation = `${anim} ${animTime}s ${timeFunc} infinite`;
    }

    /* Interaction */
    isThisColliding(place) {
        return isColliding(this.hitboxEl, place);
    }

    async handlePseudoTypeSearch() {
        const searchBarTextArea = document.getElementById('APjFqb');
        if (this.isThisColliding(searchBarTextArea).yes) pseudoTypeSearch();
    }

    pet(pettingTime) {
        this.emote.loveEmote();
        let action = 'Petted';
        if (pettingTime >= 5000) action = 'Cuddled with';
        else if (pettingTime >= 3000) action = 'Nuzzled';

        createPopupMsg({content: `❤️ ${action} ${this.petInfo.firstName}`, waitTime: 2000});
    }

    /* Movement */

    #moveCtrls() { // For testing movement
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

                pet.handleExitContainer();

                if (collisionInfo.yes) {
                    pet.moving = false;
                    clearInterval(pet.currentLoopID);
                    resolve(true);
                }
                else {
                    pet.handlePseudoTypeSearch();

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
    handleExitContainer() {
        const inContainer = this.isInContainer();
        // Just exited container, send message
        if (!this.exitedContainer && !inContainer) {
            createPopupMsg({content: `🙈 Hide and seek!`});
        }
        // Update exited container
        this.exitedContainer = inContainer;
    }

    isInContainer() {
        return this.isThisColliding(this.parentContainerEl).yes;
    }

    flip() {
        this.flipSide *= -1;
        this.flipEl.style.transform = `scaleX(${this.flipSide})`;
        this.flipEmoteContent();
    }

    flipEmoteContent() {
        this.emote.flipContent(this.flipSide);
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

    getRandomPose() {
        const allPoses = this.poses;
        const currentPose = this.currentPose;
        const newPoses = allPoses.filter(pose => pose !== currentPose); // Get all poses except current pose
        return randomFromArray(newPoses);
    }

    /* Init functions */

    #createEls(params) { // Create elements of pet, return outermost element
        this.scale = params.scale || 0.3; // Value resizes pet. Should only be positive.
        this.flipSide = params.flipSide || this.randomFlipSide(); // this.randomFlipSide(); // Either 1 or -1. 1 means facing right, -1 means facing left.
        this.anim = params.anim || 'squish';
        this.animTime = params.animTime || 2; // In seconds, larger value means slower
        this.currentPose = params.pose || this.getRandomPose();

        this.moveEl = PetUtils.createMoveEl(this.scale);
        this.flipEl = PetUtils.createFlipEl(this.flipSide);
        this.rigidEl = PetUtils.createRigidEl();
        this.hitboxEl = PetUtils.createHitboxEl();
        this.animEl = PetUtils.createAnimEl();
        this.animate(this.anim, this.animTime);
        this.imgEl = PetUtils.createImgEl(params.type, params.subtype, this.currentPose);

        this.emote = EmoteUtils.createEmote();
        this.flipEmoteContent(); // Flip emote content

        this.hitboxEl.appendChild(this.emote.containerEl);

        // Chain append with first element as innermost element and last element as outermost element. Return outermost element when done.
        const outerEl = PetUtils.chainAppend([this.imgEl, this.animEl, this.hitboxEl, this.rigidEl, this.flipEl, this.moveEl]);
        outerEl.classList.add('pet');
        return outerEl;
    }
}

export { Pet };