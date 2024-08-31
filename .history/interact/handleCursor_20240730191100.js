import { sendEvent } from '/content/utils/content-utils.js';

let cursor = {
    pos: null,
    tracking: false
};

function trackCursor() { // Constantly tracks cursor position
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

function getCursor() {
    sendEvent('requesting-cursor');
}