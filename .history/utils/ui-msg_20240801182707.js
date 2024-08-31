function initMsgEl() {
    const msgEl = document.createElement('div');
    msgEl.classList.add('ui');
    msgEl.classList.add('ui-msg');
    msgEl.textContent = 'This is a message';
    document.body.append(msgEl);
    return msgEl;
}

function createMsg(, type) {

}

function elOutOfBounds() {

}

export { initMsgEl, createMsg };