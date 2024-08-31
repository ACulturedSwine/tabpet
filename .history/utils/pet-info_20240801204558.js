import { isNonEmptyObject } from '/utils/general-utils.js'
import { testingNewTab } from '/utils/page.js';

const samplePetInfo = {
    "type": "gerbil",
    "subtype": "White",
    "firstName": "Lotus",
    "lastName": "Head",
    "month": "1",
    "day": "1",
    "year": "2020",
    "gender": "Female",
    "selectPhoto": "2"
};

function getPetInfo() {
    return new Promise(async (resolve)=> {
        // Testing new tab, don't use stored pet info
        if (testingNewTab()) resolve(samplePetInfo);

        // Else, get stored pet info
        const petInfo = await chrome.storage.sync.get('petInfo');
        if (isNonEmptyObject(petInfo)) resolve(petInfo); // Return only if pet info is object and not empty
        else resolve(null);
    })
}

function formatFullName(petInfo) {
    let name = petInfo.firstName;
    if (petInfo.lastName) name += ' ' + petInfo.lastName;

    return name;
}

function formatBirthday(petInfo) { // Return birthday with month typed out
    return new Date(petInfo.year, petInfo.month - 1, petInfo.year).toDateString(); // Month is indexed at 0
}

function getProfilePhotoSrc(petInfo) {
    if (petInfo.selectPhoto === 'Custom') return petInfo.photoUpload;
    else return chrome.runtime.getURL(`/assets/profile-photos/${petInfo.selectPhoto}.png`);
}

function getSpriteSrc(type, subtype, pose='side', source) {
    console.log(type, subtype, pose);
    /*
    console.log(`/assets/${type.toLowerCase()}/${subtype.toLowerCase()}/${pose}.png`);
    const chromeURL = chrome.runtime.getURL(`/assets/${type.toLowerCase()}/${subtype.toLowerCase()}/${pose}.png`);
}

export { samplePetInfo, getPetInfo, formatFullName, formatBirthday , getProfilePhotoSrc, getSpriteSrc };