const profileSelectorURL = 'https://accounts.google.com/SignOutOptions?hl=en&amp;continue=https://www.google.com%3Fhl%3Den-US&amp;ec=GBRA8wE';

// window.open(userPickerURL, '_blank', 'popup=true, width=50');
var pwin = window.open(profileSelectorURL, 'popUpWindow', 'height=500,width=400,left=100,top=100,resizable=no,scrollbars=no');