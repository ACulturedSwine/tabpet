function isImageURL(url) {
    return url.match(/\.(jpeg|jpg|png)$/) != null;
}

export {isImageURL};