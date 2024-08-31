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
  