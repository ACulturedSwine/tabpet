import { randomAlphaString, chance } from '/utils/general-utils.js';

function pseudoTypeSearch() {
    const customSearchText = document.getElementById('custom-search-text');
    customSearchText.style.display = 'block';
    if (chance(0.1) || isOverflowing(customSearchText)) customSearchText.textContent = '';
    else customSearchText.textContent += randomAlphaString();
}

export { pseudoTypeSearch };