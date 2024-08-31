import { randomAlphaString, chance } from '/utils/general-utils.js';
import { isOverflowing, wait } from '/utils/content-utils.js';

const searchBarTextArea = document.getElementById('APjFqb');
const searchSuggestions = document.getElementById('Alh6id');
let trendingSearchesDiv = null;
let found = false;
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
    console.log('found', found);
    if (!found) return false;
    return !trendingSearchesDiv.textContent;
}

function getTrendingSearchesDiv() {
    searchBarTextArea.addEventListener('click', async ()=> {
        await wait(500); // Wait for Trending Searches to appear 
        trendingSearchesDiv = searchSuggestions.querySelector('.ynRric');
        found = true;
    }, {once: true});
}

export { pseudoTypeSearch };