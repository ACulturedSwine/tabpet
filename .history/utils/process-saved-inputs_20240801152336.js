function getFullName(savedInputs) {
    let name = savedInputs.firstName;
    if (savedInputs.lastName) name += ' ' + savedInputs.lastName;

    return name;
}

function getBirthday(savedInputs) { // Return birthday with month typed out
    return new Date(savedInputs.year, savedInputs.month - 1, savedInputs.year).toDateString(); // Month is indexed at 0
}


export { getFullName, getBirthday };