function randomFromRange(min, max) {
    if (min > max) throw new Error(`Min cannot be greater than max!`, 'Min:', min, 'Max:', max);
    return Math.random() * (min + max) + min;
}

function randomFromArray(array) {
    if (array.length === 0) return undefined;
    let randIndex = Math.floor(Math.random() * array.length);
    return array[randIndex];
}

function minAsMillisec(min) { // Converts minutes to milliseconds
    return min * 60 * 1000;
}

export { randomFromRange, randomFromArray , minAsMillisec };