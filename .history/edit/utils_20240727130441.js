async function isValidImageURL1(url) { // Alternative method
    const res = await fetch(url,{method:'HEAD'});
    const buff = await res.blob();
    console.log(buff.type.startsWith('image/'));
    return buff.type.startsWith('image/');
}

function isValidImage(img) {

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

export { isValidImageURL };