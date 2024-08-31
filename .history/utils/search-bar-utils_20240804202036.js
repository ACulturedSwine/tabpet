import { chance } from '/utils/general-utils.js';
import { isOverflowing } from '/utils/content-utils.js';

const searchBarTextArea = document.getElementById('APjFqb');
let text = '';

function pseudoTypeSearch() {
    if (searchBarTextArea === document.activeElement) return; // Prevent custom text if search bar text area is focused or contains text

    const customSearchText = document.getElementById('custom-search-text');
    customSearchText.style.display = 'block';
    const minLengthToClear = 25;
    if (customSearchText.textContent.length >= minLengthToClear && chance(0.1) || isOverflowing(customSearchText)) customSearchText.textContent = '';
    else if (text) customSearchText.textContent += 
    else customSearchText.textContent += randomAlphaString();
}

function randomAlphaString(n=1) { // Generate random string of length n, comprised of letters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let string = '';
    for (let i = 0; i < n; i++) {
        string += randomFromArray(chars);
    }
    return string;
}

function randomText() {
    const texts = 
}

function addText(n=1) {

}

export { pseudoTypeSearch };