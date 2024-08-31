import { getPetInfo } from '/utils/pet-info.js';
import { getProfilePhotoSrc } from '/utils/pet-info.js';

export function handlePetProfile() {
    changeProfilePhoto();
}

async function changeProfilePhoto() {
    const petInfo = await getPetInfo();
    if (!petInfo) {
        
    } 
    
    const src = getProfilePhotoSrc(petInfo);
    console.log(src);

    const url32 = chrome.runtime.getURL('/icon/32.png');
    const url64 = chrome.runtime.getURL('/icon/64.png');

    const photoEl = document.querySelector('.gb_q.gbii');
    if (photoEl) {
        photoEl.src = src;
        photoEl.srcset = '';
        // photoEl.srcset = `${url32} 1x, ${url64} 2x`;
    }
}