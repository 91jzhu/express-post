require('less/global.less')
// const {Toast}=require('mod/toast.js')
const { Note } = require('mod/note.js')
const { waterfall } = require('mod/waterfall')
const { listenHeight,listenOff}=require('../lib/observer')

// Toast('hello fuck s',10000)
$('#content')
    .append(Note('1111'))
    .append(Note('2222'))
    .append(Note('3333'))
    .append(Note('4444'))
    .append(Note('5555'))
    .append(Note('6666'))
    .append(Note('7777'))
    .append(Note('8888'))

$('.addNote').on('click', () => {
    $('#content').append(Note('xxx'))
    waterfall($('#content'))
})
$(window).resize(() => {
    waterfall($('#content'))
})
// 监听高度变化
listenHeight()

$('#content').scroll((e) => {
    const target = e.target
    const sumHeight = target.scrollTop + $('#content').outerHeight(true)
    if (Math.round(sumHeight) === target.scrollHeight) {
        console.log('bottom')
    }
})
$(window).bind('beforeunload',()=>{
    listenOff()
})

waterfall($('#content'))




