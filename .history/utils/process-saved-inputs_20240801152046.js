function getProcessedPersonalInfo(savedInputs) {
    let name = savedInputs.firstName;
    if (savedInputs.lastName) name += ' ' + savedInputs.lastName;

    const birthday = new Date(savedInputs.year, savedInputs.month, savedInputs.year).toDateString;
    return {};
}

export { getProcessedPersonalInfo };