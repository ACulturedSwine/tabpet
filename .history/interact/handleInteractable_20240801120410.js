import { Interactable } from '/interact/classes/interactable.js';
import { isPastedImg } from '/utils/img-utils.js'; 
import { isPosInsideEl, waitUntilImgLoaded } from '/utils/interact-utils.js';
import { sendEvent, removeElement } from '/utils/content-utils.js';
import { getCursor, resetCursor, setCursor} from '/utils/cursor-utils.js';

const maxPastes = 5;
let loadedPastes = 0; // # pastes in dom
let newPasteID = 0; // correlates with # pastes created overall (both in-page and removed)
let pastes = {};

let pasteType = 'food';
let interactContainer = null;

export function handleInteractable() {
    createInteractableContainer();
    handleInteract();
    bindPaste();
}

function createInteractableContainer() {
    const res = document.createElement('div');
    res.id = 'interact-container';

    const mainDiv = document.querySelector('.L3eUgb'); // Container that holds all elements
    const zoomLevel = window.devicePixelRatio;

    /*
    const standardWidth = mainDiv.offsetWidth * zoomLevel; // Screen width at 100%
    const standardHeight = mainDiv.offsetHeight * zoomLevel; // Screen height at 100%
    */
    console.log(window.outerHeight, window.innerHeight);
    const standardWidth = screen.availWidth;
    const standardHeight = screen.availHeight;
    
    res.style.width = `${standardWidth}px`;
    res.style.height = `${standardHeight}px`;

    res.style.top = '0';
    res.style.left = `calc(50% - ${standardWidth / 2}px)`;

    document.body.appendChild(res);
    interactContainer = res;

    sendEvent('handleInteractable:interact-container-created');
}

function handleInteract() {
    document.addEventListener('remove-interactable', (e)=> {
        const pasteID = e.detail.pasteID;
        if (pasteID !== undefined || pasteID !== null) removeInteractable(pasteID);
    })

    /* For testing 
    document.addEventListener('click', (e)=> {
        let el = e.target;

        // If selected element is interactable or has interactable parent element, execute interact event
        let interactableEl = isInteractableEl(el)
        if (!interactableEl) return;

        const type = interactableEl.type;
        const pasteID = interactableEl.pasteID;
        const pasteObj = pastes[pasteID];
    });
    */
}

function bindPaste() {
    document.addEventListener('paste', handlePaste);
}

async function handlePaste(e) {
    // Set cursor to loading while processing

    setCursor(interactContainer, 'progress');

    // If past max pastes, return
    if (loadedPastes >= maxPastes) {
        resetCursor(interactContainer);
        return;
    }

    // Process pasted item

    const imgData = await isPastedImg(e);
    
    // Not image, don't do anything
    if (!imgData) {
        resetCursor(interactContainer);
        return;
    }

    // Get image src and do something with it depending on interact type

    let src = imgData.img;
    if (imgData.type === 'file') src = window.URL.createObjectURL(imgData.img);

    // Get position
    const cursor = getCursor();
    const pos = await isPosInsideEl(cursor.pos, interactContainer); // Returns relative position if cursor is inside container
    if (!pos) {
        resetCursor(interactContainer);
        return;
    }

    // Create Interactable object
    createInteractable(pasteType, src, pos, interactContainer);

    // Set default cursor when done
    resetCursor(interactContainer);
}

async function createInteractable(pasteType, src, pos, interactContainer) {
    const newInteractable = new Interactable(pasteType, src, pos, interactContainer, newPasteID);

    // Manage Interactables using pasteID
    pastes[newPasteID] = newInteractable;

    // Notify that new Interactable is created when image is loaded
    if (newInteractable.hasImg && !newInteractable.imgLoaded) {
        if (newInteractable.img) {
            await waitUntilImgLoaded(newInteractable.img);
        }
        else {
            throw new Error('Interactable img not found', newInteractable);
        }
    }

    sendEvent('handleInteractable:interactable-created', {type: pasteType, obj: newInteractable});

    // Increment
    loadedPastes++;
    newPasteID++;
}

function removeInteractable(pasteID) {
    console.log('removing');

    const obj = pastes[pasteID];

    // Paste doesn't exist or isn't instance of Interactable
    if (!obj || !(obj instanceof Interactable)) {
        console.error(`Requested pasteID has no object associated with it or isn't an Interactable`, obj);
        return;
    }

    // Remove element, element's children, and event listeners
    removeElement(obj.el);
    
    // Remove Interactable from pastes
    delete pastes[pasteID];

    // Decrement number of pastes on page
    loadedPastes--;
}