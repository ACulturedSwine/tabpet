import { getPetInfo } from '/utils/pet-info.js';

redirect();
async function redirect() {
    const testingNewTab = false;
    let link = 'https://google.com';

    if (testingNewTab) { // Testing only new tab mechanics, use sample pet info
        link += '/#testingNewTab';
    }
    else if (getPetInfo()) { // Verify if pet information is updated.
        link = chrome.runtime.getURL('/init/create.html'); // If not updated, redirect to form.
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