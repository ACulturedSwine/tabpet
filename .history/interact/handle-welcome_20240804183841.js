import { createPopupMsg } from '/utils/popup-box.js';
import { isSpecialDay, openedToday, getTimeOfDay } from '/utils/date.js';

export default async function handleWelcome(pet) {
    // If tutorial not completed, run tutorial
    const res = await chrome.storage.sync.get(['tutorialCompleted']);
    if (res.tutorialCompleted) return;

    const specialDay = isSpecialDay();
    if (specialDay) {
        pet.specialDay(specialDay);
    }
    else if (!openedToday()) {
        const timeOfDay = getTimeOfDay();
        pet.welcome(timeOfDay);
    }
    else {
        randomEmote();
    }
}

async function handleTutorial() {    
    // Tutorial messages
    await createPopupMsg({content: '👋 Say hi to your new pet!', waitTime: 2000});
    await createPopupMsg({content: '🍩 If you want to feed your pet, click CTRL-V to paste images (both images and image addresses work)!', waitTime: 5000});
    await createPopupMsg({content: `🐹 To see your pet's profile, click their profile picture at the top left corner.`, waitTime: 5000});
    await createPopupMsg({content: `💡 To download your pet's data, click ⬇️ at the top left corner.`, waitTime: 5000});
    await createPopupMsg({content: '⬇️ You will need to download it before extension updates.', waitTime: 5000});
    await createPopupMsg({content: '💡 To disable the extension, go to chrome://extensions and click the toggle off button.', waitTime: 5000});
    await createPopupMsg({content: `📝 If you remove the extension, your pet's data will be deleted! And that's not fun..`, waitTime: 5000});

    // Update that tutorial is completed
    chrome.storage.sync.set({ tutorialCompleted: true }).then(()=> {
        createPopupMsg({content: `🎂 Okie, that's all for now! Bai`, waitTime: 2000});
    });
}