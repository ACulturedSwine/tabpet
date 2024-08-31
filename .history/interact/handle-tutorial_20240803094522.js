import { createPopupMsg } from '/utils/popup-box.js';

export default async function handleTutorial() {
    await createPopupMsg({content: 'Say hi to your new gerbil!', waitTime: 2000});
    await createPopupMsg({content: 'If you want to feed your gerbil, click CTRL-V to paste images (you can do either images or image addresses)!', waitTime: 5000});
}