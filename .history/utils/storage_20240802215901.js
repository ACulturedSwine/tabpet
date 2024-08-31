// Thank you https://stackoverflow.com/questions/27915228/chrome-extension-download-localstorage-data

function getAllStorageKeys() {
    chrome.storage.sync.get(null, function(items) {
        var keys = Object.keys(items);
        for (let key in keys) console.log(items[key]);
    });
}

function createDownloadButton() { // Returns download button to download pet info
   
}

prepareFileExport: function(e){
    var content = FileDownload._getFileContents();
    var contentType = 'application/json';
    FileDownload.exportFileObjectUrl = FileDownload._createDownloadData(content, contentType);

    var fileName = "some_file.json";
    FileDownload.downloadButton.href = FileDownload.exportFileObjectUrl;
    FileDownload.downloadButton.setAttribute("download", fileName);
    FileDownload.downloadButton.setAttribute("data-downloadurl", contentType + ":" + fileName + ":" + FileDownload.exportFileObjectUrl);
    FileDownload.downloadButton.removeAttribute("hidden");
  },

  // File content generator
  _getFileContents: function(){
    //generate some content as a string.
    var mock = {
      'a': 'test data'
    };
    return JSON.stringify(mock);
  },

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

export { getAllStorageKeys, createDownloadButton }