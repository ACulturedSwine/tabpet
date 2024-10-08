/*

    Script for managing form. Notable behaviors:
    - On reload, form restarts.
    - Can't change form params, as it will force reload and restart form.

*/

import { FormPage , FormManager } from '/init/classes.js';
import { handleImgPaste } from '/utils/img-utils.js';
import { samplePetInfo, formatFullName, formatBirthday, getProfilePhotoSrc, getSpriteSrc } from '/utils/pet-info.js';
import { getURLParams } from '/utils/page.js';
import { getPetInfo } from '/utils/pet-info.js';

let pageNum = 1; // pageNum starts at 1
let currentPageEl = document.getElementById('page-1');

let savedInputs = {};
const formManager = new FormManager();
const testingPage = false;
const testingSample = false;
const isLocalHost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

formManager.handleValidatePattern();
handlePaging();

function getInputs() {
    if (!currentPageEl) {
        console.error('current page element not initialized');
    }
    return currentPageEl.querySelectorAll('input, select');
}

function restartFormOnReload() {
    const urlWithoutParams = window.location.origin + window.location.pathname;
    history.replaceState(createState(1), '', urlWithoutParams);
}

async function handlePaging() {
    if (!isLocalHost) await redirectIfPetInfo(); // Redirect to new tab if updated pet info

    const pages = [
        new FormPage('color', 'Create a Gerbil', 'Choose a color'),
        new FormPage('name', 'Create a Gerbil', 'Enter a name'),
        new FormPage('birthdaygender', 'Basic information', 'Enter a birthday and gender'),
        new FormPage('profilephoto', 'Profile photo', 'Choose a photo or upload your own by pasting a URL'),
        new FormPage('done', 'Done', 'If you are satisfied with your gerbil, click Next.\n\nOtherwise, go back to change your answers.') // Last page has no title or description
    ];

    if (testingPage) {
        loadPage(pages);
    }
    else {
        restartFormOnReload();
    }

    handleSubtypeSelect();
    handlePhotoUpload();
    formManager.handleSaveInputs(currentPageEl); // Once page is loaded, save inputs if change

    // Page changes

    window.addEventListener('popstate', (e)=> {
        if (!e.state) {
            throw new Error('State not found');
        }

        // Set new page number
        let newPageNum = e.state.page;
        if (!newPageNum) {
            throw new Error('Page number not found in state');
        }
        pageNum = newPageNum;

        // Clear form, display new page
        formManager.clear();
        displayNewPage(pages, pageNum);
    })

    handleNext(pages);
}

function loadPage(pages) {
    const urlParams = getURLParams();

    if (urlParams) {
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
    else { // Newly entered form with no params, add params to url
        pageNum = 1;
        updatePageURL(pages, 1);
    }
}

function handleNextError() {
    const nextButton = document.getElementById('next');
    const formURL = window.location.href.split('?')[0]; // form url without params
    nextButton.addEventListener('click', ()=> {
        window.location.href = formURL;
    })
}

function handleSubtypeSelect() {
    const subtypeSelect = document.getElementById('subtype');
    const subtypePhotoEl = document.getElementById('subtype-photo');
    subtypeSelect.addEventListener('input', function() {
        subtypePhotoEl.src = getSpriteSrc(formManager.savedInputs.type, this.value, 'side', 'extension'); // Get side photo of selected subtype
    })
}

function handlePhotoUpload() {
    const photoContainer = document.getElementById('input-photo-container');
    const photoEl = document.getElementById('input-photo');
    const photoUpload = document.getElementById('photo-upload');
    const selectPhoto = document.getElementById('select-photo');
    let lastSelectValue = '0';
    let processingPhoto = false; // Ensures reverting to original doesn't happen before file is processed in photoUpload
    const preventFileUpload = true; // Enabled because currently base64 files are too chonky to be stored in chrome.storage.sync :(

    selectPhoto.addEventListener('input', function() {
        if (this.value === 'Custom' && !preventFileUpload) {
            photoUpload.click();
        }
        else {
            photoEl.src = `/assets/profile-photos/${this.value.toLowerCase()}.png`;
            lastSelectValue = this.value;
        }
    })

    let isFileDialogOpen = false;

    photoContainer.addEventListener('click', ()=> { // Click on photo container to upload custom photo
        if (preventFileUpload) return;
        photoUpload.click();
    });

    photoContainer.addEventListener('dragover', (e)=> { // Drag to photo container to  custom photo
        if (preventFileUpload) return; 
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    photoContainer.addEventListener('drop', (e)=> { // Drop to photo container to upload custom photo
        if (preventFileUpload) return;
        e.stopPropagation();
        e.preventDefault();
        photoUpload.files = e.dataTransfer.files;
        setCustomPhoto(photoUpload.files[0]);
    });

    document.addEventListener('paste', (e) => handleImgPaste(e, {callback: setCustomPhoto }));

    photoUpload.addEventListener('click', ()=> {
        if (preventFileUpload) return;
        isFileDialogOpen = true;
    })

    photoUpload.addEventListener('change', (e)=> {
        if (preventFileUpload) return;
        const files = e.target.files;
        if (files && files[0]) {
            setCustomPhoto(files[0]);
        }
    })

    photoUpload.addEventListener('blur', ()=> {
        if (preventFileUpload) return;
        console.log('blur');
        isFileDialogOpen = true; // If file upload loses focus, file dialog may still be open
    });

    if (preventFileUpload) {
        window.addEventListener('focus', ()=> {
            if (isFileDialogOpen && !processingPhoto) { // File dialog is closed AND not processing file
                isFileDialogOpen = false;
                const customPhotos = photoUpload.files;
                console.log(customPhotos);
                if (customPhotos[0]) { // Change to previous custom photo if exists
                    setCustomPhoto(customPhotos[0]);
                }
                else { // Else, revert photo back to last selected value
                    selectPhoto.value = lastSelectValue; 
                }
            }
        })
    }

    function setCustomPhoto(photo) {
        processingPhoto = true;

        // Set photo src
        if (photo instanceof File && !preventFileUpload) {  // File
            photoEl.src = window.URL.createObjectURL(photo);
            formManager.saveInput(photoUpload);
        }
        else if (typeof photo === 'string') { // URL
            photoEl.src = photo;
            formManager.saveInputManual('photoUpload', photo);
        }
        else throw new Error('Invalid photo, not of type file or string: ', photo);

        // Set values and save
        selectPhoto.value = lastSelectValue = 'Custom';
        formManager.saveInput(selectPhoto);

        processingPhoto = false;
    }
}

function handleNext(pages) {
    const nextButton = document.getElementById('next');

    nextButton.addEventListener('click', async ()=> {
        if (!currentPageEl) {
            currentPageEl = document.getElementById(`page-${pageNum}`);
        }

        const isPageComplete = formManager.checkCurrentQuestions(currentPageEl) === null; // Returns null if no empty required answers.

        if (isPageComplete) {
            pageNum++;
            if (pageNum >= 1 && pageNum <= pages.length) { // Next form page
                if (!document.getElementById(`page-${pageNum}`)) { // Page doesn't exist, throw error
                    throw new Error(`Page element of number ${pageNum} doesn't exist`);
                }
                console.log('Moving on!');
                console.log('Saved inputs on next:'); // This ONLY saves inputs on Next button.
                console.log(formManager.savedInputs);

                updatePageURL(pages, pageNum);
                displayNewPage(pages, pageNum);
                formManager.handleSaveInputs(currentPageEl);
            }
            else {
                saveAndRedirect();
            }
        }
    })
}

function updatePageURL(pages, pageNum) {
    const state = createState(pageNum);
    const name = pages[pageNum - 1].name; // Since pageNum starts at 1
    history.pushState(state, '', `?${name}&page=${pageNum}`);
}

function createState(pageNum) {
    return { page: pageNum };
}

function displayNewPage(pages, pageNum) {
    // Hide content until done loading
    const contentEl = document.getElementById('content');
    contentEl.style.display = 'none';

    // Hide last page
    const lastPageEl = currentPageEl;
    if (lastPageEl) { 
        lastPageEl.style.display = 'none';
    }
    else { // On reload, currentPageEl will initially be null
        const firstPageEl = document.getElementById('page-1');
        firstPageEl.style.display = 'none';
    }

    // Update instructions
    const pageInfo = pages[pageNum - 1];
    document.getElementById('title').textContent = pageInfo.title;

    const descEl = document.getElementById('desc');
    descEl.textContent = pageInfo.desc;

    // If last page, show saved inputs
    if (pageNum == pages.length) showSavedInputs(); // Page number may be string or number, so use == instead of ===

    // Update current page element

    currentPageEl = document.getElementById(`page-${pageNum}`);
    
    if (!currentPageEl) {
        console.error(`Page element of ${pageNum} index not found!`);
    }

    // Show current page and content

    currentPageEl.style.display = 'block';
    contentEl.style.display = 'block';
}

function showSavedInputs() { // Shows saved inputs in session.
    let savedInputs = null;

    if (testingSample) savedInputs = formManager.savedInputs = samplePetInfo;
    else if (formManager.savedInputs) savedInputs = formManager.savedInputs;
    else throw new Error('Saved inputs not found');

    document.getElementById('chosen-photo').src = getProfilePhotoSrc(savedInputs, isLocalHost);
    document.getElementById('chosen-name').textContent = `${formatFullName(savedInputs)}`;
    document.getElementById('chosen-birthday').textContent = `Born on ${formatBirthday(savedInputs)}`;
    document.getElementById('chosen-gender').textContent = savedInputs.gender;
    document.getElementById('chosen-color').textContent = savedInputs.subtype;
}

async function saveAndRedirect() { // Save inputs to chrome storage, redirect to new tab
    if (!formManager.savedInputs) throw new Error('Saved inputs are not defined');
    if (isLocalHost) return;

    const petInfo = formManager.savedInputs;
    chrome.storage.sync.set( { petInfo } )
    .catch((e)=> {
        throw new Error(e);
    })
    .then(async ()=> {
        let savedCorrectly = await redirectIfPetInfo();
        if (!savedCorrectly) throw new Error('Pet info not saved correctly');
    })
}

function redirectIfPetInfo() { // Redirect to new tab if stored pet info correctly
    return new Promise(async (resolve)=> {
        let storedPetInfo = await getPetInfo();
        if (storedPetInfo) window.location.href = 'https://google.com';
        else resolve(false);
    })
}

function loadSavedInputsFromStorage() { /* This isn't needed since form saves and clears by session. (Either by reload or new URL) */
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