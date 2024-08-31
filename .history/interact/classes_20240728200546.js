class Interactable {
    constructor(type, src, position, containerEl, size) {
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

        if (position && position.x && position.y) {
            this.#initPos(position.x, position.y);
            this.el.style.visibility = 'visible';
        }

        if (this.initType) this.initType(); // Initialize variables specific to type if any 
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
        this.startingPixels = this.#countPixelsLeft(this.canvas, this.ctx); // Non-transparent pixels
    }

    eat() { // Creates bite and returns true if can eat, returns false if can't
        if (this.type !== 'food') return;
        
        const canEat = this.#canEat(this.startingPixels, this.canvas, this.ctx);
        if (canEat) {
            const rad = this.#createBiteRadius(this.numBites);
            this.#createBite(rad, this.canvas, this.ctx);
            this.numBites++;
        }
        else {
            return false;
        }
    }

    #createBiteRadius(numBites) {
        const startMinRad = 5;
        const startMaxRad = 10;
        const incrementEveryNBites = 3;
        const incrementBy = 10; // How much to increment every n bites
        let totalIncrement = 0;

        if (numBites % incrementEveryNBites == 0) totalIncrement = numBites / incrementEveryNBites * incrementBy;
        const minRad = startMinRad + totalIncrement;
        const maxRad = startMaxRad + totalIncrement;

        return Math.random() * (minRad + maxRad) + minRad; // Radius between minRad and maxRad
    }

    #createBite(radius, canvas, ctx) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
    }

    #canEat(startingPixels, canvas, ctx) {
        const pixelsLeft = this.#countPixelsLeft(canvas, ctx);
        const minPixelPercentage = 0.1;
        const canEat = pixelsLeft > startingPixels * minPixelPercentage;
        
        console.log('pixels left', pixelsLeft);

        if (!canEat && pixelsLeft > 0) this.#clearCanvas(canvas, ctx); // Clear remaining canvas if there are still pixels
        return canEat;
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