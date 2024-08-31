import { handleInteract } from "/interact/interact.js";

const maxPastes = 10;
let loadedPastes = 0;
let pasteType = 'food';
let interactableContainer = null;
let cursor = {
    pos: null,
    tracking: false
};

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
    handleInteract();
}