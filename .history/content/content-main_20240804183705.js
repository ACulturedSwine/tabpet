import handleCursor from '/interact/handle-cursor.js';
import handleUI from '/ui/handle-ui.js';
import handleInteractable from '/interact/handle-interactable.js';
import handlePet from '/interact/handle-pet.js';
import handleWelcome from '/interact/handle-welcome.js';

console.log('running');

export function main() {
    if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') { // DOM content already loaded
        console.log('already loaded');
        start();
    }
    else {
        document.addEventListener('DOMContentLoaded', start);
    }
}

function start() {
    handleCursor();
    handleUI();
    handleInteractable();
    pet = handlePet();
    handleWelcome();
}

