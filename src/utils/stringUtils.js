const truncarString = (string) => {
    const maxChar = 13
    if (string.length > maxChar) string = string.slice(0, maxChar) + "..."
    return string     
}

export default truncarString