function randomFromRange(min, max) {
    return Math.random() * (min + max) + min;
}

function randomFromArray(array) {
    if (array.length === 0) return undefined;
    let randIndex = Math.random
}

export { randomFromRange, randomFromArray };