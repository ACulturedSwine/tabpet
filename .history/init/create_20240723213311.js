let pageNum = null; // pageNum starts at 1
let currentPageEl = null;
let savedInputs = {};

handlePaging();

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
            // hide initialized page and description
            currentPageEl.style.display = 'none';
            const errorEl = document.getElementById('error');
            const descEl = document.getElementById('desc');
            descEl.style.display = 'none';

            // show error message
            errorEl.textContent = `Error, please re-complete the form. Click "Next" to proceed.`;
            errorEl.style.display = 'block';

            // reload form on clicking next button
            handleNextError();

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

        clearWarning();
        displayNewPage(pageNum);
    })

    handleNext(pages);
}

function clearWarning() {
    const warningContainer = document.querySelector('.warning');
    const warningText = document.querySelector('.warning-text');
    warningText.textContent = '';
    warningContainer.style.display = 'none';
}

function handleNextError() {
    const nextButton = document.getElementById('next');
    const formURL = window.location.href.split('?')[0]; // form url without params
    nextButton.addEventListener('click', ()=> {
        window.location.href = formURL;
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
        const res = saveInputsIfValid(inputs);
        if (res) { // invalid input
            warningText.textContent = `Enter ${res.getAttribute('aria-label')}`;
            warningContainer.style.display = 'block';
            res.setAttribute('aria-invalid', true);
            res.select();
        }
        else { // move to next page
            console.log('moving on!');
            updatePageURL(pages, ++pageNum);
            displayNewPage(pageNum);
        }
    })
}

function updatePageURL(pages, pageNum) {
    const state = { page: pageNum };
    history.pushState(state, '', `?${pages[pageNum - 1]}&page=${pageNum}`); // since pageNum starts at 1
}

function displayNewPage(pageNum) {
    // hide content until done loading
    const contentEl = document.getElementById('content');
    contentEl.style.display = 'none';

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
    }

    currentPageEl.style.display = 'block';

    // show content
    contentEl.style.display = 'block';
}

function loadSavedInputs() {
    if (Object.keys(savedInputs).length === 0) { // no saved inputs
        return;
    }
    if (!currentPageEl) {
        console.error('No current page element set');
    }
    const inputs = currentPageEl.querySelectorAll('input');
    inputs.forEach((input)=> {
        const label = input.getAttribute('aria-label');
        if (label in savedInputs) {
            input.value = savedInputs[label];
        }
    });
}

function saveInputsIfValid(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if (isInvalid(inputs[i])) {
            return inputs[i];
        }
        else {
            savedInputs[inputs[i].getAttribute('aria-label')] = inputs[i].value.trim();
        }
    }
    return null;
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