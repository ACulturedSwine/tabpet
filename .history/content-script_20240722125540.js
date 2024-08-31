document.addEventListener('DOMContentLoaded', ()=> {
    const searchProfilePhoto = document.querySelectorAll('.gb_p.gbii');
    if (searchProfilePhoto) {
        const photoEl = searchProfilePhoto[0];
        const url32 = chrome.runtime.getURL('/icon/32.png');
        photoEl.src = ;
        photoEl.srcset = '/icon/32.png 1x, /icon/64.png 2x';
    }
})