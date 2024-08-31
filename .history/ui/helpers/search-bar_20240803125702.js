function handleCustomSearchText() {
    const customSearchText = createCustomSearchText();
    handleRemoveCustomSearchText(customSearchText);
}

function createCustomSearchText() {
    // Create element
    const customSearchText = document.createElement('div');
    customSearchText.id = 'custom-searchbar-text';
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

function typeSearch() {

}

export { handleCustomSearchText,  }
