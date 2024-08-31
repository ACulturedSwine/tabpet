document.addEventListener('DOMContentLoaded', ()=> {
    const url32 = chrome.runtime.getURL('/icon/32.png');
    const url64 = chrome.runtime.getURL('/icon/64.png');
    const url83 = chrome.runtime.getURL('/icon/83.png');
    const url192 = chrome.runtime.getURL('/icon/192.png');

    const searchProfilePhoto = document.querySelectorAll('.gb_p.gbii');
    if (searchProfilePhoto.length > 0) {
        const photoEl = searchProfilePhoto[0];
        photoEl.src = url32;
        photoEl.srcset = `${url32} 1x, ${url64} 2x`;
    }

    const iconsHeader = document.querySelectorAll('.gb_Ld')
    /*
    const expandedProfilePhotoContainer = document.querySelectorAll('.Q3ao0c');
    console.log(expandedProfilePhotoContainer);
    if (expandedProfilePhotoContainer.length > 0) {
        console.log('found!');
    }
    */
})