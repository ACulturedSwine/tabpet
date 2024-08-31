document.addEventListener('DOMContentLoaded', ()=> {
    const searchProfilePhoto = document.querySelectorAll('.gb_p.gbii');
    if (searchProfilePhoto) {
        const photoEl = searchProfilePhoto[0];
        const url32 = chrome.runtime.getURL('/icon/32.png');
        const url64 = chrome.runtime.getURL('/icon/64.png');
        photoEl.src = url32;
        photoEl.srcset = `${url32} 1x, ${url64} 2x`;
    }

    const expandedProfilePhotoContainer = document.querySelectorAll('.XS2qof.Q3BXBb')
})