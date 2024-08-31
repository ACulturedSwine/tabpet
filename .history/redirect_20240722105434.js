const link = "https://google.com";

try {
    chrome.tabs.getCurrent((tab) => {
        chrome.tabs.update(
            tab.id,
            {url: link},
            function() {
                console.log('updated!')
            }
        );
    })
} catch(error) {
    console.log(error);
    document.location.href = link;
}