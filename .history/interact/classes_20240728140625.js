class Interactable {
    constructor(type, src, position, containerEl) {
        this.type = type;
        this.containerEl = containerEl;

        this.initEl(src, position);
    }

    initEl(src, position) { /* Initialize this.el. Public so function can be overwritten in subclasses of Interactable */
        this.el = this.#createImgEl(src);

        // Add to container
        if (this.containerEl) this.containerEl.appendChild(this.el); 
        else document.body.appendChild(this.el);

        if (position && position.x && position.y) {
            this.#initPositionCentered(position.x, position.y);
            this.el.style.visibility = 'visible';
        }
    }

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

    #position(x, y) { // x increases from left to right, y increases from top to bottom
        console.log('position at', x, y);
        this.el.style.transform = `translate(${x}px, ${y}px)`;
    }

    #initPositionCentered(x, y) {
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

    #positionCentered(x, y) { // Positions element centered at (x, y), adjust center if overlaps any borders of container
        console.log('original x', x, 'original y', y);

        // newX and newY is at top left corner of element
        const elDimensions = this.el.getBoundingClientRect(); // Client rect includes transformed dimensions, padding, border
        let newX = x - elDimensions.width/2; 
        let newY = y - elDimensions.height/2;

        // No container, position centered without recalculating
        if (!this.containerEl) { 
            this.#position(newX, newY);
            return;
        }

        // Else, calculate new position such that centered element doesn't overlap with container's borders
        const containerDimensions = this.containerEl.getBoundingClientRect();
        if (newX < 0) newX = 0; // Past left border
        else if (newX + elDimensions.width > containerDimensions.width) newX = containerDimensions.width - elDimensions.width; // Past right border
        if (newY < 0) newY = 0; // Past top border
        else if (newY + elDimensions.height > containerDimensions.height) newY = containerDimensions.height - elDimensions.height; // Past bottom border

        this.#position(newX, newY);
    }
}

class Food extends Interactable {
    constructor(type, src, position, containerEl) {
        super(type, src, position, containerEl);
    }

    bite() {

    }
}

export { Interactable, Food };