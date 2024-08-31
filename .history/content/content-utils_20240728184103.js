function removeElement(element) {
    removeAllEventListeners(element);
  
    while (element.firstChild) {
        removeElement(element.firstChild);
        if (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
  
    element.parentNode.removeChild(element);
  }

function removeAllChildElements(element) {
    while (element.firstChild) {
        removeElement(element.firstChild);
        if (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}

function removeAllEventListeners(element) {
    const eventTypes = ['click', 'mouseover', 'mouseout', 'keydown', 'keyup', 'submit'];
    eventTypes.forEach(type => {
        element.removeEventListener(type, () => {});
    });
}

export { removeElement };