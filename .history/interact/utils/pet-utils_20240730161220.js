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

function createImgEl(type, subtype) {
    const el = document.createElement('img');
    el.src = chrome.runtime.getURL(`/assets/${type}/${subtype}/side.png`);
    el.setAttribute('draggable', false);
    el.classList.add('sprite');
    return el;
}

export { chainAppend, createMoveEl, createFlipEl, createRigidEl, createAnimEl, createHitboxEl, createImgEl };