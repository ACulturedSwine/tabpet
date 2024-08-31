// Thank you https://stackoverflow.com/questions/27915228/chrome-extension-download-localstorage-data

import { getPetInfo } from '/utils/pet-info.js';

let exportFileObjectURL = null;
let downloadButton = null;

export default function handleDownload() {

}

prepareButton.addEventListener('click', FileDownload.prepareFileExport);
  },



function create

async function prepareDownload() { // Returns download button to download pet info
    const fileName = 'pet_info.json';
    const contentType = 'application/json';
    const petInfo = await getPetInfo();
    exportFileObjectURL = createDownloadData(petInfo, contentType);

    const button = document.createElement('button');
    button.setAttribute('download', fileName);
    button.setAttribute('data-downloadurl', `${contentType}:${fileName}:${exportFileObjectURL}`);
}

function createDownloadData(data, contentType) {
    if () {}
    const blob = 
}

function getAllStorageKeys() {
  chrome.storage.sync.get(null, function(items) {
      var keys = Object.keys(items);
      for (let key in keys) console.log(items[key]);
  });
}

  //Result with URL to the file.
  _createDownloadData: function(data, contentType){
    if(FileDownload.exportFileObjectUrl !== null){
      FileDownload._revokeDownloadData();
    }
    var blob = new window.Blob([data], {type: contentType});
    return window.URL.createObjectURL(blob);
  },

  /// Cleanup.
  _revokeDownloadData: function(){
    window.URL.revokeObjectURL(FileDownload.exportFileObjectUrl);
  },