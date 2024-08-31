import { randomFromRange } from '/utils/general-utils.js';

function randomPosInsideEl(el) {
    if (el instanceof HTMLElement) throw new Error(`Element not defined.\nElement`);

    const rect = el.getBoundingClientRect();
    if (!rect) {
        console.log('Element: ', el, 'Rect: ', rect);
        throw new Error(`Element's bounding client rect is undefined`);
    }
    console.log(rect);
    const x = randomFromRange(rect.left, rect.right);
    const y = randomFromRange(rect.top, rect.bottom); // Since y increases from top to bottom, rect.bottom > rect.top
    return {x: x, y: y};
}

export { randomPosInsideEl };