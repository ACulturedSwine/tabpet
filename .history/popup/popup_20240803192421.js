import { randomFromArray } from '/utils/general-utils.js';

setGreeting();

function setGreeting() {
    const greetings = [
        'Hai',
        'How do you do',
        'Howdy',
        'Bonjour',
        'Ciao',
        'Hola',
        '*Gerbil noises*',
        '你好',
        'こんにちは'
    ]
    const greetingEl = document.getElementById('greeting');
    greetingEl.textContent = randomFromArray(greetings);
}