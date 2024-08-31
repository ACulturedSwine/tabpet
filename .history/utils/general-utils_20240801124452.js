function randomFromRange(min, max) {
    if (min > max) {
        console.log('Min:', min, 'Max:', max);
        throw new Error(`Min cannot be greater than max!`);
    }
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

function isObject(o) {
    return o !== null && typeof o === 'object' && Array.isArray(o) === false;
}

function isEmpty(obj) { 
    for (var x in obj) { return false; }
    return true;
 }

function isNonemptyObject(o) {
    return isNonemptyObject(o) && 
}

export { randomFromRange, randomFromArray , minAsMillisec };