class Interactable {
    constructor(type, src) {
        this.type = type;
        this.el = this.#createImgEl(src);
        this.#position();
    }

    /* Public functions */



    /* Private functions */

    #createImgEl(src) {
        const el = document.createElement('img');
        el.src = src;
        el.style.position = 'absolute';

        return el;
    }

    #position(x, y) {
        this.el.style.transform = `translate(${x}px, ${y*-1}px)`;
    }

    #move(xDis, yDis) {

    }
}

export { Interactable };