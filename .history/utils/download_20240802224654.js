// Thank you https://stackoverflow.com/questions/27915228/chrome-extension-download-localstorage-data

import { getPetInfo } from '/utils/pet-info.js';

let exportFileObjectURL = null;
let prepareDownloadIcon = null;
let downloadIcon = null;

export function handleDownload() {
    prepareDownloadIcon = createPrepareDownloadIcon();
    downloadIcon = createDownloadIcon();

    const chromeHeader = document.getElementById('gb');
    chromeHeader.appendChild(prepareDownloadIcon);
    chromeHeader.appendChild(downloadIcon);
}

function createPrepareDownloadIcon() {
    const icon = createIcon();
    icon.classList.add('prepare-download-icon');
    icon.addEventListener('click', prepareDownload);
    return icon;
}

function createDownloadIcon() {
    const icon = createIcon();
    icon.classList.add('download-icon');
    return icon;
}

function createIcon() {
    const icon = document.createElement('a');
    icon.classList.add('icon');
    const iconCircle = document.createElement('div');
    iconCircle.classList.add('icon-circle');
    iconCircle.textContent = '🐹';
    icon.appendChild(iconCircle);
    return icon;
}

async function prepareDownload() {
    const fileName = 'pet_info.json';
    const contentType = 'application/json';
    const petInfo = await getPetInfo();
    exportFileObjectURL = createDownloadData(petInfo, contentType);

    downloadIcon.setAttribute('download', fileName);
    downloadIcon.setAttribute('data-downloadurl', `${contentType}:${fileName}:${exportFileObjectURL}`);
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