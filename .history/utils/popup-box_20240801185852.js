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
        if (!params) throw new Error('Type of popup message not implemented', params.type);
    }
    popupBox.textContent = params.content;
    await wait(params.waitTime);
    animPopup(popupBox, 'fadeout');
}

function getPopupParams() { // Return popup params for specific type
    if ()
}

function animPopup(popupBox, anim) {
    if (anim === 'fadeout') {
        popupBox.style.animation = `ease-out 1s fadeout`;
    }
}

export { initPopupBox, getPopupBox, createPopupMsg };