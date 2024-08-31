function formatFullName(savedInputs) {
    let name = savedInputs.firstName;
    if (savedInputs.lastName) name += ' ' + savedInputs.lastName;

    return name;
}

function formatBirthday(savedInputs) { // Return birthday with month typed out
    return new Date(savedInputs.year, savedInputs.month - 1, savedInputs.year).toDateString(); // Month is indexed at 0
}

function getProfilePhotoSrc(savedInputs) {
    if (savedInputs.selectPhoto === 'Custom') return savedInputs.photoUpload;
    `/profile-photos/${this.value}.png`
}


export { formatFullName, formatBirthday , getProfilePhotoSrc };