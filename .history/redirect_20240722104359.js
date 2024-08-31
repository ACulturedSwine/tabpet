const link = "https://google.com";

try {
    chrome.tabs.getCurrent((tab) => {
        chrome.tabs.update()
    })
} catch(error) {
    document.location.href = link;
}