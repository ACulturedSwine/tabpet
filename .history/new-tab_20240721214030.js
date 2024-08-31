const profileSelectorURL = 'https://accounts.google.com/SignOutOptions?hl=en&amp;continue=https://www.google.com%3Fhl%3Den-US&amp;ec=GBRA8wE';

const profileSelectorEl = document.getElementById('profile-selector');
const viewportwidth = document.documentElement.clientWidth;

profileSelectorEl.addEventListener('click', () => {
    window.open(
        profileSelectorURL,
        'popUpWindow',
        `height=500,width=400,left=${viewportwidth-400},top=100,resizable=no,scrollbars=no`
    );
})