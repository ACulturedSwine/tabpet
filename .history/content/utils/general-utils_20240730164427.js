function randomFromRange(min, max) {
    return Math.random() * (min + max) + min;
}

function randomFromArray(array) {
    if (array.length === 0) return undefined;
    let randIndex = Math.random() * array.length;
    return array[randIndex];
}

function minAsMillisec(min) { // Converts minutes to millseconds
    return min * 
}

export { randomFromRange, randomFromArray , minAsMillisec };