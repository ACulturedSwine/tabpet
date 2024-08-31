import { createIcon } from '/utils/icon.js';
import { createIDElement, appendChildren } from '/utils/content-utils.js';
import { formatFullName, formatBirthday, formatAge } from '/utils/pet-info.js';

export function setupPetProfile(petInfo) {
    const petProfileIcon = createPetProfileIcon();
    const petProfileWindow = createPetProfileWindow(petInfo);
    petProfileIcon.appendChild(petProfileWindow);

    return { petProfileIcon, petProfileWindow };
}

function createPetProfileIcon() {
    const icon = createIcon('🐹');
    icon.id = 'pet-profile-icon';
    icon.addEventListener('click', togglePetProfileWindow);
    console.log(icon);
    return icon;
}

function createPetProfileWindow(petInfo) {
    // Create window
    const window = document.createElement('div');
    window.id = 'pet-profile-window';
    window.classList.add('ui');
    window.classList.add('ui-window');
    window.noPetFollow = true;
    window.isOpen = true;
    window.style.display = 'block';

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
    const primaryInfo = createIDElement('div', 'pet-profile-primary', `${formatAge(petInfo)} • ${petInfo.gender} • ${} `);

    /*
    const age = createIDElement('div', 'pet-profile-age', formatAge(petInfo));
    const gender = createIDElement('div', 'pet-profile-gender', petInfo.gender);
    const subtype = createIDElement('div', 'pet-profile-subtype', petInfo.subtype);

    appendChildren(primaryInfo, [age, gender, subtype]);
    */

    // Secondary information
    const secondaryInfo = createIDElement('div', 'pet-profile-secondary');
    const birthday = createIDElement('div', 'pet-profile-birthday', `Born on ${formatBirthday(petInfo)}`);
    
    appendChildren(secondaryInfo, [birthday]);

    // Return to handle
    return { heading, primaryInfo, secondaryInfo };
}

function togglePetProfileWindow() {
    const petProfileWindow = document.getElementById('pet-profile-window');
    // Toggle isOpen value
    petProfileWindow.isOpen = !petProfileWindow.isOpen;

    // Display or hide
    if (petProfileWindow.isOpen) petProfileWindow.style.display = 'block';
    else petProfileWindow.style.display = 'none';
}