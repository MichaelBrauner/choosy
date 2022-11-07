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
    return array[array.length - 1]
}

export function compareOptions(firstOption, secondOption) {
    return (firstOption.value === secondOption.value) && (firstOption.content === secondOption.content)
}

export function removeFromNodeList(element) {
    return element.parentNode?.removeChild(element)
}

export function merge(obj, ...sources) {
    for (let source of sources) {
        for (let key in source) {
            if (source[key] == null) continue
            obj[key] = replaceValue(obj[key], source[key])
        }
    }

    return obj
}

function replaceValue(value, newValue) {

    if (Array.isArray(value) && Array.isArray(newValue)) {
        return newValue.map((val, i) => replaceValue(value[i], val))
    }

    if (isObject(value) && isObject(newValue)) {
        return merge(value, newValue)
    }

    return newValue
}

function isObject(obj) {
    return obj && obj.constructor === Object;
}