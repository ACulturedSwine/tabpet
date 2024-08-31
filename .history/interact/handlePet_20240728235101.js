import { Pet } from '/interact/classes/pet.js';

let interactContainer = null;

export function handlePet() {
    getInteractContainer();
    createPet();
}

function getInteractContainer() {
    
}

function createPet() {
    const pet = new Pet('gerbil');
    if (interactableContainer) interactableContainer.appendChild(pet);
}