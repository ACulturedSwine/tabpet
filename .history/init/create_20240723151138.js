handleRipple();
handleNext();

function handleRipple() {
    const rippleTime = 200;
    const buttons = document.querySelectorAll('button');
    buttons.forEach((b)=> {
        b.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            let x = e.clientX - e.currentTarget.offsetLeft;
            let y = e.clientY - e.currentTarget.offsetTop;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            setTimeout(() => {
                ripple.remove();
            }, rippleTime);
        })
    })
}

function handleNext() {
    const nextButton = document.getElementById('next');
    nextButton.addEventListener('click', ()=> {
        anyInvalid
    })

    function anyInvalid() {
        const inputs = document.getElementById('input-div').querySelectorAll('input');
        inputs.forEach((i)=> {
            if (!isValidInput(input)) {
                return i.getAttribute('aria-label');
            }
        })
        return true;
    }
}

function isValidInput(input) {
    return input.value.trim() !== '';
}
