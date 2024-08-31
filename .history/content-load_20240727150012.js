/* Dynamic import to allow content script to import modules */
(async () => {
    const src = chrome.runtime.getURL('/content-main.js');
    const mainContentScript = await import(src);
    mainContentScript.main();
})();