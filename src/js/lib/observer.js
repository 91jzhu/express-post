// 监听便利贴高度，重新布局
const { waterfall } = require('mod/waterfall')
const callback = (mutations, observer) => {
    waterfall($('#content'))
}
let observer;

const initObserver = () => {
    observer = new MutationObserver(callback)
}

initObserver()

const listenHeight = () => {
    if (!observer||!observer.observe) {
        initObserver()
    }
    observer.observe($('#content')[0],
        {
            attributes: true,
            attributeFilter: ['style'],
            attributeOldValue: true,
            characterData: true,
            subtree: true
        })
}

const listenOff = () => {
    if (observer.observe) {
        observer.disconnect()
        observer.takeRecords()
        observer = null
    }
}

module.exports = {
    listenHeight,
    listenOff
}