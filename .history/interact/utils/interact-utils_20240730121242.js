function waitUntilImgLoaded(imgEl) {
    return new Promise((resolve, reject)=> {
        if (!imgEl) reject('');

        imgEl.addEventListener('load', ()=>{
            resolve();
        });
    })
}

function isTouching(a, b) { // Returns object on  where b is in relation to a.
    const aDims = a.getBoundingClientRect();
    const bDims = b.getBoundingClientRect();
    if (!aDims || !bDims) return null;
    
    const toLeft = aDims.left > bDims.right;
    const toRight = aDims.right < bDims.left;
    const above = aDims.top > bDims.bottom;
    const below = aDims.bottom < bDims.top;
    const touching = !(toLeft || !toRight || !above || !below);


    return {
        touching: touching,
        toLeft: toLeft,
        toRight: toRight,
        above: above,
        below: below
    };
}

function resetCursor(el) {
    el.style.cursor = '';
}

function setCursor(el, type) {
    el.style.cursor = type;
}

function isInside(pos, el) { // Returns position relative to element if inside element
    return new Promise((resolve)=> {
        if (!pos) {
            throw new Error('Position not found', pos);
        } 
        const elDimensions = el.getBoundingClientRect();
        let relativePos = null;
        if (pos.x >= elDimensions.left && pos.x <= elDimensions.right && pos.y >= elDimensions.top && pos.y <= elDimensions.bottom) { 
            relativePos = {x: pos.x - elDimensions.left, y: pos.y - elDimensions.top}; // If is inside, set relative position
        }
        resolve(relativePos);
    })
}

/* Old cursor position getters by detecting position right after mouse movement */
function getCursorPosition() { // Returns cursor position right after mouse movement
    return new Promise((resolve)=> {
        document.addEventListener('mousemove', (e)=> {
            resolve({x: e.clientX, y: e.clientY});
        }, {once: true});
    })
}

function getCursorPositionRelativeTo(el) { // Returns cursor position relative to element
    return new Promise(async (resolve)=> {
        const pos = await getCursorPosition();
        const elDimensions = el.getBoundingClientRect();
        const relativePos = {x: pos.x - elDimensions.left, y: pos.y - elDimensions.top};
        resolve(relativePos);
    });
}

export { waitUntilImgLoaded, isTouching, resetCursor, setCursor, isInside };