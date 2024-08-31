/* Dynamic import to allow content script to import modules */
(async () => {
    console.log('content-load injected');
    const mainContentScript = await import('/content/content-main.js');
    mainContentScript.main();
    console.log(mainContentScript);
})();