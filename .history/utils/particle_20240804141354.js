import { randomIntFromRange } from '/utils/general-utils.js';

class Particle {
    constructor() {
         
    }

    float() { // Fly up and sway

    }

    create() {
        const el = document.createElement('img');
        el.classList.add('particle');
    }
}

export { Particle };