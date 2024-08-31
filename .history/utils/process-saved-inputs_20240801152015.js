function getProcessedPersonalInfo(savedInputs) {
    let name = savedInputs.firstName;
    if (savedInputs.lastName) name += ' ' + savedInputs.lastName;

    const birthday = new Date().toDateString;
    return {};
}

export { getProcessedPersonalInfo };