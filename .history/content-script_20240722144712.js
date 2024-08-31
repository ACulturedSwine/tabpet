document.addEventListener('DOMContentLoaded', ()=> {
    const url32 = chrome.runtime.getURL('/icon/32.png');
    const url64 = chrome.runtime.getURL('/icon/64.png');

    const searchProfilePhoto = document.querySelectorAll('.gb_p.gbii');
    if (searchProfilePhoto) {
        const photoEl = searchProfilePhoto[0];
        photoEl.src = url32;
        photoEl.srcset = `${url32} 1x, ${url64} 2x`;
    }

    const expandedProfilePhotoContainer = document.querySelectorAll('.XS2qof.Q3BXBb');
    if (expandedProfilePhotoContainer) {
        const expandedPhotoEl = expandedProfilePhotoContainer.querySelectorAll('img')[0];

    }
})

srcset=" https://lh3.googleusercontent.com/a/ACg8ocIXr_TcFIJoJ2wBNRxf92vp9uBpG3EfinQ2m4bqcHhkoZ7XaSzj=s83-c-mo 1x, https://lh3.googleusercontent.com/a/ACg8ocIXr_TcFIJoJ2wBNRxf92vp9uBpG3EfinQ2m4bqcHhkoZ7XaSzj=s192-c-mo 2x">