import { Pet } from '/interact/classes/pet.js';

let interactContainer = 

export async function handlePet() {
    await getInteractContainer();
    createPet();
}

function getInteractContainer() {
    return new Promise((resolve)=> {
        let el = document.getElementById('interact-container');

        if (interactContainer) resolve(true);
        document.addEventListener('handleInteractable:interact-container-created', ()=> {
            resolve(document.getElementById('interact-container'));
        }, {once: true});
    })
}

function createPet() {
    const pet = new Pet('gerbil');
    if (interactContainer) interactContainer.appendChild(pet);
}