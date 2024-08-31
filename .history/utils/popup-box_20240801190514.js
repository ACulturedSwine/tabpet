import { sendEvent, getCreatedElement, wait } from "/utils/content-utils.js";

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

async function createPopupMsg(params) {
    const popupBox = await getPopupBox();

    // Show popupbox
    popupBox.style.display = 'block';

    // Set up params if given type
    if (params.type) params = getPopupParams();

    // Show message
    popupBox.textContent = params.content;
    await wait(params.waitTime); // waitTime is in milliseconds
    animPopup(popupBox, 'fadeout');

    // 
    popupBox.style.display = 'none';
}

function getPopupParams(type) { // Return popup params for specific type
    switch(type) {
        case 'outOfBounds':
            return {content: 'Out of bounds!', waitTime: 1000};
        default:
            return {content: `Type ${type} not implemented`, waitTime: 5000};
    }
}

function animPopup(popupBox, anim) {
    return new Promise(async (resolve)=> {
        let animTime = 1; // In seconds
        if (anim === 'fadeout') {
            popupBox.style.animation = `ease-out ${animTime}s fadeout`;
        }
        setTimeout(resolve, animTime*1000);
    })    
}

export { initPopupBox, getPopupBox, createPopupMsg };