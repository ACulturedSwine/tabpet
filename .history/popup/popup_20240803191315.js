import { randomFromArray } from '/utils/general-utils.js';
function setGreeting() {
    const greetings = [
        'Hai',
        'Bonjour',
        'Ciao',
        'Hola',
        '',
        'こんにちは'
    ]
    return randomFromArray()
}