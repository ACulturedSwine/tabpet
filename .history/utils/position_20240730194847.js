import { randomFromRange } from '/utils/general-utils';

function randomPosInsideEl(el) {
    if (!el instanceof HTMLElement) throw new Error('Element must be defined', 'Element: ', el);

    const rect = el.getBoundingClientRect();
    if (!rect) throw new Error(`Element's bounding client rect is undefined`, 'Element: ', el, 'Rect: ', rect);
    const x = randomFromRange(this.left, this.right);
    const y = randomFromRange(this.bottom, this.top);
    return {x: x, y: y};
}

export { randomPosInsideEl };