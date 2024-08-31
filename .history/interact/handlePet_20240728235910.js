import { Pet } from '/interact/classes/pet.js';

let interactContainer = document.getElementById('interact-container');

export function handlePet() {
    getInteractContainer();
    createPet();
}

function getInteractContainer() {
    return new Promise((resolve)=> {
        if (interactContainer) return;
        document.addEventListener('handleInteractable:interact-container-created', ()=> {
            interactContainer = document.getElementById('interact-container');
        }, {once: true});
    })
}

function createPet() {
    const pet = new Pet('gerbil');
    if (interactContainer) interactContainer.appendChild(pet);
}