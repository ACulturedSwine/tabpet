let link = null;

// If personal info completed, open google.com. Else, redirect to personal info form.
const petInfo = await chrome.storage.sync.get('petInfo');
if (petInfo) link = 'https://google.com';
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