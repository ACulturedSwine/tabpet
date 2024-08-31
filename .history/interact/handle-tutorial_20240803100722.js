import { createPopupMsg } from '/utils/popup-box.js';

export default async function handleTutorial() {
    // If completed, prevent tutorial from executing again
    const completed = await chrome.storage.sync.get(['tutorialCompleted']);
    if (completed === true) return;
    
    // Tutorial messages
    await createPopupMsg({content: '👋 Say hi to your new gerbil!', waitTime: 2000});
    await createPopupMsg({content: '🍩 If you want to feed your gerbil, click CTRL-V to paste images (both images and image addresses work)!', waitTime: 5000});
    await createPopupMsg({content: `To see your pet's profile, click 🐹 at the top left corner.`, waitTime: 3000});
    await createPopupMsg({content: `To download your pet's data, click ⬇️ at the top left corner.`, waitTime: 3000});
    await createPopupMsg({content: '💡 Downloading your data will be important if you want to keep up with extension updates!', waitTime: 4000});
    await createPopupMsg({content: 'To disable the extension, go to chrome://extensions and click the toggle off button', waitTime: 5000});

    // Update that tutorial is completed
    // chrome.storage.sync.set({ tutorialCompleted: true });
}