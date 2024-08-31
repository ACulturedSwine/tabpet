function randomPosInsideEl(el) {
    const rect = el.getBoundingClientRect();
    if (!rect) throw new Error(`Element's bounding client rect is undefined`, 'el: ', el, 'rect: ', rect);

}

export { randomPosInsideEl };