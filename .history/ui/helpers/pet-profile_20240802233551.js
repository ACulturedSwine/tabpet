import { createIcon } from '/utils/icon.js';

export default function setupPetProfile() {
    const petProfileIcon = createPetProfileIcon();
    const petProfileWindow = createPetProfileWindow();
    petProfileIcon.appendChild(petProfileWindow);
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
    window.isOpen = false;
    window.style.display = 'none';
}

function togglePetProfileWindow() {
    const petProfileWindow = document.getElementById('pet-profile-window');
    if (petProfileWindow.isOpen) {

    }
    else {
        
    }
}