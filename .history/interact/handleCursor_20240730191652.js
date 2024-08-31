import { sendEvent } from '/content/utils/content-utils.js';

let cursor = {
    pos: null,
    tracking: false
};

export function createCursor() {

}

export function trackCursor() { // Constantly tracks cursor position
    cursor.tracking = true;
    document.addEventListener('mousemove', updateCursor);
}

function updateCursor(e) {
    cursor.pos = {x: e.clientX, y: e.clientY};
    window.cursor = cursor; // Update global variable so all files can access cursro
}

function stopTrackCursor() {
    cursor.tracking = false;
    document.removeEventListener('mousemove', updateCursor);
}

function sendCursor() {
    sendEvent('sending-cursor', {cursor: cursor});
}

function getCursor() {
    return window.cursor;
}