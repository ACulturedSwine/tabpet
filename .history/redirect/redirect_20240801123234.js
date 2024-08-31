let link = null;

// If 
const personalInfo = await chrome.storage.sync.get('personalInfo');
if (personalInfo) link = 'https://google.com';
else link = chrome.runtime.getURL('/init/create.html');

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