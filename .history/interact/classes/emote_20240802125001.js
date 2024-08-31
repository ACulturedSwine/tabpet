class Emote {
    constructor() {
        this.createEl();
    }

    /* Display */

    async emote(path, content='', lingerTime=5) { // Time in seconds
        // Set emote
        this.containerEl.textContent = content;
        this.imgEl.src = chrome.runtime.getURL(path);

        // Show and hide after lingerTime
        this.showEmote();
        await wait(lingerTime, 'seconds');
        this.hideEmote();
    }

    showEmote() {
        this.containerEl.style.display = 'block';
        this.animEmote('expand');
    }

    async hideEmote() {
        await this.animEmote('shrink');
        this.containerEl.style.display = 'none';
    }

    animEmote(name, time=1, timeFunc='cubic-bezier(0.175, 0.885, 0.32, 1.275)') {
        return new Promise(async (resolve)=> {
            this.containerEl.style.animation = `${name} ${time}s ${timeFunc} forwards`;
            await wait(time, 'seconds');
            resolve();
        })
    }

    /* Initialization */

    createEl() {
        const container = document.createElement('div');
        container.classList.add('emote');
        this.containerEl = container;

        const img = document.createElement('img');
        img.src = chrome.runtime.getURL('/assets/emote/speech/1.png');
        this.imgEl = img;

        return container;
    }
}