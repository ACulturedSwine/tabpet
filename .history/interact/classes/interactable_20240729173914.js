import * as Food from '/interact/utils/food-utils.js';

class Interactable {
    constructor(type, src, position, containerEl, pasteID, size) {
        this.type = type;
        this.containerEl = containerEl;

        this.size = size || {width: 100};

        if (type === 'food') {
            this.createEl = this.#createFoodEl;
            this.initType = this.#initFood;
        }
        else {
            this.createEl = this.#createImgEl;
            this.initType = null;
        }

        this.el = this.createEl(src); // el is outermost element of interactable
        this.el.classList.add('interactable');
        this.el.type = type;
        if (size) this.#size(size.width, size.height); 

        // Initialize position
        if (position && position.x && position.y) {
            this.#initPos(position.x, position.y);
            this.el.style.visibility = 'visible';
        }

        // Initialize variables specific to type if any
        if (this.initType) this.initType();

        // Set pasteID
        this.pasteID = pasteID;
        this.el.pasteID = pasteID;
    }

    /* Food functions */ 

    #createFoodEl(src) {
        if (this.type !== 'food') return;

        const container = document.createElement('div');
        const canvasEl = document.createElement('canvas');
        canvasEl.classList.add('interactable-child');
        const ctx = canvasEl.getContext('2d', { willReadFrequently: true });
        const img = new Image();
        img.src = src;

        this.canvas = canvasEl;
        this.ctx = ctx;
        this.img = img;

        img.addEventListener('load', ()=> {
            this.imgLoaded = true;

            // Calculate width and height aspect ratios
            let wRatio = null,
                hRatio = null,
                w = img.width,
                h = img.height;
            if (this.size.width) wRatio = this.size.width / w;
            if (this.size.height) hRatio = this.size.height / h;

            if (!wRatio && !hRatio) wRatio = hRatio = 1; // Dimensions already adjusted 
            else if (!wRatio) wRatio = hRatio; // Adjust auto width
            else if (!hRatio) hRatio = wRatio; // Adjust auto height

            let newW = w * wRatio,
                newH = h * hRatio;

            canvasEl.width = newW;
            canvasEl.height = newH;
            ctx.drawImage(img, 0, 0, newW, newH); // draws image with top left corner coords (0, 0) and canvas <width x height>

            container.appendChild(canvasEl);
        });

        return container;
    }

    #initFood() {
        if (this.type !== 'food') return;

        this.numBites = 0;
        this.startingPixels = null; // # non-transparent pixels

        if (this.imgLoaded) {
            this.startingPixels = Food.countPixelsLeft(this.canvas, this.ctx); 
        }
        else { // Image not loaded, wait until image load to count non-transparent pixels (otherwise will return 0)
            this.img.addEventListener('load', ()=> {
                this.imgLoaded = true;
                this.startingPixels = Food.countPixelsLeft(this.canvas, this.ctx); 
            }, {once: true});
        }
    }

    eat() { // Creates bite. Returns true if finished, returns false if can eat more.
        if (this.type !== 'food' || !this.startingPixels) return;
        
        const canEat = Food.canEat(this.startingPixels, this.canvas, this.ctx);
        let finished = canEat;
        
        if (canEat) {
            Food.bite(this.numBites, this.canvas, this.ctx);
            finished = !Food.canEat(this.startingPixels, this.canvas, this.ctx); // After bite, check if canvas is approximately empty. If so, finished.
            this.numBites++;
        }

        return finished;
    }

    /* Private functions */

    #createImgEl(src) {
        const el = document.createElement('img');
        el.src = src;
        return el;
    }

    #size(width, height) {
        if (!width && !height) {
            console.error('No width and height defined\n', 'width:', width, 'height:', height);
            return;
        }
        else if (!this.el) {
            console.error('No element defined', this.el);
        } 

        this.el.style.width = width || 'auto';
        this.el.style.height = height || 'auto';
    }

    #position(x, y) { // x increases from left to right, y increases from top to bottom
        this.el.style.transform = `translate(${x}px, ${y}px)`;
    }

    #initPos(x, y) {
        // Add to container
        if (this.containerEl) this.containerEl.appendChild(this.el); 
        else document.body.appendChild(this.el);

        // Position element
        if (this.el.clientWidth || this.el.clientHeight === 0) { // Has auto dimension(s), need to wait until image is loaded to render
            const self = this;
            const img = this.img || this.el;
            img.addEventListener('load', function() {
                self.#positionCentered(x, y);
            })
        }
        else {
            this.#positionCentered(x, y);
        }
    }

    #positionCentered(x, y) { // Positions element centered at (x, y), adjust center if overlaps any borders of container
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

export { Interactable };