import { randomIntFromRange } from '/utils/general-utils.js';
import { removeElement } from '/utils/content-utils.js';

const maxParticles = 10; // Max particles on screen
let currentParticles = 0;

class Particle {
    constructor(type, position) {
        this.containerEl = this.create(type);

        this.x = position.x;
        this.y = position.y;
        this.setPosition();

        currentParticles++;
    }

    handleFloat() {
        // Set time variables
        this.maxTime = randomIntFromRange(500, 2000); // In milliseconds
        this.updateTime = 50;
        this.timeLapsed = 0;
        // Set speed
        this.xSpeed = randomIntFromRange(10, 20);
        this.ySpeed = randomIntFromRange(2, 5);
        // Set x limits
        const offset = 20;
        this.minX = this.x - offset;
        this.maxX = this.x + offset;
        // Show element and start floating
        this.containerEl.style.display = 'block';
        this.floatInterval = setInterval(this.float.bind(this), this.updateTime);
    }

    float() { // Fly up and sway
        // Either -1 (left), 0 (no x movement), or 1 (right)
        const xDir = this.xDir || randomIntFromRange(-1, 1);
        this.x += this.xSpeed * xDir;
        this.y -= this.ySpeed; // -y is up

        // If go beyond x bounds, clip at min/max and set direction to go away from bounds
        if (this.x < this.minX) { // Move right on next float update
            this.x = this.minX;
            this.xDir = 1;
        }
        else if (this.x > this.maxX) { // Move left on next float update
            this.x = this.maxX;
            this.xDir = -1;
        }
        else { // Allow random x direction to be generated for next float
            this.xDir = null;
        }

        // Update position
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
        img.style.width = `${randomIntFromRange(10, 30)}px`;
        return img;
    }

    setPosition() {
        this.containerEl.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    disappear() {
        this.containerEl.style.display = 'none';
        clearInterval(this.floatInterval);
        removeElement(this.containerEl);

        currentParticles--;
    }
}

async function createParticles(type, position, parentContainer, n=1) {
    for (let i = 0; i < n && currentParticles < maxParticles; i++) {
        const particle = new Particle(type, position);
        parentContainer.appendChild(particle.containerEl);
        particle.handleFloat();
    }
}

export { createParticles };