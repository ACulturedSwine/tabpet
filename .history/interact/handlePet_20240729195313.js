import { Pet } from '/interact/classes/pet.js';
import { overlaps } from '/interact/utils/interact-utils.js';

let interactContainer = null;
let pet = null;

export async function handlePet() {
    interactContainer = await getInteractContainer();
    pet = await createPet();
    handleBehavior(pet);
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

function handleBehavior(pet) {
    if (!pet || !(pet instanceof Pet)) return;
    document.addEventListener('handleInteractable:interactable-created', (e)=> {
        const type = e.detail.type;
        if (type === 'food') {
            const ate = handleEatBehavior(pet, e.detail);
        }
    });
}

function handleEatBehavior(pet, detail) {
    const foodObj = detail.obj;
    if (!foodObj.imgLoaded) {
        foodObj.img.addEventListener('load', ()=> {
            this.imgLoaded = true;
        }, {once: true});
    }
    const touchingFood = overlaps(pet.hitboxEl, foodObj.el);
    if (touchingFood) pet.eat(foodObj);
    return touchingFood;
}

function handleMovement() {

}