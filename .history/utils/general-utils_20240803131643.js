function randomFromRange(min, max) {
    if (min > max) {
        console.log('Min:', min, 'Max:', max);
        throw new Error(`Min cannot be greater than max!`);
    }
    return Math.random() * max - (max - min);
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

function randomString(n=1) { // Generate random string of length n, comprised of alphanumeric and special characters https://www.asciitable.com/
    let string = '';
    for (let i = 0; i < n; i++) {
        let int = randomIntFromRange(32, 126);
        console.log(int);
        string += String.fromCharCode(int);
    }
    return string;
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

export { randomFromRange, randomIntFromRange, randomFromArray, randomKeyFromObject, randomString, minAsMillisec, isNonEmptyObject };