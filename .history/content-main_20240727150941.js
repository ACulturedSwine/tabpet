import { Interactable } from "/interact/classes.js";
import { isPastedImg } from "/interact/img-utils.js"; 
import { getCursorPosition } from "/interact/interact-utils.js"; 

let interactImgType = 'food';

export function main() {
    document.addEventListener('DOMContentLoaded', ()=> {
        console.log('loaded');
        changeProfilePhoto();
        bindPaste();
    })
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

function bindPaste() {
    document.addEventListener('paste', (e) => handleInteractableImg(e, interactImgType));
}

async function handleInteractableImg(e, type) {
    const imgData = isPastedImg(e);

    // Not image, don't do anything
    if (!imgData) return; 

    // Get image src and do something with it depending on interact type
    let src = imgData.img;
    if (imgData.type === 'file') src = window.URL.createObjectURL(imgData.img);
    if (type === 'food') {
        handleFood(e, src);
    }
}

async function handleFood(e, src) {
    console.log(src);

    const food = new Interactable('food', src, getCursorPosition(e));
    document.body.appendChild(food.el);
}