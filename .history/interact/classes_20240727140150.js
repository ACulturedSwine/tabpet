class Interactable {
    constructor(type, src) {
        this.el = document.createElement('img');
        this.el.src = src;
    }
}

export { Interactable };