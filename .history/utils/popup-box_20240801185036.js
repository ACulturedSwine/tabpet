import { sendEvent, getCreatedElement } from "/utils/content-utils.js";

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

async function createPopupMsg(content, params) {
    const popupBox = await getPopupBox();
    popupBox.textContent = content;
    // animPopup(popupBox, 'fadeout');
}

function animPopup(popupBox, anim) {
    if (anim === 'fadeout') {
        popupBox.style.animation = `ease-out 5s fadeout`;
    }
}

function elOutOfBounds() {

}

export { initPopupBox, getPopupBox, createPopupMsg };