class Interactable {
    constructor(type, src, position) {
        this.type = type;
        this.el = this.#createImgEl(src);
        this.#position(position.x, position.y);

        
    }

    /* Public functions */



    /* Private functions */

    #createImgEl(src) {
        const el = document.createElement('img');
        el.src = src;
        el.style.position = 'absolute';
        el.style.width = '200px';

        return el;
    }

    #position(x, y) {
        this.el.style.transform = `translate(${x}px, ${y*-1}px)`;
    }

    #move(xDis, yDis) {

    }
}

export { Interactable };