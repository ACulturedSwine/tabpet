import { getPetInfo } from '/utils/pet-info.js';
import { getProfilePhotoSrc } from '/utils/pet-info.js';

export function handlePetProfile() {
    changeProfilePhoto();
}

async function changeProfilePhoto() {
    const petInfo = await getPetInfo();
    let src32 = '';
    let src64 = '';
    if (petInfo) {
        src32 = src64 = getProfilePhotoSrc(petInfo);
    }
    else {
        src32 = chrome.runtime.getURL('/icon/32.png');
        src64 = chrome.runtime.getURL('/icon/64.png');
    }

    const profilePhotoEl = document.querySelector('.gb_q.gbii');
    if (profilePhotoEl) {
        profilePhotoEl.src = src32;
        profilePhotoEl.srcset = photoEl.srcset = `${src32} 1x, ${src64} 2x`;
    }
}