import { randomFromArray } from '/utils/general-utils.js';

console.log('doing something');
setGreeting();

function setGreeting() {
    const greetings = [
        'Hai',
        'How do you do',
        'Howdy',
        'Bonjour',
        'Ciao',
        'Hola',
        '你好',
        'こんにちは'
    ]
    const greetingEl = document.getElementById('greeting');
    greetingEl.textContent = 'hi';
}