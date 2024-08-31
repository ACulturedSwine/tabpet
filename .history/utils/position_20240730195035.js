import { randomFromRange } from '/utils/general-utils.js';

function randomPosInsideEl(el) {
    if (!el instanceof HTMLElement) throw new Error('Element not defined', 'Element: ', el);

    const rect = el.getBoundingClientRect();
    if (!rect) throw new Error(`Element's bounding client rect is undefined`, 'Element: ', el, 'Rect: ', rect);
    console.log(rect);
    const x = randomFromRange(rect.left, rect.right);
    const y = randomFromRange(rect.bottom, rect.top);
    return {x: x, y: y};
}

export { randomPosInsideEl };