import { Pet } from '/interact/classes/pet.js';

let interactContainer = null;

export async function handlePet() {
    interactContainer = await getInteractContainer();
    createPet();
}

function getInteractContainer() {
    return new Promise((resolve)=> {
        let el = document.getElementById('interact-container');
        if (el) resolve(el);
        
        document.addEventListener('handleInteractable:interact-container-created', ()=> {
            resolve(document.getElementById('interact-container'));
        }, {once: true});
    })
}

function createPet() {
    const pet = new Pet('gerbil');
    if (interactContainer) interactContainer.appendChild(pet);
}