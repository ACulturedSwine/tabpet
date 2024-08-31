import { getPetInfo } from "/utils/pet-info";

redirect();
async function redirect() {
    const testingSample = true;
    let link = 'https://google.com';

    if (testingSample) { // Testing only new tab mechanics, use sample pet info
        link += '?testingSample=true';
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