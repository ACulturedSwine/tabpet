import { createIcon } from '/utils/icon.js';
import { createIDElement, appendChildren } from '/utils/content-utils.js';
import { getPetInfo, formatFullName, formatBirthday, formatAge } from '/utils/pet-info.js';

export function setupPetProfile() {
    const petProfileIcon = createPetProfileIcon();
    const petProfileWindow = createPetProfileWindow();
    petProfileIcon.appendChild(petProfileWindow);

    return { petProfileIcon, petProfileWindow };
}

function createPetProfileIcon() {
    const icon = createIcon('🐹');
    icon.id = 'pet-profile-icon';
    icon.addEventListener('click', togglePetProfileWindow);
    return icon;
}

async function createPetProfileWindow() {
    // Create window
    const window = document.createElement('div');
    window.id = 'pet-profile-window';
    window.classList.add('ui');
    window.classList.add('ui-window');
    window.noPetFollow = true;
    window.isOpen = true;
    window.style.display = 'block';

    // Create information header
    const header = document.createElement('div');
    header.id = 'pet-profile-header';

    const petInfo = await getPetInfo();

    const name = createIDElement('div', 'pet-profile-name', formatFullName(petInfo));
    const age = createIDElement('div', 'pet-profile-age', formatAge(petInfo));

    infoHeader.appendChildren();

    // Create information content
    const content = document.createElement('content');
    content.id = 'pet-profile-content';

    const birthday = document.createElement('div');
    birthday.id = 'pet-profile-birthday';
    birthday.textContent = `Born on ${formatBirthday(petInfo)}`;

    window.appendChildren();

    return window;
}

function togglePetProfileWindow() {
    const petProfileWindow = document.getElementById('pet-profile-window');
    // Toggle isOpen value
    petProfileWindow.isOpen = !petProfileWindow.isOpen;

    // Display or hide
    if (petProfileWindow.isOpen) petProfileWindow.style.display = 'block';
    else petProfileWindow.style.display = 'none';
}