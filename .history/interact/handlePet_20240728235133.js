import { Pet } from '/interact/classes/pet.js';

let interactContainer = document.getElementById('interact-container');

export function handlePet() {
    getInteractContainer();
    createPet();
}

function getInteractContainer() {
    interactContainer = ;

}

function createPet() {
    const pet = new Pet('gerbil');
    if (interactableContainer) interactableContainer.appendChild(pet);
}