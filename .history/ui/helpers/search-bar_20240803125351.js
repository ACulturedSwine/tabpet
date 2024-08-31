function handleCustomSearchText() {
    createCustomSearchText();
}

function createCustomSearchText() {
    const searchBarContainer = document.querySelector('.a4bIc');
    const searchBarTextArea = document.querySelector('.gLFyf');

    const customText = document.createElement('div');
    customText.id = 'custom-searchbar-text';
    customText.textContent = 'bla';
    searchBarContainer.appendChild(customText);
    searchBarTextArea.addEventListener('click', ()=> {
        customText.textContent = '';
        customText.style.display = 'none';
    })
}
