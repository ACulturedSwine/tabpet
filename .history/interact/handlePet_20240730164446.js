import { Pet } from '/interact/classes/pet.js';
import { randomFromRange, minAsMillisec } from '/content/utils/general-utils'; 

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
}

function handleBehavior() {
    const updateTime = 1000;

    behaviorLoopID = setInterval(async function() {
        if (pet.events.length > 0) {
            await pet.executeEvent(events[0]); // Execute first event in queue
            pet.events.shift(); // Remove first event when done
        }
        else if (!idleTimeoutID){ // Do random idle event after some time
            idleTimeoutID = setTimeout(idleEvent, randomIdleTime());
        }
    }, updateTime);
}

function idleEvent() {
    idleTimeoutID = null;
    return;
}

function randomIdleTime() {
    const min = 5 * 1000;
    const max = 60 * 1000;
    return randomFromRange(min, max);
}