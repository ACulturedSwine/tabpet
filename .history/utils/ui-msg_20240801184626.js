import { sendEvent } from "/utils/content-utils";

function initPopupBox() {
    const msgEl = document.createElement('div');
    msgEl.classList.add('ui');
    msgEl.id = 'popup-box';
    msgEl.textContent = 'This is a message';
    document.body.append(msgEl);
    sendEvent('popup-box-created');
    return msgEl;
}

function getPopupBox() {

}

function createPopupMsg(content, params) {
    msgEl.textContent = content;
    animPopup('fadeout');
}

function animPopup(anim) {
    if (anim === 'fadeout') {
        msgEl.style.animation = `ease-out 5s fadeout`;
    }
}

function elOutOfBounds() {

}

export { initPopupBox, getPopupBox, createPopupMsg };