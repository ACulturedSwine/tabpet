import { sendEvent } from '/content/utils/content-utils.js';


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

function getCursorPosition() {
    
}