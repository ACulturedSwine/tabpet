function chainAppend(els) { // Given array of elements, append elements to each other 

}

function createMoveEl() {
    const el = document.createElement('div');
    el.classList.add('move');
    return el;
}

function createFlipEl() {
    const el = document.createElement('div');
    el.classList.add('flip');
    return el;
}

function createAnimEl() {
    const el = document.createElement('div');
    el.classList.add('anim');
    return el;
}

function createHitboxEl() {
    const el = document.createElement('div');
    el.classList.add('hitbox');
    return el;
}

function createImgEl() {
    const el = document.createElement('div');
    el.classList.add('img');
    return el;
}

export { chainAppend, createMoveEl, createFlipEl, createAnimEl, createHitboxEl, createImgEl };