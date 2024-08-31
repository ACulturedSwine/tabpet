function chainAppend(els) { // Given array of elements, append such that (n) element is parent of (n - 1) element
                            // Outermost elements are last
                            // Return outermost element
    if (!els || els.length == 0 || els.constructor !== Array) return null;

    const len = els.length;
    for (let i = 1; i < len; i++) els[i].appendChild(els[i - 1]);

    return els[len - 1];
}

function createPetEl() {
    const el = document.createElement('div');
    el.classList.add('pet');
    return el;
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

function createImgEl(type, subtype) {
    const el = document.createElement('img');
    el.src = chrome.runtime.getURL(`/assets/${type}/${subtype}/side.png`);
    return el;
}

export { chainAppend, createPetEl, createMoveEl, createFlipEl, createAnimEl, createHitboxEl, createImgEl };