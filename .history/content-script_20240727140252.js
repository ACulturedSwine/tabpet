import { isPastedImg, Interactable  } from "/interact/utils";

console.log('running');
let interactImgType = 'edible';

document.addEventListener('DOMContentLoaded', ()=> {
    console.log('loaded');
    changeProfilePhoto();
    bindPaste();
})

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
    document.addEventListener('paste', handleInteractableImg(e, interactImgType));
}

// add image
// edit image (eat over time)

async function handleInteractableImg(e, type) {
    const imgData = isPastedImg(e);

    // Not image, don't do anything
    if (!imgData) return; 

    // Get image src and do something with it depending on interact type
    let src = imgData.img;
    if (imgData.type === 'file') src = window.URL.createObjectURL(imgData.img);
    if (type === 'edible') {
        handleEdibleImg(res);
    }
}

async function handleEdibleImg(src) {
    const interactableEl = new Interactable('edible', src);
}