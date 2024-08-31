/* Dynamic import to allow content script to dynamicallys import modules */
(async () => {
    const src = chrome.extension.getURL('src/js/content_main.js');
    const contentScript = await import(src);
    contentScript.main();
})();