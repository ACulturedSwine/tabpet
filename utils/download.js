// Thank you https://stackoverflow.com/questions/27915228/chrome-extension-download-localstorage-data

import { getPetInfo } from '/utils/pet-info.js';
import { createPopupMsg } from '/utils/popup-box.js';
import { createIcon } from '/utils/icon.js';

let exportFileObjectURL = null;
let prepareDownloadIcon = null;
let downloadIcon = null;

export function handleDownload() {
    prepareDownloadIcon = createPrepareDownloadIcon();
    downloadIcon = createDownloadIcon();

    setIconsDisplay('prepare');

    return { prepareDownloadIcon , downloadIcon };
}

function createPrepareDownloadIcon() {
    const icon = createIcon('⬇️');
    icon.classList.add('prepare-download-icon');
    icon.addEventListener('click', prepareDownload);
    return icon;
}

function createDownloadIcon() {
    const icon = createIcon('⬇️');
    icon.classList.add('download-icon');
    icon.addEventListener('click', downloaded);
    return icon;
}

function setIconsDisplay(type) {
    if (type === 'prepare'){
        prepareDownloadIcon.style.display = 'inline-block';
        downloadIcon.style.display = 'none';
    }
    else if (type === 'download') {
        prepareDownloadIcon.style.display = 'none';
        downloadIcon.style.display = 'inline-block';
    }
}

async function prepareDownload() {
    const fileName = 'pet_info.json';
    const contentType = 'application/json';
    const petInfo = await getPetInfo();
    const petInfoJSON = JSON.stringify(petInfo);
    exportFileObjectURL = createDownloadData(petInfoJSON, contentType);

    downloadIcon.href = exportFileObjectURL;
    downloadIcon.setAttribute('download', fileName);

    // Hide prepare download icon once prepared
    setIconsDisplay('download');

    // Alert that download is prepared
    createPopupMsg({content: 'Pet data prepared, click ⬇️ to download', waitTime: 5000 });
}

function downloaded() {
    // Once downloaded, reset to prepare download
    setIconsDisplay('prepare');
}

function createDownloadData(data, contentType) {
    if (exportFileObjectURL !== null) {
        removePreviousDownloadData();
    }
    const blob = new window.Blob([data], {type: contentType});
    return window.URL.createObjectURL(blob);
}

function removePreviousDownloadData() {
    window.URL.revokeObjectURL(exportFileObjectURL);
}