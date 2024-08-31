import { Pet } from '/interact/classes/pet.js';

let interactContainer = null;

export async function handlePet() {
    interactContainer = await getInteractContainer();
    createPet();
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
    const createParams = {type: 'gerbil', color: 'white'};
    const pet = new Pet(createParams);
    if (interactContainer) interactContainer.appendChild(pet.outerEl);
}

function getPersonalInfo() {
    
}