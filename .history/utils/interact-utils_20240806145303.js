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

/* Position functions

    Note that isElAtPos, isTouching, and isPosInsideEl have similar code, but are semantically different and/or have different params.
    TODO: Refactor isElAtPos and isTouching into same function.
*/

function collisionLogic(toLeft, toRight, above, below) {
    const yes = !(toLeft || !toRight || !above || !below);
    return {
        yes: yes,
        toLeft: toLeft,
        toRight: toRight,
        above: above,
        below: below
    };
}

function isElAtPos(el, pos) { // Returns info on where pos is in relation to el.
    if (!pos.x || !pos.y) throw new Error('Position must have x and y defined', pos);
    const dims = el.getBoundingClientRect();
    return collisionLogic(pos.x < dims.left, pos.x > dims.right, pos.y > dims.top, pos.y < dims.bottom);
}

export { isInteractableEl, isInteractable, isFood, waitUntilImgLoaded, isElAtPos, isPosInsideEl };