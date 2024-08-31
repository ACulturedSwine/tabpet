import { randomAlphaString, chance } from '/utils/general-utils.js';
import { isOverflowing } from '/utils/content-utils.js';

const searchBarTextArea = document.getElementById('APjFqb');
let trendingSearchesContainer = document.querySelector('.erkvQe');
let trendingSearchesDiv = null;

getTrendingSearchesDiv();

function pseudoTypeSearch() {
    if (searchBarTextArea === document.activeElement || hasSearch()) return; // Prevent custom text if search bar text area is focused or contains text

    const customSearchText = document.getElementById('custom-search-text');
    customSearchText.style.display = 'block';
    const minLengthToClear = 25;
    if (customSearchText.textContent.length >= minLengthToClear && chance(0.1) || isOverflowing(customSearchText)) customSearchText.textContent = '';
    else customSearchText.textContent += randomAlphaString();
}

function hasSearch() { // If haven't initially clicked in search bar or search bar has text, "Trending searches" will not show.
    if (!trendingSearchesDiv) return false;
    return !trendingSearchesDiv.textContent;
}

function getTrendingSearchesDiv() {
    searchBarTextArea.addEventListener('focus', ()=> {
        trendingSearchesDiv = trendingSearchesContainer.querySelector('.ynRric');
    }, {once: true});
}

export { pseudoTypeSearch };