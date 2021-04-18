export function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        };
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function getLastOfArray(array) {
    return array[array.length -1]
}

export function compareOptions(firstOption, secondOption) {
    return (firstOption.value === secondOption.value) && (firstOption.content === secondOption.content)
}

export function removeFromNodeList(element) {
    return element.parentNode?.removeChild(element)
}