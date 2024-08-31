class Interactable {
    constructor(type, src) {
        this.type = type;
        this.el = this.#createImgEl(src);
    }

    /* Public functions */



    /* Private functions */

    #createImgEl(src) {
        const el = document.createElement('img');
        el.src = src;
        el.style.position = 'absolute';

        return el;
    }

    #position() {

    }

    #move() {

    }

    #getCursorPosition(e) {
        return {x: e.clientX, y: e.clientY};
    }
}

export { Interactable };