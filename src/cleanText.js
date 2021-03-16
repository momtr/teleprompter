const cleanText = (text) => {
    text = text.trim();
    ['.', '!', '?', ',', ':', ';', ')', '(', '=', '&', '%'].map((i) => {
        text = text.split(i).join(' ');
    })
    text = text.split('  ').join(' ');
    return text;
}

export default cleanText;