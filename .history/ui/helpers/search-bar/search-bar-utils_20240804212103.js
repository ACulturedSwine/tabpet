import { chance } from '/utils/general-utils.js';
import { isOverflowing } from '/utils/content-utils.js';
import { randomFromArray } from '../../../utils/general-utils.js';
import texts from './texts.js';

const searchBarTextArea = document.getElementById('APjFqb');
let customSearchText = null;
let text = `lalallalal\nhihihi`;

function pseudoTypeSearch() {
    if (searchBarTextArea === document.activeElement) return; // Prevent custom text if search bar text area is focused or contains text
    if (!customSearchText) customSearchText= document.getElementById('custom-search-text');

    customSearchText.style.display = 'block';

    const minLengthToClear = 25;
    if (isOverflowing(customSearchText)) { // Clear text if overflow
        customSearchText.textContent = '';
    }
    else if (text) { // Currently iterating through text
        iterateText();
    }
    else if (chance(1)) { // Random chance to get text
        text = texts[3];// randomFromArray(texts);
        customSearchText.textContent = '';
        iterateText();
    }
    else if (customSearchText.textContent.length >= minLengthToClear && chance(0.1)) { // For random strings, have possibility of clearing
        customSearchText.textContent = '';
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
    const iterateLength = 5; // Length of string to get
    if (text.charAt(0) === '\n') { // Clear search bar on new line
        customSearchText.textContent = '';
    }
    else {
        const fullIterateString = text.slice(0, iterateLength);
        let iterateString = '';
        if (fullIterateString.includes('\n')) {
            const firstNewLinePosition = text.indexOf('\n');
            text = text.slice(firstNewLinePosition + 1);
        }
        else {
            iterateString = 
            text = text.slice(iterateLength);
        }
    }
}

export { pseudoTypeSearch };