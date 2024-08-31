import { isNonEmptyObject } from '/utils/general-utils.js'

redirect();
async function redirect() {
    const testingOnlyNewTab = true;
    let link = 'https://google.com';

    if (!testingOnlyNewTab) { // Verify if pet information is updated
        // If personal info completed, open google.com. Else, redirect to personal info form.
        const petInfo = await chrome.storage.sync.get('petInfo');
        if (isNonEmptyObject(petInfo)) link = chrome.runtime.getURL('/init/create.html');
    }

    // Redirect
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
}