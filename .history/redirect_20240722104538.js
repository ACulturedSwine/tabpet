const link = "https://google.com";
console.log();
try {
    chrome.tabs.getCurrent((tab) => {
        chrome.tabs.update(
            tab.id,
            {url: link}
        );
    })
} catch(error) {
    document.location.href = link;
}