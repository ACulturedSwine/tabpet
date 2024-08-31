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
    if (params.type) {
        params = getPopupParams();
    }
    popupBox.textContent = params.content;
    await wait(params.waitTime);
    animPopup(popupBox, 'fadeout');
}

function getPopupParams(type) { // Return popup params for specific type
    switch(type) {
        case 'outOfBounds':
            return {content: };
        default:
            return {content: }
    }
}

function animPopup(popupBox, anim) {
    if (anim === 'fadeout') {
        popupBox.style.animation = `ease-out 1s fadeout`;
    }
}

export { initPopupBox, getPopupBox, createPopupMsg };