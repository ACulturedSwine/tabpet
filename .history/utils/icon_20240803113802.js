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

export { createIcon };