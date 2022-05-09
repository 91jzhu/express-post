const waterfall = (container) => {
    const childs = container.children()
    const arr = []
    const cols = parseInt((container.outerWidth(true)) / ($(childs).outerWidth(true)))
    const nodeWidth = $(childs).outerWidth(true)
    for (let i = 0; i < childs.length; i++) {
        if (i < cols) {
            $(childs[i]).css({
                top: '0',
                left: `${i * nodeWidth}px`,
            })
            arr.push($(childs[i]).outerHeight(true))
        } else {
            let minHeight = arr[0]
            let index = 0
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] < minHeight) {
                    minHeight = arr[j]
                    index = j
                }
            }
            $(childs[i]).css({
                top: `${minHeight}px`,
                left: `${index * nodeWidth}px`
            })
            arr[index] = arr[index] + $(childs[i]).outerHeight(true)
        }
    }
}

module.exports = {
    waterfall
}

