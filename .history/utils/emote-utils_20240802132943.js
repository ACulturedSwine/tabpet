import { Emote } from '/interact/classes/emote.js'

function createEmote() {
    const emote = new Emote();
    emote.contentEl.textContent = '👊';
    return emote;
}

export { createEmote };