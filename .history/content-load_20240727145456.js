/* Dynamic import to allow content script to import modules */
(async () => {
    const src = chrome.extension.getURL('/content-main.js');
    const mainContentScript = await import(src);
    mainContentScript.main();
})();

function importFromPath(path) {
    return new Promise((resolve)=> {
        import(path).then((module) => {
            resolve(module);
        })
    })
}