redirect();
async function redirect() {
    let link = null;

    // If personal info completed, open google.com. Else, redirect to personal info form.
    const petInfo = await chrome.storage.sync.get('petInfo');
    console.log(petInfo);
    if (petInfo && petInfo !== Object.prototype) link = 'https://google.com';
    else link = chrome.runtime.getURL('/init/create.html');

    console.log(link);

    /*
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
    */
}