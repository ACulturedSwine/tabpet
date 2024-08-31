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

function hasSearch() { // If text in search bar, "Trending searches" will not show
    const trendingSearchesDiv = document.querySelector('.ynRric');
    if (trendingSearchesDiv.textContent) return false;
}

// .G43f7e first list element

export { pseudoTypeSearch };