const link = "https://google.com";
console.log('hi');
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