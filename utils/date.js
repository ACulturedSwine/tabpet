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
        '02-14': `Valentine's Day`,
        '10-31': 'Halloween',
        '12-25': 'Christmas',
        '08-03' : 'birthday'
    }
    return specialDays[formatToday()];
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours() + 1; // getHours() is indexed at 0
    if (hours >= 5 && hours < 12) return 'morning'; // 5 AM to 12 PM
    else if (hours < 17) return 'afternoon'; // 12 PM to 5 PM
    else return 'evening';
}

function sameDay(d1, d2) {
    return d1.getDay() === d2.getDay() && d1.getMonth() === d2.getMonth() && d1.getYear() === d2.getYear();
}

export { isSpecialDay, getTimeOfDay, sameDay };