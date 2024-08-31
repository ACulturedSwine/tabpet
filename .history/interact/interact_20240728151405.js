import { Interactable, Food } from "/interact/classes.js";
import { isPastedImg } from "/interact/img-utils.js"; 

const maxPastes = 10;
let loadedPastes = 0;
let pasteType = 'food';
let interactableContainer = null;
let cursor = {
    pos: null,
    tracking: false
};

export function handleInteract() {
    trackCursor();
    createInteractableContainer();
    bindPaste();
}

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

function createInteractableContainer() {
    const res = document.createElement('div');
    res.id = 'interactable-container';

    const mainDiv = document.querySelector('.L3eUgb'); // Container that holds all elements
    const zoomLevel = window.devicePixelRatio;

    const standardWidth = mainDiv.offsetWidth * zoomLevel; // Screen width at 100%
    const standardHeight = mainDiv.offsetHeight * zoomLevel; // Screen height at 100%
    
    res.style.width = `${standardWidth}px`;
    res.style.height = `${standardHeight}px`;

    res.style.top = '0';
    res.style.left = `calc(50% - ${standardWidth / 2}px)`;

    document.body.appendChild(res);
    interactableContainer = res;
}

function changeProfilePhoto() {
    const url32 = chrome.runtime.getURL('/icon/32.png');
    const url64 = chrome.runtime.getURL('/icon/64.png');

    const photoEl = document.querySelector('.gb_q.gbii');
    if (photoEl) {
        photoEl.src = url32;
        photoEl.srcset = `${url32} 1x, ${url64} 2x`;
    }
}

function bindPaste() {
    document.addEventListener('paste', (e) => handlePaste(e));
}

async function handlePaste(e) {
    console.log('pasting');

    // Set cursor to loading while processing

    setCursor('progress');

    // If past max pastes, return and stop tracking cursor. Else, track cursor if not tracking.
    if (loadedPastes >= maxPastes) {
        setCursor('');
        if (cursor.tracking) stopTrackCursor(); 
        return;
    }
    else if (!cursor.tracking){ 
        trackCursor();
    }

    // Process pasted item

    const imgData = await isPastedImg(e);
    
    // Not image, don't do anything
    if (!imgData) {
        setCursor('');
        return;
    }

    // Get image src and do something with it depending on interact type

    let src = imgData.img;
    if (imgData.type === 'file') src = window.URL.createObjectURL(imgData.img);

    // Get position
    const pos = await isCursorInside(interactableContainer);
    if (!pos) {
        setCursor('');
        return;
    }

    if (pasteType == 'food') new Food(pasteType, src, pos, interactableContainer);
    else new Interactable(pasteType, src, pos, interactableContainer);

    loadedPastes++;

    // Set default cursor when done
    setCursor('');
}

function setCursor(type) {
    interactableContainer.style.cursor = type;
}

function isCursorInside(el) { // Returns cursor position relative to element if inside element
    return new Promise((resolve)=> {
        const pos = cursor.pos;
        if (!pos) {
            throw new Error('Cursor position not found', cursor);
        } 
        const elDimensions = el.getBoundingClientRect();
        let relativePos = null;
        if (pos.x >= elDimensions.left && pos.x <= elDimensions.right && pos.y >= elDimensions.top && pos.y <= elDimensions.bottom) { 
            relativePos = {x: pos.x - elDimensions.left, y: pos.y - elDimensions.top}; // If is inside, set relative position
        }
        console.log('relative pos', pos);
        resolve(relativePos);
    })
} 