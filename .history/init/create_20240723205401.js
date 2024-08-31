let pageNum = null; // pageNum starts at 1
let currentPageEl = null;


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

    // on new form or reload
    currentPageEl = document.getElementById('page-1');

    const queryString = window.location.search;
    if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        pageNum = urlParams.get('page');
        if (pageNum < 1 || pageNum > pages.length) { // invalid page number
            // hide initialized page
            currentPageEl.style.display = 'none';
            const errorEl = document.getElementById('error');

            // show error message
            errorEl.textContent = `Error, please re-complete the form. Click "Next" to proceed.`;
            errorEl.style.display = 'block';

            // reload form on next button


            return; // don't do anything later in handlePaging()
        }
        else {
            displayNewPage(pageNum);
        }
        
    }
    else { // newly entered form, add params to url
        pageNum = 1;
        updatePageURL(pages, 1);
    }

    // page changes

    window.addEventListener('popstate', (e)=> {
        let newPageNum = e.state.page;
        if (!newPageNum) {
            console.error('Page number not found in state');
        }
        pageNum = newPageNum;
        displayNewPage(pageNum);
    })

    handleNext(pages);
}

function handleNextError() {
    const nextButton = document.getElementById('next');
    const formURL = window.location.href.split('?')[0];
    nextButton.addEventListener('click', ()=> {
        window.location.href = '/init/create.html';
    })
}

function handleNext(pages) {
    const nextButton = document.getElementById('next');
    const warningContainer = document.querySelector('.warning');
    const warningText = document.querySelector('.warning-text');

    nextButton.addEventListener('click', ()=> {
        if (!currentPageEl) {
            currentPageEl = document.getElementById(`page-${pageNum}`);
        }

        const inputs = currentPageEl.querySelectorAll('input');
        if (!inputs) {
            console.error('No inputs!');
        }
        const res = anyInvalid(inputs);
        if (res) { // invalid input
            warningText.textContent = `Enter ${res.getAttribute('aria-label')}`;
            warningContainer.style.display = 'block';
            res.setAttribute('aria-invalid', true);
            res.select();
        }
        else { // move to next page
            console.log('moving on!');
            updatePageURL(pages, ++pageNum);
        }
    })
}

function updatePageURL(pages, pageNum) {
    const state = { page: pageNum };
    history.pushState(state, '', `?${pages[pageNum - 1]}&page=${pageNum}`); // since pageNum starts at 1
}

function displayNewPage(pageNum) {
    // hide last page
    const lastPageEl = currentPageEl;
    if (lastPageEl) { 
        lastPageEl.style.display = 'none';
    }
    else { // on reload, currentPageEl will initially be null
        const firstPageEl = document.getElementById('page-1');
        firstPageEl.style.display = 'none';
    }

    // show current page
    currentPageEl = document.getElementById(`page-${pageNum}`);
    
    if (!currentPageEl) {
        console.error(`Page element of ${pageNum} index not found!`);
        return;
    }

    currentPageEl.style.display = 'block';
    console.log(currentPageEl);
    console.log('set display!');
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