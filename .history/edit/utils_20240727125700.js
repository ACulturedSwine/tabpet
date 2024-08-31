async function isValidImageURL1(url) { // Alternative method
    const res = await fetch(url,{method:'HEAD'});
    const buff = await res.blob();
    console.log(buff.type.startsWith('image/'));
    return buff.type.startsWith('image/');
}

function isValidImageURL(url) {
    return new Promise((resolve) => {
        // url not string
        if (typeof url !== 'string') resolve(false);

        // check if image exists
        const img = document.createElement('img');

        img.src = url;
    
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

export { isValidImageURL };