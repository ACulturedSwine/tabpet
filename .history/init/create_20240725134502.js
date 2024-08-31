import { FormPage , FormManager } from '/init/classes.js';

let pageNum = null; // pageNum starts at 1
let currentPageEl = document.getElementById('page-1');
let savedInputs = {};
let lastInvalidInput = null;
const formManager = new FormManager();

formManager.handleValidatePattern();
handlePaging();

function getAllInputs() {
    return document.querySelectorAll('input');
}

function getPageQuestions(currentPageEl) {
    if (!currentPageEl) {
        throw new Error('No current page element initialized');
    }

    return currentPageEl.querySelectorAll('input, select');
}

function getInputs() {
    if (!currentPageEl) {
        console.error('current page element not initialized');
    }
    return currentPageEl.querySelectorAll('input, select');
}

function handlePaging() {
    const pages = [
        new FormPage('name', 'Create a Google', 'Enter a name'),
        new FormPage('birthday gender', 'Basic information', 'Enter a birthday and gender')
    ];

    // on new form or reload

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
            displayNewPage(pages, pageNum);
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
        displayNewPage(pages, pageNum);
    })

    handleNext(pages);
}

function setWarning(input, msg) {
    lastInvalidInput = input;

    const warningContainer = document.querySelector('.warning');
    const warningText = document.querySelector('.warning-text');
    warningText.textContent = msg;
    warningContainer.style.display = 'block';
    input.setAttribute('aria-invalid', true);
    input.focus();
}

function clearWarning(input) { // clear invalid input and its warning
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

    nextButton.addEventListener('click', ()=> {
        if (!currentPageEl) {
            currentPageEl = document.getElementById(`page-${pageNum}`);
        }

        const isPageComplete = formManager.checkCurrentQuestions(currentPageEl) === null; // Returns null if no empty required answers.

        if (isPageComplete) {
            console.log('moving on!');
            updatePageURL(pages, ++pageNum);
            displayNewPage(pages, pageNum);
        }
    })
}

function updatePageURL(pages, pageNum) {
    const state = { page: pageNum };
    const name = pages[pageNum - 1].name; // since pageNum starts at 1
    history.pushState(state, '', `?${name}&page=${pageNum}`);
}

function displayNewPage(pages, pageNum) {
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

    // update instructions
    const pageInfo = pages[pageNum - 1];
    document.getElementById('title').textContent = pageInfo.title;
    document.getElementById('desc').textContent = pageInfo.desc;

    // clear last invalid input since it may be on new page
    clearLastInvalidInput();

    // show current page
    currentPageEl = document.getElementById(`page-${pageNum}`);
    
    if (!currentPageEl) {
        console.error(`Page element of ${pageNum} index not found!`);
    }

    currentPageEl.style.display = 'block';

    // show content
    contentEl.style.display = 'block';
}

function loadSavedInputs() { /* This isn't needed since form saves and clears by session. (Either by reload or new URL) */
    if (Object.keys(savedInputs).length === 0) { // no saved inputs
        return;
    }
    if (!currentPageEl) {
        console.error('No current page element set');
    }
    const inputs = getInputs();
    inputs.forEach((input)=> {
        const label = input.getAttribute('aria-label');
        if (label in savedInputs) {
            input.value = savedInputs[label];
        }
    });
}

function saveInputsIfValid(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if (isBlank(inputs[i])) {
            return inputs[i];
        }
        else {
            savedInputs[inputs[i].getAttribute('aria-label')] = inputs[i].value.trim();
        }
    }
    return null;
}

function isBlank(input) {
    const ariaRequired = input.getAttribute('aria-required');
    if (!ariaRequired || ariaRequired === 'false') {
        return false;
    }
    else {
        return input.value.trim() === '';
    }
}

function clearLastInvalidInput() {
    if (lastInvalidInput) lastInvalidInput.setAttribute('aria-invalid', false);
    clearWarning();
}