import { Interactable } from '/interact/classes/interactable.js';
import { isPastedImg } from '/utils/img-utils.js'; 
import { waitUntilImgLoaded } from '/utils/interact-utils.js';
import { sendEvent, removeElement } from '/utils/content-utils.js';
import { getCursor, resetCursor, setCursor} from '/utils/cursor-utils.js';
import { outOfBounds } from '/utils/popup-box.js';
import { getRelativePositionIfColliding } from '../utils/collision.js';

const maxPastes = 5;
let loadedPastes = 0; // # pastes in dom
let newPasteID = 0; // correlates with # pastes created overall (both in-page and removed)
let pastes = {};

let pasteType = 'food';
let interactContainer = null;

export default function handleInteractable() {
    return new Promise(async (resolve)=> {
        interactContainer = await createInteractableContainer();
        handleInteract();
        bindPaste();
        resolve(interactContainer);
    })
}

function createInteractableContainer() {
    return new Promise((resolve)=> {
        const res = document.createElement('div');
        res.id = 'interact-container';
    
        const standardWidth = screen.availWidth;
        const standardHeight = window.innerHeight; // TODO: Get maximum height of window (screen.availHeight includes chrome taskbar)
        
        res.style.width = `${standardWidth}px`;
        res.style.height = `${standardHeight}px`;
    
        res.style.top = '0';
        res.style.left = `calc(50% - ${standardWidth / 2}px)`;
    
        document.body.appendChild(res);
    
        sendEvent('interact-container-created');
        resolve(res);
    })
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
    const relativePosition = getRelativePositionIfColliding(cursor.pos, interactContainer);
    if (!relativePosition) {
        outOfBounds(); // Display out of bounds popup message
        resetCursor(interactContainer);
        return;
    }

    // Create Interactable object
    createInteractable(pasteType, src, relativePosition, interactContainer);

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