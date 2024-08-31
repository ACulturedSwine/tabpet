import { getPetInfo } from '/utils/pet-info.js';
import { getProfilePhotoSrc } from '/utils/pet-info.js';
import { initPopupBox } from '/utils/popup-box.js';
import { handleDownload } from '/utils/download.js';
import { setupPetProfile } from '/ui/helpers/pet-profile.js';

export default function handleUI() {
    addFonts();
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

async function createExtensionHeader() {
    // Create extension header
    const extensionHeader = document.createElement('div');
    extensionHeader.id = 'extension-header';

    // Append to Chrome header
    const chromeHeader = document.getElementById('gb');
    chromeHeader.appendChild(extensionHeader);

    // Get pet information to populate pet profile
    const petInfo = await getPetInfo();

    // Load icons
    const { prepareDownloadIcon, downloadIcon } = handleDownload();
    const { petProfileIcon } = setupPetProfile(petInfo);

    extensionHeader.appendChild(petProfileIcon);
    extensionHeader.appendChild(prepareDownloadIcon);
    extensionHeader.appendChild(downloadIcon);
}