import { randomIntFromRange } from '/utils/general-utils.js';
import { removeElement } from '/utils/content-utils.js';

class Particle {
    constructor(type, position) {
        this.containerEl = this.create(type);

        this.x = position.x;
        this.y = position.y;
        this.setPosition();

        this.maxTime = randomIntFromRange(2000, 3000); // In milliseconds
        this.xSpeed = randomIntFromRange(10, 20);
        this.ySpeed = randomIntFromRange(2, 5);
    }

    handleFloat() {
        // Set time variables
        this.updateTime = 50;
        this.timeLapsed = 0;
        // Set starting x direction
        if (Math.random() < 0.5) this.xDir = -1;
        else this.xDir = 1;
        // Show element and start floating
        this.containerEl.style.display = 'block';
        this.floatInterval = setInterval(this.float.bind(this), this.updateTime);
    }

    float() { // Fly up and sway
        this.x += this.xSpeed * xDir;
        this.y -= this.ySpeed; // -y is up
        this.setPosition();
        this.xDir *= -1;
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
        particle.handleFloat();
    }
}

export { createParticles };