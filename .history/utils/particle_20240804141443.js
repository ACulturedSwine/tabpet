import { randomIntFromRange } from '/utils/general-utils.js';

class Particle {
    constructor(type) {
         
    }

    float() { // Fly up and sway

    }

    create(type) {
        const img = document.createElement('img');
        img.classList.add('particle');
        if (type === 'heart') img.src = '/assets/particle/heart.png';
        
    }
}

export { Particle };