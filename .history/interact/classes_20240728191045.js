class Interactable {
    constructor(type, src, position, containerEl, size) {
        this.type = type;
        this.containerEl = containerEl;

        this.size = size || {width: 100};

        if (type === 'food') {
            this.createEl = this.#createFoodEl;
            this.#initFoodVars();
        }
        else this.createEl = this.#createImgEl;

        this.el = this.createEl(src); // el is outermost element of interactable
        this.el.classList.add('interactable');
        this.el.type = type;
        if (size) this.#size(size.width, size.height); 

        if (position && position.x && position.y) {
            this.#initPos(position.x, position.y);
            this.el.style.visibility = 'visible';
        }
    }

    /* Food functions */ 

    #createFoodEl(src) {
        if (this.type !== 'food') return;

        const canvasEl = document.createElement('canvas');
        const ctx = canvasEl.getContext('2d', { willReadFrequently: true });
        const img = new Image();
        img.src = src;

        this.canvas = canvasEl;
        this.ctx = ctx;
        this.img = img;

        img.addEventListener('load', ()=> {
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
        });

        return canvasEl;
    }

    #initFoodVars() {
        if (this.type !== 'food') return;

        this.numBites = 0;
    }

    eat() { // Creates bite and returns true if can eat, returns false if can't
        if (this.type !== 'food') return;

        console.log('eat');

        const canEat = this.#isEaten();
        if (canEat) {
            this.#createBite();
            this.numBites++;
        }
        else {
            return false;
        }
    }

    #createBite() {
        if (this.type !== 'food') return; 

        const minRad = 5;
        const maxRad = 10;

        const radius = Math.random() * (minRad + maxRad) + minRad; // Radius between minRad and maxRad
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * this.canvas.height;

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.restore();
    }

    #isEaten() {
        if (this.type !== 'food') return;
        const pixelsLeft = this.#countPixelsLeft(this.canvas, this.ctx);
        const minPixels = 100;
        const isApproximatelyEmpty = pixelsLeft < minPixels;
        if (isApproximatelyEmpty && pixelsLeft > 0) this.#clearCanvas(this.canvas, this.ctx); // Clear remaining canvas if there are still pixels
    }

    #countPixelsLeft(canvas, ctx) { // Counts non-transparent pixels
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const buffer = new Uint32Array(imgData.data.buffer); // Use 32-bit buffer
        let c = 0;
    
        for(let i = 0; i < buffer.length; i++) {
            if (buffer[i] !== 0) c++;
        }
    
        return c;
    }

    #clearCanvas(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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

export { Interactable };