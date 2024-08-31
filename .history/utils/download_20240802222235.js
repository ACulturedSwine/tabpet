// Thank you https://stackoverflow.com/questions/27915228/chrome-extension-download-localstorage-data

import { getPetInfo } from '/utils/pet-info.js';

let exportFileObjectURL = null;
let prepareDownloadButton = null;
let downloadButton = null;

export default function handleDownload() {

}

function createPrepareDownloadButton() {

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
