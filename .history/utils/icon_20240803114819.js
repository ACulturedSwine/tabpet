function createIcon(content, type='emoji') {
    const icon = document.createElement('a');
    icon.classList.add('icon');
    const iconCircle = document.createElement('div');
    iconCircle.noPetFollow = true;
    iconCircle.classList.add('icon-circle');

    // Set content as emoji or image
    if (type === 'emoji') { // Content is emoji
        iconCircle.textContent = content;
    }
    else if (type === 'src') { // Content is image src
        const iconImageContainer = document.createElement('div');
        iconImageContainer.classList.add('icon-image-container');

        const iconImage = document.createElement('img');
        iconImage.classList.add('icon-image');
        iconImage.src = content;

        iconImageContainer.appendChild(iconImage);
        iconCircle.appendChild(iconImageContainer);
    }
    
    icon.appendChild(iconCircle);
    return icon;
}

function isIcon(el, id) { // Returns true if is icon class and parent element is id
    if (el.id === id) return el;
    else if (partOfIcon(el) && el.parentElement) return isIcon(el.parentElement, id);
    else return null;
}

function partOfIcon(el) { // Returns true if icon-circle, icon-image-container, icon-image
    return el.classList.contains('icon-circle') || el.classList.contains('icon-image-container') ||  el.classList.contains('icon-image');
}

export { createIcon, isIcon };