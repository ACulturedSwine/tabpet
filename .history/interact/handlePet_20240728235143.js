import { Pet } from '/interact/classes/pet.js';

let interactContainer = document.getElementById('interact-container');

export function handlePet() {
    getInteractContainer();
    createPet();
}

function getInteractContainer() {
    if (interactContainer) return;
    
}

function createPet() {
    const pet = new Pet('gerbil');
    if (interactableContainer) interactableContainer.appendChild(pet);
}