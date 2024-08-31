function getFullName(savedInputs) {
    let name = savedInputs.firstName;
    if (savedInputs.lastName) name += ' ' + savedInputs.lastName;


    return {};
}

export { getProcessedPersonalInfo };