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

async function handleImgPaste(data, fileCallback, urlCallback) { // Returns img type (file or url), else false
    if (data.files && data.files[0]) {
        fileCallback(data.files[0]);
        setCustomPhoto(data.files[0]);
    }
    else if (data.getData('text')) {
        const url = data.getData('text');
        const valid = await isValidImageURL(url);
        if (valid) {
            setCustomPhoto(url);
        }
    }
}

export { isValidImageURL };