if (window.location.hash === '#new-tab-redirect') {
    console.log('updating url');
    window.history.replaceState({}, '', location.pathname);
}