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
        // Testing new tab
        if (testingNewTab()) resolve(samplePetInfo);

        const petInfo = await chrome.storage.sync.get('petInfo');
        if (isNonEmptyObject(petInfo)) resolve(petInfo); // Return only if is object and not empty
        else resolve(null);
    })
}

function formatFullName(savedInputs) {
    let name = savedInputs.firstName;
    if (savedInputs.lastName) name += ' ' + savedInputs.lastName;

    return name;
}

function formatBirthday(savedInputs) { // Return birthday with month typed out
    return new Date(savedInputs.year, savedInputs.month - 1, savedInputs.year).toDateString(); // Month is indexed at 0
}

function getProfilePhotoSrc(savedInputs) {
    if (savedInputs.selectPhoto === 'Custom') return savedInputs.photoUpload;
    else return chrome.runtime.getURL(`/profile-photos/${savedInputs.selectPhoto}.png`);
}


export { samplePetInfo, getPetInfo, formatFullName, formatBirthday , getProfilePhotoSrc };