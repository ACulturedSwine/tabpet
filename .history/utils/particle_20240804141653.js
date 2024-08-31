import { randomIntFromRange } from '/utils/general-utils.js';

class Particle {
    constructor(type, initPos) {
        this.container = create(type);
    }

    float() { // Fly up and sway

    }

    create(type) {
        const img = document.createElement('img');
        img.classList.add('particle');
        if (type === 'heart') img.src = '/assets/particle/heart.png';
        img.style.width = randomIntFromRange(50, 100);
        return img;
    }
}

export { Particle };