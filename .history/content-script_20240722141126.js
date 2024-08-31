/*
document.addEventListener('DOMContentLoaded', ()=> {
    const searchProfilePhoto = document.querySelectorAll('.gb_p.gbii');
    if (searchProfilePhoto) {
        const photoEl = searchProfilePhoto[0];
        const url32 = chrome.runtime.getURL('/icon/32.png');
        const url64 = chrome.runtime.getURL('/icon/64.png');
        photoEl.src = url32;
        photoEl.srcset = `${url32} 1x, ${url64} 2x`;
    }
})
*/
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Check if the request is for an image
      if (details.type === "image") {
        // Modify the URL to your desired new URL
        let newUrl = "https://example.com/new-image.jpg";
  
        // Return the new URL in the blocking response
        return {redirectUrl: newUrl};
      }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
  );
  