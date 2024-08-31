import { sendEvent, getCreatedElement, getInteractContainer, wait } from "/utils/content-utils.js";

function initPopupBox() {
    const popupBox = document.createElement('div');
    popupBox.classList.add('ui');
    popupBox.id = 'popup-box';
    popupBox.textContent = 'This is a message';
    document.body.append(popupBox);
    sendEvent('popup-box-created');
    return popupBox;
}

function getPopupBox() {
    return getCreatedElement('popup-box');
}

function createPopupMsg(params) {
    return new Promise(async (resolve)=> {
        const popupBox = await getPopupBox();

        // Show popup box
        popupBox.style.display = 'block';
    
        // Set up params if given type
        if (params.type) params = getPopupParams(params.type);
    
        // Show message
        popupBox.textContent = params.content;
        await wait(params.waitTime); // waitTime is in milliseconds
        await animPopup(popupBox, 'fadeout');
    
        // Hide popup box and resolve
        popupBox.style.display = 'none';
        resolve();
    })
}

function getPopupParams(type) { // Return popup params for specific type
    switch(type) {
        default:
            return {content: `Type ${type} not implemented`, waitTime: 5000};
    }
}

function animPopup(popupBox, anim) {
    return new Promise(async (resolve)=> {
        let animTime = 1; // In seconds
        if (anim === 'fadeout') {
            popupBox.style.animation = `ease-out ${animTime}s fadeout forwards`;
        }
        setTimeout(resolve, animTime*1000);
    })    
}

/* Specific messages with extra functionality */

async function outOfBounds() {
    outOfBoundsTransition(popupTime);
    await createPopupMsg({content: 'Out of bounds!', waitTime: popupTime});
}

async function outOfBoundsTransition(popupTime) { // During outOfBounds error, Transition border color given 
    const interactContainer = await getInteractContainer();
    interactContainer.classList.add('out-of-bounds');
    await wait(popupTime);
    interactContainer.classList.remove('out-of-bounds');
}

export { initPopupBox, getPopupBox, createPopupMsg, outOfBounds };