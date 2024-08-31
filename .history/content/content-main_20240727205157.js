import { Interactable } from "/interact/classes.js";
import { isPastedImg } from "/interact/img-utils.js"; 

let pasteType = 'food';
let interactableContainer = null;

console.log('running');

export function main() {
    if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') { // DOM content already loaded
        console.log('already loaded');
        start();
    }
    else {
        document.addEventListener('DOMContentLoaded', start);
    }
}

function start() {
    createInteractableContainer();
    changeProfilePhoto();
    bindPaste();
}

function createInteractableContainer() {
    const res = document.createElement('div');
    res.id = 'interactable-container';

    const mainDiv = document.querySelector('.L3eUgb');
    const zoomLevel = Math.round(window.devicePixelRatio * 10) / 10; // Returns zoom percentage as decimal, rounded to tenth (ex. 100%, 90%)

    const standardWidth = mainDiv.offsetWidth * zoomLevel; // Screen width at 100%
    const standardHeight = mainDiv.offsetHeight * zoomLevel; // Screen height at 100%
    
    res.style.width = `${standardWidth}px`;
    res.style.height = `${standardHeight}px`;

    res.style.top = '0';
    res.style.left = `calc(50% - ${standardWidth / 2}px)`;

    document.body.appendChild(res);
    interactableContainer = res;
    
    console.log('zoom level', zoomLevel);
    console.log('main div dimensions', mainDiv.offsetWidth, mainDiv.offsetHeight);
}

function changeProfilePhoto() {
    const url32 = chrome.runtime.getURL('/icon/32.png');
    const url64 = chrome.runtime.getURL('/icon/64.png');

    const photoEl = document.querySelector('.gb_q.gbii');
    if (photoEl) {
        photoEl.src = url32;
        photoEl.srcset = `${url32} 1x, ${url64} 2x`;
    }
}

function bindPaste() {
    document.addEventListener('paste', (e) => handlePaste(e));
}

async function handlePaste(e) {
    const imgData = await isPastedImg(e);
    
    // Not image, don't do anything
    if (!imgData) return;

    // Get image src and do something with it depending on interact type

    let src = imgData.img;
    if (imgData.type === 'file') src = window.URL.createObjectURL(imgData.img);

    // Get position
    const mainDiv = document.querySelector('.L3eUgb');
    const pos = await getCursorPositionRelativeTo(mainDiv);

    // Create interactable
    const food = new Interactable(pasteType, src, pos);
    mainDiv.appendChild(food.el);
}

function getCursorPosition() {
    return new Promise((resolve)=> {
        document.addEventListener('mousemove', (e)=> {
            resolve({x: e.clientX, y: e.clientY});
        }, {once: true});
    })
}

function getCursorPositionRelativeTo(el) {
    return new Promise(async (resolve)=> {
        const pos = await getCursorPosition();
        const elDimensions = el.getBoundingClientRect();
        const relativePos = {x: pos.x - elDimensions.left, y: pos.y - elDimensions.top};
        resolve(relativePos);
    });
}