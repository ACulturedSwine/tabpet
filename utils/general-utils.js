function randomFromRange(min, max) {
    if (min > max) {
        console.log('Min:', min, 'Max:', max);
        throw new Error(`Min cannot be greater than max!`);
    }
    return Math.random() * (max - min) + min;
}

function randomIntFromRange(min, max) {
    return Math.floor(randomFromRange(min, max));
}

function randomFromArray(array) {
    if (array.length === 0) return undefined;
    let randIndex = Math.floor(Math.random() * array.length);
    return array[randIndex];
}

function randomKeyFromObject(object) {
    const keys = Object.keys(object);
    return keys[ keys.length * Math.random() << 0]; // Produces random key of index between 0 and keys.length - 1. << 0 floors number to integer. 
}

function chance(probability) {
    return Math.random() < probability;
}

function minAsMillisec(min) { // Converts minutes to milliseconds
    return min * 60 * 1000;
}

function isObject(o) {
    return o !== null && typeof o === 'object' && Array.isArray(o) === false;
}

function isEmpty(obj) {
    for (let key in obj) { return false; }
    return true;
}

function isNonEmptyObject(o) {
    return isObject(o) && !isEmpty(o);
}

function capitalize(string) {
    return string[0].toUpperCase() + string.slice[1];
}

export {
    randomFromRange, randomIntFromRange, randomFromArray, randomKeyFromObject,
    chance, minAsMillisec, isNonEmptyObject, capitalize
};