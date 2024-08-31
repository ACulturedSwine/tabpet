function initMsgEl() {
    const msgEl = document.createElement('div');
    msgEl.classList.add('ui');
    msgEl.classList.add('ui-msg');
    msgEl.textContent = 'This is a message';
    document.body.append(msgEl);
    return msgEl;
}

function createMsg(content, type) {
    msgEl.textContent = content;
    animMsg('fadeout');
}

function animMsg(anim) {
    if (anim === 'fadeout') {
        const time = 1;
        msgEl.style.animation = `fadebout`
    }
}

function elOutOfBounds() {

}

export { initMsgEl, createMsg };