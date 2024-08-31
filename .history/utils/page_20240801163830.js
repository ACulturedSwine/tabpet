function getURLParams() {
    const queryString = window.location.search;
    console.log('query', queryString);
    if (!queryString) return null; 
    const urlParams = new URLSearchParams(queryString);
    return urlParams;
}

export { getURLParams };