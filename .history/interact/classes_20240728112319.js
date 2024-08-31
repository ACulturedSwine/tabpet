class Interactable {
    constructor(type, src, position, containerEl) {
        this.type = type;
        this.el = this.#createImgEl(src);
        this.containerEl = containerEl;

        // Add to container
        if (this.containerEl) this.containerEl.appendChild(this.el); 
        else document.body.appendChild(this.el);

        if (position && position.x && position.y) {
            if (containerEl) this.#positionInBounds(position.x, position.y);
            else this.#position(position.x, position.y);
            
            this.el.style.visibility = 'visible';
        }
    }

    /* Public functions */



    /* Private functions */

    #createImgEl(src) {
        const el = document.createElement('img');
        el.src = src;
        el.style.position = 'absolute';
        el.style.width = `100px`;
        el.style.visibility = 'hidden';

        el.classList.add('interactable');

        return el;
    }

    #position(x, y) {
        this.el.style.transform = `translate(${x}px, ${y}px)`;
    }

    #positionInBounds(x, y) {
        if (!this.containerEl) this.#position(x, y); // No container, position as normal

        const containerDimensions = this.containerEl.getBoundingClientRect();
        console.log('container width', containerDimensions.width, 'height', containerDimensions.height);
        console.log('el width', this.el.offsetWidth, 'height', this.el.offsetHeight);

        this.#position(x, y);
    }

    #move(xDis, yDis) {

    }
}

export { Interactable };