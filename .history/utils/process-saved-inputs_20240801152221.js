function getFullName(savedInputs) {
    let name = savedInputs.firstName;
    if (savedInputs.lastName) name += ' ' + savedInputs.lastName;

    const birthday = new Date(savedInputs.year, savedInputs.month - 1, savedInputs.year).toDateString(); // Month is indexed at 0
    
    const gender = savedInputs.gender;


    return {};
}

export { getProcessedPersonalInfo };