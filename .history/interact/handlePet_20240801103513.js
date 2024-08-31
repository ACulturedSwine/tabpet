import { Pet } from '/interact/classes/pet.js';
import { randomFromRange, randomFromArray , minAsMillisec } from '/utils/general-utils.js'; 
import { getCursor } from '/utils/cursor-utils.js';
import { randomPosInsideEl } from '/utils/position.js';

let interactContainer = null;
let pet = null;
let idleTimeoutID = null;
let behaviorLoopID = null;

export async function handlePet() {
    interactContainer = await getInteractContainer();
    pet = await createPet();
    handleEvents();
    handleBehavior();
}

function getInteractContainer() {
    return new Promise((resolve)=> {
        let el = document.getElementById('interact-container');

        // Interact container already created, resolve
        if (el) resolve(el);

        // Wait for interact container to be created
        document.addEventListener('handleInteractable:interact-container-created', ()=> {
            resolve(document.getElementById('interact-container'));
        }, {once: true});
    })
}

function createPet() {
    return new Promise((resolve)=> {
        const createParams = {type: 'gerbil', subtype: 'white'};
        const personalInfo = getPersonalInfo();
        const pet = new Pet(createParams, personalInfo);
        if (interactContainer) interactContainer.appendChild(pet.outerEl);
        resolve(pet);
    })
}

function getPersonalInfo() {
    return {};
}

function handleEvents() {
    document.addEventListener('handleInteractable:interactable-created', (e)=> {
        const type = e.detail.type;
        const obj = e.detail.obj;
        if (type === 'food' && obj) pet.addInteractEvent('eat', {food: obj});
    });
    document.addEventListener('click', ()=> {
        if (!pet.ongoingEvent) moveToCursor();
    })
}

function handleBehavior() {
    const updateTime = 1000;

    behaviorLoopID = setInterval(async function() {
        if (pet.events.length > 0) {
            if (idleTimeoutID) clearTimeout(idleTimeoutID);
            const completed = await pet.executeEvent(pet.events[0]); // Execute first event in queue
            if (completed) pet.events.shift(); // Remove first event if completed, otherwise retain in queue to call again
        }
        else if (!idleTimeoutID){ // Do random idle event after some time
            idleTimeoutID = setTimeout(idleEvent, randomIdleTime());
        }
    }, updateTime);
}

/* Specific behavior */

function moveToCursor() {
    const cursor = getCursor();
    if (pet.)
    if (cursor.pos) pet.moveTo(cursor.pos);
}

/* Idle behavior */

function idleEvent() {
    console.log('idle event');
    
    const events = [
        randomPose,
        randomMove
    ];
    randomFromArray(events)();
    idleTimeoutID = null;
}

function randomIdleTime() {
    const min = minAsMillisec(1);
    const max = minAsMillisec(10);
    return randomFromRange(min, max);
}

function randomPose() {
    const allPoses = pet.poses;
    const currentPose = pet.currentPose;
    const newPoses = allPoses.filter(pose => pose !== currentPose); // Get all poses except current pose
    const randomPose = randomFromArray(newPoses);
    pet.setPose(randomPose);
}

function randomMove() {
    pet.moveTo(randomPosInsideEl(interactContainer));
}