import { sendEvent } from "./content-utils";

function initPopupMsg() {
    const msgEl = document.createElement('div');
    msgEl.classList.add('ui');
    msgEl.classList.add('ui-msg');
    msgEl.textContent = 'This is a message';
    document.body.append(msgEl);
    sendEvent('ui-msg-created');
    return msgEl;
}

function getMsgEl() {

}

function createMsg(content, params) {
    msgEl.textContent = content;
    animMsg('fadeout');
}

function animMsg(anim) {
    if (anim === 'fadeout') {
        msgEl.style.animation = `ease-out 5s fadeout`;
    }
}

function elOutOfBounds() {

}

export { initMsgEl, createMsg };