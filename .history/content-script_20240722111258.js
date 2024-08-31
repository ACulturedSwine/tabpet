document.addEventListener('DOMContentLoaded', ()=> {
    if (window.location.hash === '#new-tab-redirect') {
        history.pushState({}, '', '/');

    }
})