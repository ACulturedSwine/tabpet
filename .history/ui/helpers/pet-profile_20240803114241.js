import { createIcon } from '/utils/icon.js';
import { createIDElement, appendChildren } from '/utils/content-utils.js';
import { getProfilePhotoSrc, formatFullName, formatBirthday, formatAge } from '/utils/pet-info.js';

export function setupPetProfile(petInfo) {
    const petProfileIcon = createPetProfileIcon(petInfo);
    const petProfileWindow = createPetProfileWindow(petInfo);
    petProfileIcon.appendChild(petProfileWindow);

    handleTogglePetProfileWindow();

    return { petProfileIcon, petProfileWindow };
}

function createPetProfileIcon(petInfo) {
    const icon = createIcon(getProfilePhotoSrc(petInfo), 'src');
    icon.id = 'pet-profile-icon';
    return icon;
}

function createPetProfileWindow(petInfo) {
    // Create window
    const window = document.createElement('div');
    window.id = 'pet-profile-window';
    window.classList.add('ui');
    window.classList.add('ui-window');
    window.noPetFollow = true;
    window.isOpen = false;
    window.style.display = 'none';

    // Create information
    const { heading, primaryInfo, secondaryInfo } = createPetProfileInformation(petInfo);

    // Append information to window
    appendChildren(window, [heading, primaryInfo, secondaryInfo]);

    return window;
}

function createPetProfileInformation(petInfo) {
    // Heading
    const heading = createIDElement('div', 'pet-profile-heading', formatFullName(petInfo));

    // Primary information (in same line)
    const primaryInfo = createIDElement('div', 'pet-profile-primary', `${formatAge(petInfo)} • ${petInfo.gender} • ${petInfo.subtype}`);

    // Secondary information
    const secondaryInfo = createIDElement('div', 'pet-profile-secondary');
    const birthday = createIDElement('div', 'pet-profile-birthday', `Born ${formatBirthday(petInfo)}`);
    
    appendChildren(secondaryInfo, [birthday]);

    // Return to handle
    return { heading, primaryInfo, secondaryInfo };
}

function handleTogglePetProfileWindow() {
    document.addEventListener('click', (e)=> togglePetProfileWindow(e));
}

function togglePetProfileWindow(e) {
    const petProfileWindow = document.getElementById('pet-profile-window');
    const isOpen = petProfileWindow.isOpen;

    // Prevent opening window from clicking on elements other than icon
    const isIcon = e.target.id === 'pet-profile-icon' || e.target.parentElement && e.target.parentElement.id === 'pet-profile-icon';
    if (!isOpen && !isIcon) return;

    // Toggle isOpen value
    petProfileWindow.isOpen = !petProfileWindow.isOpen;
    if (petProfileWindow.isOpen) petProfileWindow.style.display = 'block';
    else petProfileWindow.style.display = 'none';
}