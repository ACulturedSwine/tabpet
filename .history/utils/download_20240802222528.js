// Thank you https://stackoverflow.com/questions/27915228/chrome-extension-download-localstorage-data

import { getPetInfo } from '/utils/pet-info.js';

let exportFileObjectURL = null;
let prepareDownloadButton = null;
let downloadButton = null;

export default function handleDownload() {
    createPrepareDownloadButton();
    createDownloadButton();
}

function createPrepareDownloadButton() {
    const button = document.createElement('button');
    button.addEventListener('click', prepareDownload);
    return button;
}

function createDownloadButton() {
    const button = document.createElement('button');
    return button;
}

async function prepareDownload() {
    const fileName = 'pet_info.json';
    const contentType = 'application/json';
    const petInfo = await getPetInfo();
    exportFileObjectURL = createDownloadData(petInfo, contentType);

    downloadButton.setAttribute('download', fileName);
    downloadButton.setAttribute('data-downloadurl', `${contentType}:${fileName}:${exportFileObjectURL}`);
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