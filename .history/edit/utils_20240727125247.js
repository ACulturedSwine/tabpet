async function isValidImageURL(url) {
    const res = await fetch(url,{method:'HEAD'});
    const buff = await res.blob();
    console.log(buff.type.startsWith('image/'));
    return buff.type.startsWith('image/');
}

function isValidImageURL1(url) {
    return new Promise((resolve) => {
        // url not string
        if (typeof url !== 'string') resolve(false);

        // check if image exists
        const img = new Image();
    
        img.addEventListener('load', function imgOnLoad() {
            resolve(this);
        });

        // When there's an error during load, reject the promise
        img.addEventListener('error', function imgOnError() {
            reject();
        })

        // Assign URL
        img.src = url;
    });
}

export { isValidImageURL };