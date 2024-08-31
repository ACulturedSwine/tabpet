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
        el.style.height = 'auto';
        el.style.visibility = 'hidden';

        el.classList.add('interactable');

        return el;
    }

    #position(x, y) {
        console.log('position at', x, y);
        this.el.style.transform = `translate(${x}px, ${y}px)`;
    }

    #positionCentered(x, y) {
        // No container, position as centered
        if (!this.containerEl) { 
            this.#position(x, y);
            return;
        }

        // Else, calculate new position by considering element's dimensions
        const self = this;
        this.el.addEventListener('load', function() { // Auto dimensions rendered only when image is loaded
            const containerDimensions = self.containerEl.getBoundingClientRect(); // Client rect includes transformed dimensions, padding, border
            const elDimensions = self.el.getBoundingClientRect();
            console.log('container contains element', [...self.containerEl.children].includes(self.el));
            console.log('container width', containerDimensions.width, 'height', containerDimensions.height);
            console.log('el width', elDimensions.width, 'height', elDimensions.width);

            self.#position(x, y);
        })
    }

    #move(xDis, yDis) {

    }
}

export { Interactable };