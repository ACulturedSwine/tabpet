console.log('running');

let interactImgType = 'food';

/* Import modules */
(async () => {
    const { Interactable } = await importFromPath('/interact/classes.js');
    const { isPastedImg } = await importFromPath('/interact/img-utils.js');
    const { getCursorPosition } = await importFromPath('/interact/interact-utils.js');

    console.log('func', isPastedImg);

    main();
})();

function importFromPath(path) {
    return new Promise((resolve)=> {
        import(path).then((module) => {
            resolve(module);
        })
    })
}

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
    document.addEventListener('paste', (e) => handleInteractableImg(e, interactImgType));
}

async function handleInteractableImg(e, type) {
    const imgData = isPastedImg(e);

    // Not image, don't do anything
    if (!imgData) return; 

    // Get image src and do something with it depending on interact type
    let src = imgData.img;
    if (imgData.type === 'file') src = window.URL.createObjectURL(imgData.img);
    if (type === 'food') {
        handleFood(e, src);
    }
}

async function handleFood(e, src) {
    const food = new Interactable('food', src, getCursorPosition(e));
    document.appendChild(food.el);
}