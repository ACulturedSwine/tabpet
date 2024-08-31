import { createIcon } from '/utils/icon.js';

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
    const window = document.createElement('div');
    window.id = 'pet-profile-window';
    window.classList.add('ui');
    window.classList.add('ui-window');
    window.noPetFollow = true;
    window.isOpen = true;
    window.style.display = 'block';
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