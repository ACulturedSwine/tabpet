function isColliding(a, b) { // Given two items a and b (can be either element or point), return information on if a and b are colliding and where b is in relation to a.
    
    const yes = !(toLeft || !toRight || !above || !below);
    return {
        yes: yes,
        toLeft: toLeft,
        toRight: toRight,
        above: above,
        below: below
    };
}

function getLeftRightTopBottom() {
    
}

function isPt(pt) {
    return pt.x && pt.y;
} 

function isEl(el) {
    return el instanceof HTMLElement;
}