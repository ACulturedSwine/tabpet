function getCursor() {
    return window.cursor;
}

function resetCursor(el) {
    el.style.cursor = '';
}

function setCursor(el, type) {
    el.style.cursor = type;
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

export { getCursor };