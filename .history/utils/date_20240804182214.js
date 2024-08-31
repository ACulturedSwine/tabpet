function formatToday() { // Returns today as mm-dd
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${month}-${day}`;
    return formattedDate;
}

function isSpecialDay() { // Returns day if special day
    const specialDays = {
        '01-01': 'New Year',
        '02-14': 'Valentine',
        '10-31': 'halloween',
        '12-25': 'christmas',
        '08-03' : 'birthday'
    }
    return specialDays[formatToday()];
}

function openedToday() {
    return false;
}

function getTimeOfDay() {
    const date = new Date();
}

export { isSpecialDay, openedToday, getTimeOfDay };