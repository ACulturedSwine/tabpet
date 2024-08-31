import { createIcon } from '/utils/icon.js';
import { appendChildren } from '/utils/content-utils.js';
import { getPetInfo, formatFullName, formatBirthday, getAge } from '/utils/pet-info.js';

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

function createPetProfileWindow() {
    // Create window
    const window = document.createElement('div');
    window.id = 'pet-profile-window';
    window.classList.add('ui');
    window.classList.add('ui-window');
    window.noPetFollow = true;
    window.isOpen = true;
    window.style.display = 'block';

    // Load information
    const petInfo = await getPetInfo();
    const name = document.createElement('div');
    name.id = 'pet-profile-name';
    name.textContent = formatFullName(petInfo);

    const basicInfo = document.createElement();
    const age = document.createElement('div');

    const birthday = document.createElement('div');
    birthday.id = 'pet-profile-birthday';
    birthday.textContent = `Born on ${formatBirthday()}`;

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