import { createIcon } from '/utils/icon.js';

export default function setupPetProfile() {
    const petProfileWindow = createPetProfileWindow();

}

function createPetProfileIcon() {
    const icon = createIcon('🐹');
    icon.id = 'pet-profile-icon';
    icon.addEventListener('click', togglePetProfileWindow);
    return icon;
}

function createPetProfileWindow() {
    .style.display = 'none';
}

function togglePetProfileWindow() {
    const petProfileIcon = this;
    const petProfileWindow = document.getElementById('pet')
    const isOpen = 
}