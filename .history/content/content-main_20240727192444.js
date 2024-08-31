import { Interactable } from "/interact/classes.js";
import { isPastedImg } from "/interact/img-utils.js"; 

let interactImgType = 'food';
const contentContainer = createContentContainer();

export function main() {
    document.addEventListener('DOMContentLoaded', ()=> {
        console.log('loaded');
        changeProfilePhoto();
        bindPaste();
    })
}

function createContentContainer() {
    const res = document.getElementById('div');
    res.id = 'content';
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
    document.addEventListener('paste', (e) => handleInteractableImg(e, interactImgType));
}

async function handleInteractableImg(e, type) {
    const imgData = await isPastedImg(e);
    
    // Not image, don't do anything
    if (!imgData) return;

    // Get image src and do something with it depending on interact typeddd

    let src = imgData.img;
    if (imgData.type === 'file') src = window.URL.createObjectURL(imgData.img);
    if (type === 'food') {
        console.log('src', src);
        createFood(src);
    }
}

async function createFood(src) {
    const mainDiv = document.querySelector('.L3eUgb');
    const pos = await getCursorPositionRelativeTo(mainDiv);
    const food = new Interactable('food', src, pos);
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