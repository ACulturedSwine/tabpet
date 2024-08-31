import { getSpriteSrc } from "/utils/pet-info.js";

/* Appearance */

function getPoses(type, subtype) {
    let poses = [];
    if (type === 'gerbil') {
        poses = ['side', 'front'];
        switch(subtype) {
            case 'white':
                poses.push('stand');
                break;
            case 
        } 
        if (subtype === 'white') poses.push('stand');
    }
    return poses;
}

/* Handling elements */
function chainAppend(els) { // Given array of elements, append such that (n) element is parent of (n - 1) element
                            // Outermost elements are last
                            // Return outermost element
    if (!els || els.length == 0 || els.constructor !== Array) return null;

    const len = els.length;
    for (let i = 1; i < len; i++) els[i].appendChild(els[i - 1]);

    return els[len - 1];
}

function createMoveEl(scale) {
    const el = document.createElement('div');
    el.style.transform = `scale(${scale})`;
    el.classList.add('move');
    return el;
}

function createFlipEl(flip) {
    const el = document.createElement('div');
    el.style.transform = `scaleX(${flip})`;
    el.classList.add('flip');
    return el;
}

function createRigidEl() {
    const el = document.createElement('div');
    el.classList.add('rigid');
    return el;
}

function createAnimEl(anim) {
    const el = document.createElement('div');
    el.classList.add('anim');
    if (anim) el.classList.add(anim);
    return el;
}

function createHitboxEl() {
    const el = document.createElement('div');
    el.classList.add('hitbox');
    return el;
}

function createImgEl(type, subtype, pose) {
    const el = document.createElement('img');
    el.src = getSpriteSrc(type, subtype, pose);
    el.setAttribute('draggable', false);
    el.classList.add('sprite');
    return el;
}

export { getPoses, chainAppend, createMoveEl, createFlipEl, createRigidEl, createAnimEl, createHitboxEl, createImgEl };