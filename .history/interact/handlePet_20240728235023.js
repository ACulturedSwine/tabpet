import { Pet } from '/interact/classes/pet.js';

const interactableContainer = document.getElementById('interactable-container');

export function handlePet() {
    getInteractableContainer();
    createPet();
}

function createPet() {
    const pet = new Pet('gerbil');
    if (interactableContainer) interactableContainer.appendChild(pet);
}