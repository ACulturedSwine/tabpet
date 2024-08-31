console.log('running');

document.addEventListener('DOMContentLoaded', ()=> {
    console.log('loaded');
    changeProfilePhoto();
    handlePaste();
})

function changeProfilePhoto() {
    const url32 = chrome.runtime.getURL('/icon/32.png');
    const url64 = chrome.runtime.getURL('/icon/64.png');

    const photoEl = document.querySelector('.gb_q.gbii');
    console.log(photoEl);
    if (photoEl) {
        photoEl.src = url32;
        photoEl.srcset = `${url32} 1x, ${url64} 2x`;
    }
}

function handlePaste() {
    document.addEventListener('paste', (e)=> {
        
    })
}