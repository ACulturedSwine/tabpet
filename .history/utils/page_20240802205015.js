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

function testingNewTab() {
    return getHash() === 'testingNewTab';
}

function loadDefaultNewTab() {
    chrome.tabs.update({ url: "chrome-search://local-ntp/local-ntp.html" });
}

export { getURLParams, getHash, testingNewTab, loadDefaultNewTab };