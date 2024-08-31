function overlaps(a, b) {
    const aDims = a.getBoundingClientRect();
    const bDims = b.getBoundingClientRect();
    if (!aDims || !bDims) return null;
    console.log('a dims', aDims);
    console.log('b dims', bDims);

    return !(   aDims.right < bDims.left || 
                aDims.left > bDims.right ||
                aDims.bottom < bDims.top ||
                aDims.top > bDims.bottom);
}

let isColliding = function (div1, div2) {

    let d1Offset = div1.offset();
    let d1Height = div1.outerHeight(true);
    let d1Width = div1.outerWidth(true);
    let d1Top = d1Offset.top + d1Height;
    let d1Left = d1Offset.left + d1Width;

    let d2Offset = div2.offset();
    let d2Height = div2.outerHeight(true);
    let d2Width = div2.outerWidth(true);
    let d2Top = d2Offset.top + d2Height;
    let d2Left = d2Offset.left + d2Width;

    return !(d1Top < d2Offset.top || d1Offset.top > d2Top || d1Left < d2Offset.left || d1Offset.left > d2Left);
};

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

export { overlaps, resetCursor, setCursor, isInside };