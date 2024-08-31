let pageNum = null;

handleRipple();
handlePaging();

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

function handlePaging() {
    const pages = [
        'name',
        'birthdaygender'
    ];

    // init page
    const queryString = window.location.search
    pageNum = 0;

    // page changes

    window.addEventListener('popstate', (e)=> {
        console.log(
            `location: ${document.location}, state: ${JSON.stringify(e.state)}`,
          );
    })

    handleNext(pages);
}

function handleNext(pages) {
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
            console.log('moving on!');
            const state = { page: ++pageNum };
            history.pushState(state, '', `?${pages[pageNum]}-page=${pageNum}`);
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