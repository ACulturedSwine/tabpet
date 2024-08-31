import { createIcon } from '/utils/icon.js';

let petProfileWindow = null;

export default function setupPetProfile() {
    petProfileWindow = createPetProfileWindow();

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
    
    const isOpen = 
}