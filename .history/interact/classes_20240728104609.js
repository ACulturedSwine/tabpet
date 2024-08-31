class Interactable {
    constructor(type, src, position, containerEl, width) {
        this.type = type;
        this.width = width || 100; // in px
        this.el = this.#createImgEl(src);
        this.containerEl = containerEl;

        if (position && position.x && position.y) {
            if (containerEl) this.#positionInBounds(position.x, position.y);
            else this.#position(position.x, position.y);
            
        }
    }

    /* Public functions */



    /* Private functions */

    #createImgEl(src) {
        const el = document.createElement('img');
        el.src = src;
        el.style.position = 'absolute';
        el.style.width = `${this.width}px`;

        el.classList.add('interactable');

        return el;
    }

    #position(x, y) {
        this.el.style.transform = `translate(${x}px, ${y}px)`;
    }

    #positionInBounds(x, y) {
        this.#position(x, y);
    }

    #move(xDis, yDis) {

    }
}

export { Interactable };