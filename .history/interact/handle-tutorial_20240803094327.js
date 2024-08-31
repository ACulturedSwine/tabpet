import { createPopupMsg } from '/utils/popup-box.js';

export default async function handleTutorial() {
    await createPopupMsg({content: 'Say hi to your new gerbil!', waitTime: 2000});
    await createPopupMsg({content: 'Say hi to your new gerbil!', waitTime: 2000});
}