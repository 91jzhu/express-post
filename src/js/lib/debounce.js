const debounce = (fn, delay) => {
    let timer
    return function (arg) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, arg)
            timer = null
        }, delay)
    }
}

module.exports = debounce