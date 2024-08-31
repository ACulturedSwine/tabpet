async function isValidImageURL1(url) { // Alternative method
    const res = await fetch(url,{method:'HEAD'});
    const buff = await res.blob();
    console.log(buff.type.startsWith('image/'));
    return buff.type.startsWith('image/');
}

function isValidImage(img) {

}

export { isValidImageURL };