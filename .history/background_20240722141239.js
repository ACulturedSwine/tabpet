chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Check if the request is for an image
      if (details.type === "image") {
        // Modify the URL to your desired new URL
        console.log(details);
        const url64 = chrome.runtime.getURL('/icon/64.png');
  
        // Return the new URL in the blocking response
        return {redirectUrl: url64};
      }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
  );