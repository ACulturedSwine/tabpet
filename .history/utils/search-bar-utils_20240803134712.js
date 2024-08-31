import { randomString } from '/utils/general-utils.js';

function pseudoTypeSearch() {
    return;
    const customSearchText = document.getElementById('custom-search-text');
    customSearchText.style.display = 'block';
    customSearchText.textContent += randomString();
}

export { pseudoTypeSearch };