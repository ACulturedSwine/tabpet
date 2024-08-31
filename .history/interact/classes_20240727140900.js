class Interactable {
    constructor(type, src) {
        this.type = type;
        this.el = document.createElement('img');
        this.el.src = src;
    }

    /* Public functions */



    /* Private functions */

    #createImgEl(src, location) {
        const el = document.createElement('img');
        el.src = src;
        el.style.position = 'absolute';

        return el;
    }

    #getCursorPosition(e) {
        return {x: e.clientX, y: e.clientY};
    }
}

export { Interactable };