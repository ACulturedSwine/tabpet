async function isValidImageURL1(url) { // Alternative method
    const res = await fetch(url,{method:'HEAD'});
    const buff = await res.blob();
    console.log(buff.type.startsWith('image/'));
    return buff.type.startsWith('image/');
}

function isValidImageURL(url) { // Doesn't work in some cases like https://static.wikia.nocookie.net/vocaloid/images/4/43/Yukari_lin.png/revision/latest?cb=20210911233038
    return new Promise((resolve) => {
        // url not string
        if (typeof url !== 'string') resolve(false);

        // check if image exists
        const img = new Image();

        img.src = url;
    
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

function isPastedImg(e) { // Returns image and type if image exists, else null
    return new Promise(async (resolve) => {
        const data = e.clipboardData || window.clipboardData;
        let processedImg = null;
        if (data.files && data.files[0]) {
            const file = data.files[0];
            processedImg = {type: 'file', img: file};
        }
        else if (data.getData('text')) {
            const url = data.getData('text');
            const valid = await isValidImageURL(url);
            if (valid) {
                processedImg = {type: 'url', img: url};
            }
        }
    
        resolve(processedImg);
    })
} 

async function handleImgPaste(e, params) { // Does something if image given callbacks
    const res = await isPastedImg(e);
    if (!res) {
        return;
    }
    else if (!params || !params.callback && !params.fileCallback && !params.urlCallback) {
        throw new Error('Params not defined or needs callback', params);
    }

    let fileCallback = params.callback || params.fileCallback || null;
    let urlCallback = params.callback || params.urlCallback || null;

    if (fileCallback) {
        fileCallback(data.files[0]);
    }
    else if (data.getData('text')) {
        const url = data.getData('text');
        if (!urlCallback) {
            return {type: 'url', img: url};
        }
        const valid = await isValidImageURL(url);
        if (valid) {
            urlCallback(url);
        }
    }
    else {
        return null;
    }
    */
}

export { isValidImageURL , handleImgPaste };