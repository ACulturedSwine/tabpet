import { randomIntFromRange, randomFromArray } from '/utils/general-utils.js';
import { wait } from '/utils/content-utils.js';

class Emote {
    constructor() {
        this.createEl();
        this.createEmojis();
    }

    /* To call from outside class */

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
        this.emote({path, content});
    }

    randomEmojiEmote() {
        const emoji = this.randomEmoji();
        this.emote({content: emoji});
    }

    randomEmoji() { // Gets random emoji from randomizable emojis (in emojiIndex) 
        const category = randomFromArray(this.emojiCategories);
        const emojisInCategory = this.emojiIndex[category];
        return randomFromArray(emojisInCategory);
    }

    randomEmojiFromAnyCategory(category) { // Gets random emoji from any category
        let emojis = null;
        if (this.emojiIndex.hasOwnProperty(category)) emojis = this.emojiIndex[category];
        ' 
    }

    async emote(params={}) { // Time in seconds
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
        // Initialize indexes by category
        const index = { // Used for any occasion, included in randomEmojiEmote
            'face': ['😎', '🫠', '🙃', '🤔', '🤗', '🥺', '🥰'],
            'gesture': ['👊', '👌', '👍', '✌️', '👋', '👏', '👐', '🙌', '🫶'],
            'emotion': ['💢', '💖', '✨', '🔥', '🌩️'],
            'animal': ['🐹', '🐻', '🐶', '🐢', '🐌', '🐸', '🦀'],
            'misc': ['💯', '🎊', '🎉', '💡']
        }
        const specialIndex = { // Used for special occasions
            'food': ['🍽️', '🍙', '🍜', '🍕']
        }

        // Populate data
        let categories = [];
        for (let category in index) {
            categories.push(category);
        }

        let specialCategories = [];
        for (let category in specialIndex) {
            specialCategories.push(category);
        }

        // Update attributes so Emote class can access
        this.emojiIndex = index;
        this.emojiSpecialIndex = specialIndex;
        this.emojiCategories = categories;
        this.specialEmojiCategories = specialCategories; 
    }
}

export { Emote };