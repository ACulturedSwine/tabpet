import {  } from '/utils/general-utils';

function randomPosInsideEl(el) {
    const rect = el.getBoundingClientRect();
    if (!rect) throw new Error(`Element's bounding client rect is undefined`, 'Element: ', el, 'Rect: ', rect);
    let x = 
}

export { randomPosInsideEl };