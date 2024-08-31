import { Pet } from '/interact/classes/pet.js';

const interactableContainer = document.getElementById('interactable-container');

export function handlePet() {
    
}

function createPet() {
    const pet = new Pet('gerbil');
    interactableContainer.appendChild(pet);
}