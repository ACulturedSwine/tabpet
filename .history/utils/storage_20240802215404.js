function getAllStorageKeys() {
    chrome.storage.sync.get(null, function(items) {
        var keys = Object.keys(items);
        for (let key in keys) console.log(items[key]);
    });
}

function createDownloadButton() {
    
}