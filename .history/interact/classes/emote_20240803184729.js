import { randomIntFromRange, randomFromArray, randomKeyFromObject } from '/utils/general-utils.js';
import { wait } from '/utils/content-utils.js';

class Emote {
    constructor() {
        this.createEl();
        this.createEmojis();
    }

    /* To call from outside class */

    flipContent(orientation) { // Orientation is 1 if facing right, -1 if facing left
        this.contentEl.style.transform = `translateX(-50%) scaleX(${orientation})`;
    }

    idleEmote() {
        return this.createEmote({path: '/assets/emote/pause/0.png'});
    }

    loveEmote() {
        const loveEmotes = [{path: '/assets/emote/heart/0.png'}, {content: '🥰'}, {content: '💕'}];
        return this.createEmote(randomFromArray(loveEmotes));
    }

    emojiEmote(emoji) {
        return this.createEmote({content: emoji});
    }

    randomEmote() {
        const emotes = [
            ['heart', 0],
            ['pause', 0],
            ['speech', 2]
        ];
        // Get random path
        const category = emotes[2];// randomFromArray(emotes);
        const name = category[0];
        const maxIndex = category[1];
        const index = randomIntFromRange(0, maxIndex);
        const path = `/assets/emote/${name}/${index}.png`;
        // Set random emoji if type of emote is speech
        let content = '';
        if (name === 'speech') content = this.randomEmoji();
        // Set emote
        this.createEmote({path, content});
    }

    randomEmojiEmote() {
        const emoji = this.randomEmoji();
        this.emojiEmote(emoji);
    }

    randomEmoji(type='normal', setCategory) {
        let index = this.emojiIndex[type];
        if (!index) throw new Error(`Index type ${type} not found in emojis index`);
        let category = setCategory || randomKeyFromObject(index);
        let emojis = index[category];
        if (!emojis) throw new Error(`Category ${category} not found in index ${type}`);
        return randomFromArray(emojis);
    }

    createEmote(params={}) { // Time in seconds
        return new Promise(async (resolve)=> {
            // Set default params
            const path = params.path || '/assets/emote/speech/1.png';
            const content = params.content || '';
            const lingerTime = params.lingerTime || 2;

            // Set emote
            this.contentEl.textContent = content;
            this.imgEl.src = chrome.runtime.getURL(path);

            // Show for an amount of time and then hide
            this.showEmote();
            await wait(lingerTime, 'seconds');
            await this.hideEmote();
            resolve();
        })
    }

    /* Appearance */

    showEmote() {
        this.containerEl.style.display = 'block';
        this.animEmote('expand');
    }

    hideEmote() {
        return new Promise(async (resolve)=> {
            await this.animEmote('shrink');
            this.containerEl.style.display = 'none';
            resolve();
        })
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
        // Initialize indexes by category
        const normalIndex = { // Used for any occasion, included in randomEmojiEmote
            'face': ['😎', '🫠', '🙃', '🤔', '🤗', '🥺', '🥰'],
            'gesture': ['👊', '👌', '👍', '✌️', '👋', '👏', '👐', '🙌', '🫶'],
            'emotion': ['💢', '💖', '✨', '🔥', '🌩️', '☀️', '🌟'],
            'animal': ['🐹', '🐻', '🐢', '🐌', '🐸', '🦀'],
            'plant': ['🌱', '🪴', '🌿', '☘️', '🍀', '🍁', '🍄', '🌸', '🏵️', '🌻', '🌹'],
            'misc': ['💯', '🎊', '🎉', '💡']
        }
        const specialIndex = { // Used for special occasions
            'food': ['🍽️', '🍙', '🍜', '🍕'],
            'valentine': ['🌹', '💐', '💝', '❤️', '💝', '💘', '💌'],
            'halloween': ['🎃', '👻', '🐦‍⬛', '🐺', '🍫', '🍭', '🍬'],
            'christmas': ['🎄', '🎁'],
            'birthday': []
        }

        // Update attributes so Emote class can access
        this.emojiIndex = {'normal': normalIndex, 'special': specialIndex};
    }
}

export { Emote };