function isValidImageURL(url) {
    new Promise((resolve) => {
        if (typeof url !== 'string') resolve(false);

        const img = new Image();
    
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

export { isImageURL };