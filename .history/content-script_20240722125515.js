document.addEventListener('DOMContentLoaded', ()=> {
    const searchProfilePhoto = document.querySelectorAll('.gb_p.gbii');
    if (searchProfilePhoto) {
        const photo = searchProfilePhoto[0];
        photo.src = chrome.runtime.getURL('/icon/32.png');
        photo.srcset = '/icon/32.png 1x, /icon/64.png 2x';
    }
})