import { randomAlphaString, chance } from '/utils/general-utils.js';
import { isOverflowing } from '/utils/content-utils.js';

function pseudoTypeSearch() {
    const searchBarTextArea = document.getElementById('APjFqb');
    if (searchBarTextArea === document.activeElement || hasSearch()) return; // Prevent custom text if search bar text area is focused or contains text

    const customSearchText = document.getElementById('custom-search-text');
    customSearchText.style.display = 'block';
    const minLengthToClear = 25;
    if (customSearchText.textContent.length >= minLengthToClear && chance(0.1) || isOverflowing(customSearchText)) customSearchText.textContent = '';
    else customSearchText.textContent += randomAlphaString();
}

function hasSearch() {
    const searchBarQueryContainer = document.querySelector('.YacQv');
    if (!searchBarQueryContainer) return false;
    const searchBarQuery = searchBarQuery.querySelector('span');
    if (!searchBarQuery) return false;
    return searchBarQuery.textContent;
}

export { pseudoTypeSearch };