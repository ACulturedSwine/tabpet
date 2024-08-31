function getURLParams() {
    const queryString = window.location.search;
    console.log('query', queryString);
    if (!queryString) return null; 
    const urlParams = new URLSearchParams(queryString);
    return urlParams;
}

function getHash() { // Gets hash fragment without #
    return window.location.hash.substring(1);
}

export { getURLParams, getHash };