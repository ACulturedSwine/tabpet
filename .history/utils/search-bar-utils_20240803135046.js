import { randomAlphaString } from '/utils/general-utils.js';

function pseudoTypeSearch() {
    const customSearchText = document.getElementById('custom-search-text');
    customSearchText.style.display = 'block';
    customSearchText.textContent += randomAlphaString();
}

export { pseudoTypeSearch };