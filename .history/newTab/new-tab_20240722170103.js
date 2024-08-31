const profileSelectorURL1 = 'https://accounts.google.com/SignOutOptions?hl=en&amp;continue=https://www.google.com%3Fhl%3Den-US&amp;ec=GBRA8wE';
const profileSelectorURL = 'https://ogs.google.com/u/0/widget/account?yac=1&amb=1&origin=https%3A%2F%2Fwww.google.com&cn=account&pid=1&spid=538';
const profileSelectorEl = document.getElementById('profile-selector');
const viewportwidth = document.documentElement.clientWidth;

profileSelectorEl.addEventListener('click', () => {
    window.open(
        profileSelectorURL,
        'popUpWindow',
        `height=500,width=400,left=${viewportwidth-400},top=200,resizable=no,scrollbars=no`
    );
})