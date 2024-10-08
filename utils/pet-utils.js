import { getSpriteSrc } from '/utils/pet-info.js';
import { chainAppend } from '/utils/content-utils.js';

/* Appearance */

function getPoses(type, subtype) {
    let poses = [];
    if (type === 'gerbil') {
        poses = ['side', 'front'];
        switch(subtype) {
            case 'white':
            case 'red fox':
                poses.push('stand');
                break;
            case 'silver-nutmeg':
                poses.push('crouch');
                break;
            case 'mottled':
                poses.push('back');
                break;
            case 'agouti-light':
                poses.push('side-look-front');
                break;
        } 
    }
    return poses;
}

/* Elements */

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

function createAnimEl(anim, animTime) {
    const el = document.createElement('div');
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