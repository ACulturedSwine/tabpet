function bite(numBites, canvas, ctx) {
    createBite(getBiteRadius(numBites), canvas, ctx);
}

function getBiteRadius(numBites) {
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

function createBite(radius, canvas, ctx) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
}

function canEat(startingPixels, canvas, ctx) {
    const pixelsLeft = countPixelsLeft(canvas, ctx);
    const minPixelPercentage = 0.1;
    const canEat = pixelsLeft > startingPixels * minPixelPercentage;

    console.log('pixels left', pixelsLeft);

    if (!canEat && pixelsLeft > 0) clearCanvas(canvas, ctx); // Clear remaining canvas if there are still pixels
    return canEat;
}

function countPixelsLeft(canvas, ctx) {
    // Make sure the canvas has a width and height
    if (canvas.width === 0 || canvas.height === 0) {
        console.error("Canvas has no size.");
        return 0;
    }

    // Get the image data from the canvas
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const buffer = new Uint32Array(imgData.data.buffer);
    let c = 0;

    // Check if image data is correctly retrieved
    if (buffer.length === 0) {
        console.error("No image data retrieved.");
        return 0;
    }

    // Count non-transparent pixels
    for (let i = 0; i < buffer.length; i++) {
        const alpha = (buffer[i] >> 24) & 0xff; // Extract the alpha component
        if (alpha !== 0) c++;
    }

    return c;
}

function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export { canEat , bite, countPixelsLeft };