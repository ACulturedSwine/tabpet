import { sendEvent } from '/content/utils/content-utils.js';

let cursor = {
    pos: null,
    tracking: false
};

export function trackCursor() { // Constantly tracks cursor position
    cursor.tracking = true;
    document.addEventListener('mousemove', updateCursor);
}

function updateCursor(e) {
    cursor.pos = {x: e.clientX, y: e.clientY};
}

function stopTrackCursor() {
    cursor.tracking = false;
    document.removeEventListener('mousemove', updateCursor);
}

function sendCursor() {
    sendEvent('')
}

function getCursor() {
    sendEvent('requesting-cursor');
}