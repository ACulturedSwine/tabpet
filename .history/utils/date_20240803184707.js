const formatToday() { // Returns 
    let date = new Date();
let month = String(date.getMonth() + 1).padStart(2, '0');
let day = String(date.getDate()).padStart(2, '0');
let formattedDate = `${month}-${day}`;
}