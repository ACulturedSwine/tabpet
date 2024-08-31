import { initInteract } from "/interact/interact.js";

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
    changeProfilePhoto();
    initInteract();
}

function changeProfilePhoto() {
    const url32 = chrome.runtime.getURL('/icon/32.png');
    const url64 = chrome.runtime.getURL('/icon/64.png');

    const photoEl = document.querySelector('.gb_q.gbii');
    if (photoEl) {
        photoEl.src = url32;
        photoEl.srcset = `${url32} 1x, ${url64} 2x`;
    }
}