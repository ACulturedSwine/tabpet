class Interactable {
    constructor(type, src, position) {
        this.type = type;
        this.el = this.#createImgEl(src);

        if (position && position.x && position.y) {
            this.#position(position.x, position.y);
        }
    }

    /* Public functions */



    /* Private functions */

    #createImgEl(src) {
        const el = document.createElement('img');
        el.src = src;
        el.style.position = 'absolute';
        el.style.width = '100px';

        el.classList.add('.interactable-img');

        return el;
    }

    #position(x, y) {
        this.el.style.transform = `translate(${x}px, ${y}px)`;
    }

    #move(xDis, yDis) {

    }
}

export { Interactable };