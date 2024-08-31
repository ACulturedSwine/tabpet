handleRipple();
handleNext();

function handleRipple() {
    const rippleTime = 300;
    const buttons = document.querySelectorAll('button');
    buttons.forEach((b)=> {
        b.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            console.log(this);
        })
    })
}

function handleNext() {
    const nextButton = document.getElementById('next');
    nextButton.addEventListener('click', ()=> {
        checkValidInputs();
    })

    function checkValidInputs() {
        const inputs = document.getElementById('input-div').querySelectorAll('input');
        console.log(inputs);
    }
}

