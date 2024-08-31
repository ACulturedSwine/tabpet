function getURLParams() {
    const queryString = window.location.search;
    if (!queryString) return null; 
    const urlParams = new URLSearchParams(queryString);
    return urlParams;
}

export { getURLParams };