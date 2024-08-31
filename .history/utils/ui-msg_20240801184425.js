import { sendEvent } from "./content-utils";

function initPopupBox() {
    const msgEl = document.createElement('div');
    msgEl.classList.add('ui');
    msgEl.classList.add('ui-msg');
    msgEl.textContent = 'This is a message';
    document.body.append(msgEl);
    sendEvent('ui-msg-created');
    return msgEl;
}

function getPopupBox() {

}

function createPopupMsg(content, params) {
    msgEl.textContent = content;
    animMsg('fadeout');
}

function animPopupBox(anim) {
    if (anim === 'fadeout') {
        msgEl.style.animation = `ease-out 5s fadeout`;
    }
}

function elOutOfBounds() {

}

export { initMsgEl, createMsg };