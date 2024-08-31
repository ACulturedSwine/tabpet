function preloadImage(url, callback) {
    const img = new Image();
    img.onload = callback;
    img.src = url;
}

preloadImage(newImageUrl, function() {
    // Image is preloaded, now change the src of the original image
    const myImage = document.getElementById('myImage');
    myImage.src = newImageUrl;
    myImage.style.display = 'block';
});

document.addEventListener('DOMContentLoaded', ()=> {
    const searchProfilePhoto = document.querySelectorAll('.gb_p.gbii');
    if (searchProfilePhoto) {
        const photoEl = searchProfilePhoto[0];
        const url32 = chrome.runtime.getURL('/icon/32.png');
        const url64 = chrome.runtime.getURL('/icon/64.png');
        photoEl.src = url32;
        photoEl.srcset = `${url32} 1x, ${url64} 2x`;
    }
})