// Thank you https://stackoverflow.com/questions/27915228/chrome-extension-download-localstorage-data

import { getPetInfo } from '/utils/pet-info.js';

let exportFileObjectURL = null;
let prepareDownloadEl = null;
let downloadEl = null;

export function handleDownload() {
    prepareDownloadEl = createPrepareDownloadEl();
    downloadEl = createDownloadEl();

    const chromeHeader = document.getElementById('gb');
    chromeHeader.appendChild(prepareDownloadEl);
    chromeHeader.appendChild(downloadEl);
}

function createPrepareDownloadEl() {
    const el = document.createElement('el');
    el.classList.add('prepare-download');
    el.addEventListener('click', prepareDownload);
    return el;
}

function createDownloadEl() {
    const el = document.createElement('el');
    el.classList.add('download-el');
    return el;
}

async function prepareDownload() {
    const fileName = 'pet_info.json';
    const contentType = 'application/json';
    const petInfo = await getPetInfo();
    exportFileObjectURL = createDownloadData(petInfo, contentType);

    downloadEl.setAttribute('download', fileName);
    downloadEl.setAttribute('data-downloadurl', `${contentType}:${fileName}:${exportFileObjectURL}`);
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