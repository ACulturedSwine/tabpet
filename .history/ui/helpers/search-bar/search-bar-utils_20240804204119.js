import { chance } from '/utils/general-utils.js';
import { isOverflowing } from '/utils/content-utils.js';
import { randomFromArray } from '../../../utils/general-utils.js';
import texts from '/utils/search-bar.search-bar-texts.js';

const searchBarTextArea = document.getElementById('APjFqb');
let text = '';

function pseudoTypeSearch() {
    if (searchBarTextArea === document.activeElement) return; // Prevent custom text if search bar text area is focused or contains text

    const customSearchText = document.getElementById('custom-search-text');
    customSearchText.style.display = 'block';
    const minLengthToClear = 25;
    if (customSearchText.textContent.length >= minLengthToClear && chance(0.1) || isOverflowing(customSearchText)) {
        customSearchText.textContent = '';
    }
    else if (text) { // Currently iterating through text
        customSearchText.textContent += iterateText();
    }
    else if (chance(0.3)) { // Random chance to get text
        text = randomFromArray(texts);
        customSearchText.textContent += iterateText();
    }
    else { // Add random char to text content
        customSearchText.textContent += randomAlphaString();
    }
}

function randomAlphaString(n=1) { // Generate random string of length n, comprised of letters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let string = '';
    for (let i = 0; i < n; i++) {
        string += randomFromArray(chars);
    }
    return string;
}

function iterateText() { // Returns first character of text and bumps to next character
    const firstChar = text[0];
    text = text.slice[1];
    console.log(firstChar);
    return firstChar;
}

export { pseudoTypeSearch };