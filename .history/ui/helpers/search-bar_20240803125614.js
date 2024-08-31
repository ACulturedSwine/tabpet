function handleCustomSearchText() {
    const customSearchText = createCustomSearchText();
    handleRemoveCustomText(customSearchText);
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

function handleRemoveCustomText(customSearchText) {
    const searchBarTextArea = document.querySelector('.gLFyf');
    searchBarTextArea.addEventListener('click', ()=> {
        customSearchText.textContent = '';
        customSearchText.style.display = 'none';
    });
}
