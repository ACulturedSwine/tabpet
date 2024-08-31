import { randomAlphaString, chance } from '/utils/general-utils.js';

function pseudoTypeSearch() {
    const customSearchText = document.getElementById('custom-search-text');
    customSearchText.style.display = 'block';
    if (chance(0.3)) customSearchText.textContent = '';
    else customSearchText.textContent += randomAlphaString();
}

function isOverflowing() {
    return el.clientWidth < el.scrollWidth 
      || el.clientHeight < el.scrollHeight;
}

export { pseudoTypeSearch };