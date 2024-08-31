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
        if (!params) throw new Error('Type ');
    }
    popupBox.textContent = content;
    await wait(5000);
    animPopup(popupBox, 'fadeout');
}

function getPopupParams() { // Return popup params for specific type

}

function animPopup(popupBox, anim) {
    if (anim === 'fadeout') {
        popupBox.style.animation = `ease-out 1s fadeout`;
    }
}

function elOutOfBounds() {

}

export { initPopupBox, getPopupBox, createPopupMsg };