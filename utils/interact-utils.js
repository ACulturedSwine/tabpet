import { Interactable } from '/interact/classes/interactable.js';

/* Handling Interactables */

function isInteractableEl(el) { // Recursive function, returns interactable element by searching parents
    if (el.classList.contains('interactable')) return el;
    else if (el.classList.contains('interactable-child') && el.parentElement) return isInteractableEl(el.parentElement);
    else return null;
}

function isInteractable(x) {
    return x instanceof Interactable;
}

function isFood(food) {
    return isInteractable(food) && food.type === 'food';
}

/* Elements */
function waitUntilImgLoaded(imgEl) {
    return new Promise((resolve, reject)=> {
        if (!imgEl) reject('');

        imgEl.addEventListener('load', ()=>{
            resolve();
        });
    })
}

export { isInteractableEl, isInteractable, isFood, waitUntilImgLoaded };