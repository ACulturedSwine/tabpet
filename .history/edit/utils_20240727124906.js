async function isValidImageURL(url) {
    await fetch(url,{method:'HEAD'});
    const buff = await res.blob();
    return buff.type.startsWith('image/');
}

function isValidImageURL1(url) {
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