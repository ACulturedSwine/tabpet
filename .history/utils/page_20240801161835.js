function getURLParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams;
}

export { getURLParams };