class InteractableManager {
    constructor() {

    }
}

class Interactable {
    constructor(type, src, position, containerEl) {
        this.type = type;
        this.containerEl = containerEl;

        if (type === 'food') this.createEl = this.#createFood;
        else this.createEl = this.#createImgEl;

        this.createEl(src);
        this.el.classList.add('interactable');

        if (position && position.x && position.y) {
            this.#initPos(position.x, position.y);
            this.el.style.visibility = 'visible';
        }
    }

    /* Food functions */ 

    #createFood(src) {
        console.log('creating food');

        const canvasEl = document.createElement('canvas');
        const ctx = canvasEl.getContext('2d');
        const img = new Image();
        img.src = src;

        img.addEventListener('load', ()=> {
            canvasEl.width = img.width;
            canvasEl.height = img.height;
            ctx.drawImage(img, 0, 0);
        });

        this.el = canvasEl;
        this.ctx = ctx;
        this.img = img;
    }

    bite() {
        const radius = 30;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.restore();
    }

    /* Private functions */

    #createImgEl(src) {
        const el = document.createElement('img');
        el.src = src;
        el.style.position = 'absolute';
        el.style.width = `100px`;
        el.style.height = 'auto';
        el.style.visibility = 'hidden';

        return el;
    }

    #position(x, y) { // x increases from left to right, y increases from top to bottom
        console.log('position at', x, y);
        this.el.style.transform = `translate(${x}px, ${y}px)`;
    }

    #initPos(x, y) {
        // Add to container
        if (this.containerEl) this.containerEl.appendChild(this.el); 
        else document.body.appendChild(this.el);

        // Position element
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

export { InteractableManager, Interactable };