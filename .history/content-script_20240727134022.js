import { handleImgPaste  } from "./edit/utils";

console.log('running');

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
    document.addEventListener('paste', (e)=> {
        handlehandleImgPaste(e);
    })
}

function getCursorPosition(e) {
    
}