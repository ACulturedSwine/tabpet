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

function createIDElement(type, id, content) {
    const el = document.createElement(type);
    el.id = id;
    if (content) el.textContent = content;
    return el;
}

function appendChildren(parentEl, childEls) {
    for (let childEl of childEls) parentEl.appendChild(childEl);
}

function chainAppend(els) { // Given array of elements, append such that (n) element is parent of (n - 1) element
    // Outermost elements are last
    // Return outermost element
    if (!els || els.length == 0 || els.constructor !== Array) return null;

    const len = els.length;
    for (let i = 1; i < len; i++) els[i].appendChild(els[i - 1]);

    return els[len - 1];
}

function getCreatedElement(id) {
    return new Promise((resolve)=> {
        // Element already created, resolve
        let el = document.getElementById(id);
        if (el) resolve(el);

        // Wait for element to be created
        document.addEventListener(`${id}-created`, ()=> {
            resolve(document.getElementById(id));
        }, {once: true});
    })
}

function getInteractContainer() {
    return getCreatedElement('interact-container');
}

function isOverflowing(el) {
    return el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
}

function wait(time, units='milliseconds') { // Wait for x units
    return new Promise((resolve)=> {
        let timeInMilliseconds = time;
        if (units === 'seconds') timeInMilliseconds *= 1000;
        else if (units === 'minutes') timeInMilliseconds *= 60000;
        else if (units !== 'milliseconds') throw new Error(`Time unit ${units} not implemented`);
        setTimeout(resolve, timeInMilliseconds);
    })
}

function onMouseRelease(el, callbackDuring, callbackAfter) { // Performs callback if mouse is clicked and released on same element
    el.addEventListener('mousedown', ()=> {
        
        function handleMouseUp(e) {
            if (e.target === el) callbackAfter();
            document.removeEventListener('mouseup', handleMouseUp);
        }
        document.addEventListener('mouseup', handleMouseUp);
    });
}

export {
    sendEvent, removeElement, removeAllChildElements, removeAllEventListeners,
    createIDElement, appendChildren, chainAppend, getCreatedElement, getInteractContainer,
    onMouseRelease,
    isOverflowing, wait
};