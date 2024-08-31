function isColliding(a, b) { // Given two items a and b (can be either element or point), return information on if a and b are colliding and where b is in relation to a.
    const aInfo = getLeftRightTopBottom(a);
    const bInfo = getLeftRightTopBottom(a);
    if (!aInfo || !bInfo) throw new Error('a and/or b ')
    const toLeft = 
    pos.x < dims.left, pos.x > dims.right, pos.y > dims.top, pos.y < dims.bottom

    const yes = !(toLeft || !toRight || !above || !below);
    return {
        yes: yes,
        toLeft: toLeft,
        toRight: toRight,
        above: above,
        below: below
    };
}

function getLeftRightTopBottom(param) { // Param is either point or element
    if (isPt(param)) {
        return {left: param.x, right: param.x, top: param.y, bottom: param.y};
    }
    else if (isEl(param)) {
        const rect = param.getBoundingClientRect();
        return {left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom};
    }
    else {
        return null;
    }
}

function isPt(pt) {
    return pt.x && pt.y;
} 

function isEl(el) {
    return el instanceof HTMLElement;
}