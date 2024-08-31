class Interactable {
    constructor(type, src, position, containerEl) {
        this.type = type;
        this.el = this.#createImgEl(src);
        this.containerEl = containerEl;

        // Add to container
        if (this.containerEl) this.containerEl.appendChild(this.el); 
        else document.body.appendChild(this.el);

        if (position && position.x && position.y) {
            this.#positionCenteredAfterLoad(position.x, position.y);
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

    #positionCenteredAfterLoad(x, y) {
        if (this.el.clientWidth || this.el.clientHeight === 0) { // Has auto dimension(s), need to wait until image is loaded to render
            const self = this;
            this.el.addEventListener('load', function() {
                self.#positionCentered(x, y);
            })
        }
        else {
            this.#positionCentered(x, y);
        }
    }

    #positionCentered(x, y) {
        const elDimensions = self.el.getBoundingClientRect(); // Client rect includes transformed dimensions, padding, border
        console.log('container contains element', [...self.containerEl.children].includes(self.el));
        console.log('container width', containerDimensions.width, 'height', containerDimensions.height);
        console.log('el width', elDimensions.width, 'height', elDimensions.width);

        let newX = 
        let newY = 

        // No container, position centered without recalculating
        if (!this.containerEl) { 
            this.#position(newX, newY);
            return;
        }

        // Else, calculate new position by considering element's dimensions
            const containerDimensions = self.containerEl.getBoundingClientRect();
            self.#position(x, y);
    }

    #move(xDis, yDis) {

    }
}

export { Interactable };