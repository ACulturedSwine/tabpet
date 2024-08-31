function sendEvent(type, detail = {}, el = document) {
    if (!type) return;

    const event = new CustomEvent(type, {
        bubbles: true,
        cancelable: true,
        detail: detail
    })

    return el.dispatchEvent(event);
}

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

function getCreatedElement(id) {
    return new Promise((resolve)=> {
        let el = document.getElementById(id);

        // Interact container already created, resolve
        if (el) resolve(el);

        // Wait for interact container to be created
        document.addEventListener(`${id}-created`, ()=> {
            resolve(document.getElementById(id));
        }, {once: true});
    })
}

function getInteractContainer() {
    return getCreatedElement('interact-container');
}

function wait(time, units) { // Wait for x units
    return new Promise((resolve)=> {
        setTimeout(resolve, timeInMs);
    })
}

export { sendEvent, removeElement, removeAllChildElements, removeAllEventListeners, getCreatedElement, getInteractContainer, wait };