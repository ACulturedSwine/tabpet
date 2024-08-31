import { getPetInfo } from '/utils/pet-info.js';
import { getProfilePhotoSrc } from '/utils/pet-info.js';
import { initPopupBox } from '/utils/popup-box.js';
import { handleDownload } from '/utils/download.js';
import { createIcon } from '/utils/icon.js';

export function handleUI() {
    addFonts();
    changeProfilePhoto();
    handlePopupBox();
    createExtensionHeader();
}

function addFonts() {
    // Add Google Fonts links
    addLink('https://fonts.googleapis.com', 'preconnect');
    addLink('https://fonts.gstatic.com', 'preconnect', {crossOrigin: true});

    // Add Roboto
    const roboto = 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
    addLink(roboto, 'stylesheet');
}

function addLink(href, rel, params) {
    const linkEl = document.createElement('link');
    linkEl.href = href;
    linkEl.rel = rel;
    if (params) {
        if (params.crossOrigin) linkEl.setAttribute('crossorigin', 'anonymous');
    }

    document.head.appendChild(linkEl);
}

function handlePopupBox() {
    initPopupBox();
}

async function changeProfilePhoto() {
    const petInfo = await getPetInfo();
    let src32 = ''; // Image 32x32 px
    let src64 = ''; // Image 64x64 px
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
        profilePhotoEl.srcset = `${src32} 1x, ${src64} 2x`;
    }
}

function createExtensionHeader() {
    // Create extension header
    const extensionHeader = document.createElement('div');
    extensionHeader.id = 'extension-header';

    // Append to Chrome header
    const chromeHeader = document.getElementById('gb');
    chromeHeader.appendChild(extensionHeader);

    // Load icons
    const { prepareDownloadIcon, downloadIcon  } = handleDownload();
    extensionHeader.appendChild(prepareDownloadIcon);
    extensionHeader.appendChild(downloadIcon);
}

function createPetProfileIcon() {
    const icon = createIcon();
    icon.classList.add('pet-profile-icon'); 
    return icon;
}