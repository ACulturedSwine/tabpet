function getURLParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

}

export { getURLParams };