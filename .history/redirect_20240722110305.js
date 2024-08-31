const link = "https://google.com/#new-tab-redirect";

try {
    chrome.tabs.getCurrent((tab) => {
        chrome.tabs.update(
            tab.id,
            {url: link}
        );
    })
} catch(error) {
    console.log(error);
    document.location.href = link;
}