function formatToday() { // Returns today as mm-dd
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${month}-${day}`;
    return formattedDate;
}

function isSpecialDay() {
    const specialDays = {
        'new-year': ['🥳', '🎊', '🎉', '🎆', '🎇'],
        'valentine': ['🌹', '💐', '💝', '❤️', '💝', '💘', '💌'],
        'halloween': ['🎃', '👻', '🐦‍⬛', '🐺', '🍫', '🍭', '🍬'],
        '12-25', 'christmas'
        '08-03' : 'birthday'
    }
}