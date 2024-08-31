handleRipple();
handleNext();

function handleRipple() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((b)=> {
        b.addEventListener('click', (e)=> {
            
        })
    }) 
    btn.onclick = function (e) {
    
        // Create span element
        let ripple = document.createElement("span");
    
        // Add ripple class to span
        ripple.classList.add("ripple");
    
        // Add span to the button
        this.appendChild(ripple);
    
        // Get position of X
        let x = e.clientX - e.currentTarget.offsetLeft;
    
        // Get position of Y
        let y = e.clientY - e.currentTarget.offsetTop;
    
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

