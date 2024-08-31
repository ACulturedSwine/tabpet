document.addEventListener('DOMContentLoaded', ()=> {
    const url32 = chrome.runtime.getURL('/icon/32.png');
    const url64 = chrome.runtime.getURL('/icon/64.png');
    const url83 = chrome.runtime.getURL('/icon/83.png');
    const url192 = chrome.runtime.getURL('/icon/192.png');

    const photoEl = document.querySelector('.gb_p.gbii');
    if (photoEl) {
        photoEl.src = url32;
        photoEl.srcset = `${url32} 1x, ${url64} 2x`;
    }

    
})