import { randomAlphaString, chance } from '/utils/general-utils.js';
import { isOverflowing } from '/utils/content-utils.js';

function pseudoTypeSearch() {
    const searchBarTextArea = document.getElementById('APjFqb');
    

    const customSearchText = document.getElementById('custom-search-text');
    customSearchText.style.display = 'block';
    const minLengthToClear = 25;
    if (customSearchText.textContent.length >= minLengthToClear && chance(0.1) || isOverflowing(customSearchText)) customSearchText.textContent = '';
    else customSearchText.textContent += randomAlphaString();
}

export { pseudoTypeSearch };