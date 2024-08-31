function initMsgEl() {
    const msgEl = document.createElement('div');
    msgEl.classList.add('ui-msg');
    msgEl.textContent = 
    document.body.append(msgEl);
    return msgEl;
}

function msg() {

}

function elOutOfBounds() {

}

export { initMsgEl, msg };