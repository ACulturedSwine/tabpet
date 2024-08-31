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
        // Set x limits
        const offset = 20;
        this.minX = position.x - offset;
        this.maxX = position.x + offset;
        // Show element and start floating
        this.containerEl.style.display = 'block';
        this.floatInterval = setInterval(this.float.bind(this), this.updateTime);
    }

    float() { // Fly up and sway
        const xDir = this.xDir || randomIntFromRange(-1, 1); // Either -1 (left), 0 (no x movement), or 1 (right)
        this.x += this.xSpeed * xDir;
        // If go beyond x bounds, clip at min/max and set direction to go away from bounds
        if (this.x < this.minX)  
        this.y -= this.ySpeed; // -y is up
        this.setPosition();

        // Update x direction
        this.xDir *= -1; // Opposite x direction for next float update
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