import { randomIntFromRange } from '/utils/general-utils.js';
import { removeElement } from '/utils/content-utils.js';

class Particle {
    constructor(type, position) {
        this.containerEl = create(type);
        this.x = position.x;
        this.y = position.y;
        this.maxHeight = randomIntFromRange(10, 100);
        this.xSpeed = randomIntFromRange(10, 30);
        this.ySpeed = randomIntFromRange(10, 50);
    }

    handleFloat() {
        setInterval(float, 1000);
    }

    float() { // Fly up and sway
        let xDir = randomIntFromRange(-1, 1); // Either -1, 0, or 1
        this.x += this.xSpeed * xDir;
        this.y += this.ySpeed;
        this.y = Math.min(this.y, this.maxHeight); // Cut height at max height if goes over
        this.setPosition();
        if (this.y === this.maxHeight) this.disappear();
    }

    create(type) {
        const img = document.createElement('img');
        img.classList.add('particle');
        if (type === 'heart') img.src = '/assets/particle/heart.png';
        img.style.width = randomIntFromRange(50, 100);
        return img;
    }

    setPosition() {
        this.style.transform = `translate(${this.x}, ${this.y})`;
    }

    disappear() {
        removeElement(this.containerEl);
    }
}

function createParticles(type, position, container, n=5) {
    for (let i = 0; i < n; i++) {
        const particle = new Particle(type, position);
        container.appendChild(particle);
        particle.handleFloat();
    }
}

export { createParticles };