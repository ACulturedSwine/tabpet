/* TODO: allocate event handling to Event class & Behavior/Event Manager script (to stop() and start() events easily)
- Use settimeout
- Each event has their own timeout id
- Params to reset
*/
import { Pet } from '/interact/classes/pet.js';
import { randomFromRange, randomFromArray , minAsMillisec } from '/utils/general-utils.js'; 
import { getCursor } from '/utils/cursor-utils.js';
import { randomPosInsideEl } from '/utils/position.js';
import { getPetInfo } from '/utils/pet-info.js';
import { getCreatedElement, onMouseRelease } from '/utils/content-utils.js';
import { isSpecialDay } from '/utils/date.js';
import { createParticles } from '/utils/particle.js';
import { isColliding } from '/utils/collision.js';

let interactContainer = null;
let pet = null;
let idleTimeoutID = null;
let behaviorLoopID = null;
let petCooldownID = null;

export default async function handlePet() {
    interactContainer = await getCreatedElement('interact-container');
    pet = await createPet();
    handleEvents();
    handleBehavior();
    const specialDay = isSpecialDay();
    if (specialDay) pet.specialDay(specialDay);
    else randomEmote();
}

function createPet() {
    return new Promise(async (resolve)=> {
        let petInfo = await getPetInfo();
        if (!petInfo) throw new Error('Pet info not defined');

        const createParams = {type: petInfo.type, subtype: petInfo.subtype};
        const pet = new Pet(createParams, petInfo);
        if (interactContainer) interactContainer.appendChild(pet.outerEl);
        resolve(pet);
    })
}

function handleEvents() {
    document.addEventListener('handleInteractable:interactable-created', (e)=> {
        const type = e.detail.type;
        const obj = e.detail.obj;
        if (type === 'food' && obj) pet.addInteractEvent('eat', {food: obj});
    });
    document.addEventListener('click', (e)=> {
        if (!pet.ongoingEvent && !e.target.noPetFollow && e.target !== pet.imgEl) moveToCursor();
    })

    onMouseRelease(pet.imgEl, whilePetting, completePetting); // Pet action if click and release on pet
}

function createHeartParticles() {
    if (!interactContainer) return;
    const cursor = getCursor();
    if (isColliding(cursor.pos, pet.hitboxEl)) createParticles('heart', cursor.pos, interactContainer);
}

function whilePetting() {
    const id = setInterval(createHeartParticles, 500);
    return id;
}

function completePetting() {
    const petCooldownTime = 3000;
    if (!petCooldownID) {
        pet.pet();
        petCooldownID = setTimeout(function() {
            petCooldownID = null;
        }, petCooldownTime);
    }
}

function handleBehavior() {
    const updateTime = 1000;

    behaviorLoopID = setInterval(async function() {
        if (pet.ongoingEvent) return;
        if (pet.events.length > 0) {
            stopIdle();
            const completed = await pet.executeEvent(pet.events[0]); // Execute first event in queue
            if (completed) pet.events.shift(); // Remove first event if completed, otherwise retain in queue to call again
            await pet.emote.idleEmote();
        }
        else if (!idleTimeoutID){ // Do random idle event after some time
            idleTimeoutID = setTimeout(idleEvent, randomIdleTime());
        }
    }, updateTime);
}

/* Specific behavior */

function moveToCursor() {
    const cursor = getCursor();
    if (pet.moving && pet.currentLoopID) {
        clearInterval(pet.currentLoopID); // Stop current movement
        pet.moving = false; // Enable moveTo to be called again 
    }
    stopIdle();
    if (cursor && cursor.pos) pet.moveTo(cursor.pos);
}

/* Idle behavior */

function idleEvent() {
    console.log('idle event');
    
    const events = [
        randomPose,
        randomMove,
        randomEmote,
        randomFlip
    ];
    randomFromArray(events)();
    idleTimeoutID = null;
}

function stopIdle() {
    if (!idleTimeoutID) return;
    clearTimeout(idleTimeoutID);
    idleTimeoutID = null;
}

function randomIdleTime() {
    console.log('get idle time');
    const min = minAsMillisec(0);
    const max = minAsMillisec(1);
    return randomFromRange(min, max);
}

function randomPose() {
    if (pet.moving) return; // If pet is moving (pose is set as 'side'), don't change pose 
    const randomPose = pet.getRandomPose();
    pet.setPose(randomPose);
}

function randomMove() {
    pet.moveTo(randomPosInsideEl(interactContainer));
}

function randomEmote() {
    pet.emote.randomEmote();
}

function randomFlip() {
    pet.flip();
}