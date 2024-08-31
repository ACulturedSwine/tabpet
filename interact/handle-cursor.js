let cursor = {
    pos: null,
    tracking: false
};

export default function handleCursor() {
    trackCursor();
}

function trackCursor() { // Constantly tracks cursor position
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