/* Dynamic import to allow content script to import modules */
(async () => {
    const src = chrome.extension.getURL('/content-main.js');
    const contentScript = await import(src);
    contentScript.main();
})();