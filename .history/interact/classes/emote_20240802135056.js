import { randomFromRange, randomFromArray } from '/utils/general-utils.js';
import { wait } from '/utils/content-utils.js';

class Emote {
    constructor() {
        this.createEl();
    }

    /* To call from outside class */

    randomEmote() {
        const emotes = [
            ['heart', 0],
            ['pause', 0],
            ['speech', 2]
        ];
        // Get random path
        const category = randomFromArray(emotes);
        const name = category[0];
        const index = randomFromRange(0, category[1]);
        const path = `/assets/emote/${name}/${index}.png`;
        // Set random emoji if type of emote is speech
        let content = '';
        if (name === 'speech') content = this.randomEmoji();
        // Set emote
        this.emote(path, content);
    }

    randomEmojiEmote() {
        const emoji = this.randomEmoji();
        this.emote('/assets/emote/speech.png', emoji);
    }

    randomEmoji() {
        return randomFromArray(randomFromArray(this.emojiCategories)); // Gets random emoji from random emoji category;
    }

    async emote(path, content='', lingerTime=2) { // Time in seconds
        // Set emote
        this.contentEl.textContent = content;
        this.imgEl.src = chrome.runtime.getURL(path);

        // Show for an amount of time and then hide
        this.showEmote();
        await wait(lingerTime, 'seconds');
        this.hideEmote();
    }

    /* Appearance */

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
            this.containerEl.style.animation = `${name} ${time}s ${timeFunc}`;
            await wait(time, 'seconds');
            resolve();
        })
    }

    /* Initialization */

    createEl() {
        const container = document.createElement('div');
        container.classList.add('emote-container');

        const img = document.createElement('img');
        img.src = chrome.runtime.getURL('/assets/emote/speech/1.png');
        img.classList.add('emote-img');

        const content = document.createElement('div');
        content.classList.add('emote-content');

        container.appendChild(img);
        container.appendChild(content);

        this.containerEl = container;
        this.imgEl = img;
        this.contentEl = content;

        return container;
    }

    createEmojis() {
        const index = { // Index by category
            'face': ['😎', '🫠', '🙃', '🤔', '🤗', '🥺'],
            'gesture': ['👊'],
            'emotion': ['💢'],
            'animal': ['🐻', '🐶'],
            'misc': ['💯']
        }

        let categories = [];
        for (let category in byCategory) {
            categories.push(category);
        }

        console.log(index, categories);

        this.emojiIndex = index;
        this.emojiCategories = categories;
    }
}

export { Emote };