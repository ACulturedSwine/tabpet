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

function randomKeyFromObject() {
    var randomProperty = function (obj) {
        var keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() << 0]];
    };
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

export { randomFromRange, randomFromArray , minAsMillisec, isNonEmptyObject };