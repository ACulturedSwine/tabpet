function isColliding(a, b) { // Given two items a and b (can be either element or point), return information on if a and b are colliding and where b is in relation to a.
    
    const toLeft = 
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
        const rect = 
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