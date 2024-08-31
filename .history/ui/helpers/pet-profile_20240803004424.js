import { createIcon } from '/utils/icon.js';
import { createIDElement, appendChildren } from '/utils/content-utils.js';
import { getPetInfo, formatFullName, formatBirthday, formatAge } from '/utils/pet-info.js';

export async function setupPetProfile() {
    const petProfileIcon = createPetProfileIcon();
    const petProfileWindow = await createPetProfileWindow();
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
    return new Promise(async (resolve)=> {
        // Create window
        const window = document.createElement('div');
        window.id = 'pet-profile-window';
        window.classList.add('ui');
        window.classList.add('ui-window');
        window.noPetFollow = true;
        window.isOpen = true;
        window.style.display = 'block';

        // Create information
        const { header, content } = createPetProfileInformation(petInfo);

        // Append information to window
        appendChildren(window, [header, content]);

        resolve(window);
    })
}

function createPetProfileInformation(petInfo) {
    // Create information header
    const header = createIDElement('div', 'pet-profile-header');

    const name = createIDElement('div', 'pet-profile-name', formatFullName(petInfo));
    const age = createIDElement('div', 'pet-profile-age', formatAge(petInfo));
    const gender = createIDElement('div', 'pet-profile-gender', petInfo.gender);

    header.appendChild(name);
    
    appendChildren(header, [name, age, gender]);

    // Create information content
    const content = createIDElement('div', 'pet-profile-content');
    const birthday = createIDElement('div', 'pet-profile-birthday', `Born on ${formatBirthday(petInfo)}`);
    const subtype = createIDElement('div', 'pet-profile-birthday', `Coloring is ${petInfo.subtype}`);
    appendChildren(content, [birthday, subtype]);

    // Return to handle
    return { header, content };
}

function togglePetProfileWindow() {
    const petProfileWindow = document.getElementById('pet-profile-window');
    // Toggle isOpen value
    petProfileWindow.isOpen = !petProfileWindow.isOpen;

    // Display or hide
    if (petProfileWindow.isOpen) petProfileWindow.style.display = 'block';
    else petProfileWindow.style.display = 'none';
}