import { isNonEmptyObject } from '/utils/general-utils.js'
import { testingNewTab } from '/utils/page.js';

const samplePetInfo = {
    "type": "Gerbil",
    "subtype": "Mottled-Blue",
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

        // Else, get stored pet info (from https://developer.chrome.com/docs/extensions/reference/api/storage)
        const data = await chrome.storage.sync.get('petInfo');
        const petInfo = {};
        Object.assign(petInfo, data.petInfo);

        if (isNonEmptyObject(petInfo)) resolve(petInfo); // Return only if pet info is object and not empty
        else resolve(null);
    })
}

function getBirthdayObject(petInfo) {
    return new Date(petInfo.year, petInfo.month - 1, petInfo.year); // -1 because month is indexed at 0
}

function formatFullName(petInfo) {
    let name = petInfo.firstName;
    if (petInfo.lastName) name += ' ' + petInfo.lastName;

    return name;
}

function formatBirthday(petInfo) { // Return birthday with month typed out
    return new getBirthdayObject(petInfo).toDateString();
}

function getAge(petInfo) {
    const birthDate = getBirthdayObject(petInfo);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function formatAge(petInfo) { // Returns age as "x year(s) old"
    const age = getAge(petInfo);
    let desc = age;
    if (age === 1) desc += ' year old';
    else desc += ' years old';

    return desc;
}

function getProfilePhotoSrc(petInfo) {
    console.log(petInfo);
    if (petInfo.selectPhoto === 'Custom') return petInfo.photoUpload;
    else return chrome.runtime.getURL(`/assets/profile-photos/${petInfo.selectPhoto.toLowerCase()}.png`);
}

function getSpriteSrc(type, subtype, pose='side', origin='content-script') {
    console.log(type, subtype, pose);
    // Type and subtype must be lowercase
    type = type.toLowerCase();
    subtype = subtype.replaceAll(' ', '-').toLowerCase();

    let url = `/assets/${type}/${subtype}/${pose}.png`;
    // Content script needs to get url from chrome.runtime.
    // For extension pages, set origin to 'extension' because chrome.runtime doesn't work in extension pages.
    if (origin === 'content-script') {
        url = chrome.runtime.getURL(url);
    }
    return url;
}

export { samplePetInfo, getPetInfo, formatFullName, formatBirthday, getAge, formatAge, getProfilePhotoSrc, getSpriteSrc };