import { randomIntFromRange } from '/utils/general-utils.js';

class Particle {
    constructor(type, position) {
        this.container = create(type);
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
        let xDir = randomIntFromRange(-1, 1);
        this.x += this.xSpeed * 
        this.y += this.ySpeed;
        this.setPosition();
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
}

export { Particle };