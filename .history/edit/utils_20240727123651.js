function isValidImageURL(url) {
    if (typeof url !== 'string') return false;
    return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
}

export { isImageURL };