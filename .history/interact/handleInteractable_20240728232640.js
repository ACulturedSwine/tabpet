import { Interactable } from '/interact/interactable.js';
import { isPastedImg } from '/interact/utils/img-utils.js'; 
import { resetCursor, setCursor, isInside } from '/interact/utils/interact-utils.js';
import { removeElement } from '/content/utils/content-utils.js';

const maxPastes = 5;
let loadedPastes = 0; // # pastes in dom
let newPasteID = 0; // correlates with # pastes created overall (both in-page and removed)
let pastes = {};

let pasteType = 'food';
let interactableContainer = null;
let cursor = {
    pos: null,
    tracking: false
};

export function initHandleInteractable() {
    trackCursor();
    createInteractableContainer();
    handleInteract();
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

function handleInteract() {
    document.addEventListener('click', (e)=> {
        let el = e.target;

        // If selected element is interactable or has interactable parent element, execute interact event
        let interactableEl = isInteractable(el)
        if (!interactableEl) return;

        const type = interactableEl.type;
        const pasteID = interactableEl.pasteID;
        const pasteObj = pastes[pasteID];

        if (type === 'food' && pasteObj && pasteObj.eat) {
            const finished = pasteObj.eat();
            if (finished) removeInteractable(pasteID);
        }
    })
}

function isInteractable(el) { // Recursive function, returns interactable element by searching parents
    if (el.classList.contains('interactable')) return el;
    else if (el.classList.contains('interactable-child') && el.parentElement) return isInteractable(el.parentElement);
    else return null;
}

function bindPaste() {
    document.addEventListener('paste', handlePaste);
}

async function handlePaste(e) {
    // Set cursor to loading while processing

    setCursor(interactableContainer, 'progress');

    // If past max pastes, return
    if (loadedPastes >= maxPastes) {
        resetCursor(interactableContainer);
        return;
    }

    // Process pasted item

    const imgData = await isPastedImg(e);
    
    // Not image, don't do anything
    if (!imgData) {
        resetCursor(interactableContainer);
        return;
    }

    // Get image src and do something with it depending on interact type

    let src = imgData.img;
    if (imgData.type === 'file') src = window.URL.createObjectURL(imgData.img);

    // Get position
    const pos = await isInside(cursor.pos, interactableContainer); // Returns relative position if cursor is inside container
    if (!pos) {
        resetCursor(interactableContainer);
        return;
    }

    // Create interactable object
    createInteractable(pasteType, src, pos, interactableContainer);

    // Set default cursor when done
    resetCursor(interactableContainer);
}

function createInteractable(pasteType, src, pos, interactableContainer) {
    const newInteractable = new Interactable(pasteType, src, pos, interactableContainer);

    // Connect paste element to its Interactable object using pasteID
    pastes[newPasteID] = newInteractable;
    newInteractable.el.pasteID = newPasteID;

    loadedPastes++;
    newPasteID++;
}

function removeInteractable(pasteID) {
    console.log('removing');

    const obj = pastes[pasteID];

    // Paste doesn't exist or isn't instance of Interactable
    if (!obj || !(obj instanceof Interactable)) return;

    // Remove element, element's children, and event listeners
    removeElement(obj.el);
    
    // Remove Interactable from pastes
    delete pastes[pasteID];

    // Decrement number of pastes on page
    loadedPastes--;
}