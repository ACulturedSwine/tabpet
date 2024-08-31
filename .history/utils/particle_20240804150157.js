import { randomIntFromRange } from '/utils/general-utils.js';
import { removeElement, wait } from '/utils/content-utils.js';

class Particle {
    constructor(type, position) {
        this.containerEl = this.create(type);

        const xOffset = 0;
        this.x = randomIntFromRange(position.x - xOffset, position.x + xOffset);
        this.y = position.y;

        this.maxTime = randomIntFromRange(2000, 3000); // In milliseconds
        this.xSpeed = randomIntFromRange(2, 5);
        this.ySpeed = randomIntFromRange(2, 5);
    }

    handleFloat() {
        this.updateTime = 50;
        this.timeLapsed = 0;
        this.containerEl.style.display = 'block';
        this.floatInterval = setInterval(this.float.bind(this), this.updateTime);
    }

    float() { // Fly up and sway
        let xDir = randomIntFromRange(-1, 1); // Either -1, 0, or 1
        this.x += this.xSpeed * xDir;
        this.y -= this.ySpeed; // -y is up
        this.setPosition();
        this.timeLapsed += this.updateTime;
        if (this.timeLapsed >= this.maxTime) this.disappear();
    }

    create(type) {
        const img = document.createElement('img');
        img.classList.add('particle');
        if (type === 'heart') img.src = chrome.runtime.getURL('/assets/particle/heart.png');
        img.style.width = `${randomIntFromRange(20, 40)}px`;
        return img;
    }

    setPosition() {
        this.containerEl.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    disappear() {
        this.containerEl.style.display = 'none';
        clearInterval(this.floatInterval);
        removeElement(this.containerEl);
    }
}

async function createParticles(type, position, parentContainer, n=1) {
    for (let i = 0; i < n; i++) {
        const particle = new Particle(type, position);
        parentContainer.appendChild(particle.containerEl);
        await wait(500);
        particle.handleFloat();
    }
}

export { createParticles };