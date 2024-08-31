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
    const pages = {

    };

    const nextButton = document.getElementById('next');
    const warningContainer = document.querySelector('.warning');
    const warningText = document.querySelector('.warning-text');
    
    nextButton.addEventListener('click', ()=> {
        const inputs = document.getElementById('input-div').querySelectorAll('input');
        const res = anyInvalid(inputs);
        if (res) { // invalid input
            warningText.textContent = `Enter ${res.getAttribute('aria-label')}`;
            warningContainer.style.display = 'block';
            res.setAttribute('aria-invalid', true);
            res.select();
        }
        else { // move to next page
            const state = { page_id: 1, user_id: 5 };
            const url = ".p2";
            history.pushState(state, "", url);
        }
    })
}

function anyInvalid(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if (isInvalid(inputs[i])) {
            return inputs[i];
        }
    }
    return false;
}

function isInvalid(input) {
    const ariaRequired = input.getAttribute('aria-required');
    if (!ariaRequired || ariaRequired === 'false') {
        return false;
    }
    else {
        return input.value.trim() === '';
    }
}