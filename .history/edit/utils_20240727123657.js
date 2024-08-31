function isValidImageURL(url) {
    if (typeof url !== 'string') return false;
    new Promise((resolve) => {
        const img = new Image();
    
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
}

export { isImageURL };