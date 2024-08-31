function createIcon(emoji) {
    const icon = document.createElement('a');
    icon.classList.add('icon');
    const iconCircle = document.createElement('div');
    iconCircle.classList.add('icon-circle');
    iconCircle.classList.add('icon-circle');
    iconCircle.textContent = emoji;
    icon.appendChild(iconCircle);
    return icon;
}

export { createIcon };