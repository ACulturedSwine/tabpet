class Emote {
    constructor() {

    }

    /* Display */

    async emote(path, content='', lingerTime=5) { // Time in seconds
        this.showEmote();
        this.emoteEl.src = chrome.runtime.getURL(path);
        await wait(lingerTime, 'seconds');
        this.hideEmote();
    }

    showEmote() {
        this.emoteEl.style.display = 'block';
        this.animEmote('expand');
    }

    async hideEmote() {
        await this.animEmote('shrink');
        this.emoteEl.style.display = 'none';
    }

    animEmote(name, time=1, timeFunc='cubic-bezier(0.175, 0.885, 0.32, 1.275)') {
        return new Promise(async (resolve)=> {
            this.emoteEl.style.animation = `${name} ${time}s ${timeFunc} forwards`;
            await wait(time, 'seconds');
            resolve();
        })
    }

    /* Initialization */

    createEl() {
        const container = document.createElement('img');
        container.classList.add('emote');
        container.src = chrome.runtime.getURL('/assets/emote/speech/1.png');
        return el;
    }
}