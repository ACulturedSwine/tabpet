handleRipple();
handleNext();

function handleRipple() {
    const rippleTime = 300;
    const buttons = document.querySelectorAll('button');
    buttons.forEach((b)=> {
        b.addEventListener('click', (e)=> {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            let x = e.clientX - e.currentTarget.offsetLeft;
            let y = e.clientY - e.currentTarget.offsetTop;
        })
    }) 
    btn.onclick = function (e) {
        
    
        // Position the span element
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
    
        // Remove span after 0.3s
        setTimeout(() => {
            ripple.remove();
        }, 300);
    
    };
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

