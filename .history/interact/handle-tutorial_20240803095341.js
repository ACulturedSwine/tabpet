import { createPopupMsg } from '/utils/popup-box.js';

export default async function handleTutorial() {
    await createPopupMsg({content: '👋 Say hi to your new gerbil!', waitTime: 2000});
    await createPopupMsg({content: '🍩 If you want to feed your gerbil, click CTRL-V to paste images (both images and image addresses work)!', waitTime: 5000});
}

function isTutorialCompleted() {
    return new Promise(async (resolve)=> {
        await chrome.storage.sync.get();
    })
}