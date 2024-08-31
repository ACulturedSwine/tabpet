const nextButton = document.getElementById('next');
nextButton.addEventListener('click', ()=> {
    checkValidInputs();
})

function checkValidInputs() {
    const inputs = document.getElementById('input-div').querySelectorAll('input');
    console.log(inputs);
}