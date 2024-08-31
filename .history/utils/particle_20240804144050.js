import { randomIntFromRange } from '/utils/general-utils.js';
import { removeElement } from '/utils/content-utils.js';

class Particle {
    constructor(type, position) {
        this.containerEl = create(type);
        this.x = position.x;
        this.y = position.y;
        this.maxTime = randomIntFromRange(2000, 5000); // In milliseconds
        this.xSpeed = randomIntFromRange(10, 30);
        this.ySpeed = randomIntFromRange(10, 50);
    }

    handleFloat() {
        this.updateTime = 1000;
        this.timeLapsed = 0;
        setInterval(float, 1000);
    }

    float() { // Fly up and sway
        let xDir = randomIntFromRange(-1, 1); // Either -1, 0, or 1
        this.x += this.xSpeed * xDir;
        this.y += this.ySpeed;
        this.setPosition();
        this.timeLapsed += 
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