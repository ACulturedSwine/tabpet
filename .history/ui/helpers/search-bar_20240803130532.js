import { randomString } from '/utils/general-utils.js';

function handleCustomSearchText() {
    const customSearchText = createCustomSearchText();
    handleRemoveCustomSearchText(customSearchText);
}

function createCustomSearchText() {
    // Create element
    const customSearchText = document.createElement('div');
    customSearchText.id = 'custom-search-text';
    customSearchText.textContent = 'bla';

    // Append to Chrome search bar
    const searchBarContainer = document.querySelector('.a4bIc');
    searchBarContainer.appendChild(customSearchText);

    // Return element to handle
    return customSearchText;
}

function handleRemoveCustomSearchText(customSearchText) {
    const searchBarTextArea = document.querySelector('.gLFyf');
    searchBarTextArea.addEventListener('click', ()=> {
        customSearchText.textContent = '';
        customSearchText.style.display = 'none';
    });
}

function pseudoTypeSearch() {
    const customSearchText = document.getElementById('custom-search-text');
    customSearchText.style.display = 'block';
    customSearchText += randomString();
}

export { handleCustomSearchText, pseudoTypeSearch }
