import { randomFromArray } from '/utils/general-utils.js';
function setGreeting() {
    const greetings = [
        'Hai',
        'Bonjour',
        'Ciao',
        'Hola',
        '你好',
        'こんにちは'
    ]
    return randomFromArray()
}