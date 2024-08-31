import { Pet } from '/interact/classes/pet.js';

let interactContainer = null;

export function handlePet() {
    getInteractContainer();
    createPet();
}

function getInteractContainer() {
    interactContainer = document.getElementById('interact-container');
    
}

function createPet() {
    const pet = new Pet('gerbil');
    if (interactableContainer) interactableContainer.appendChild(pet);
}