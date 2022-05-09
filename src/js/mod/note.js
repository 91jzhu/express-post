require('less/note.less')
const { createId } = require('../lib/createId')
const debounce = require('../lib/debounce')
const { listenOff, listenHeight } = require('../lib/observer')
const { waterfall } = require('./waterfall')
const { Toast } = require('./toast')

function Note(msg) {
    this.id = createId()
    this.msg = msg
    const tmp = `
    <div class="note">
         <div class='note-head'>
              <span class='note-off'>X</span>
         </div>
         <div class='note-content' contenteditable="true">${this.msg}</div>
    </div>`
    this.$note = $(tmp)
    try {
        (async () => {
            await this.create(this.id)
        })()
        this.init()
        console.log(3)
        return this.$note
    } catch (e) {
        console.warn(e);
        Toast('添加失败，请稍后再试')
        return $('<div></div>')
    }
}

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}

const arr = ['70px', '80px', '90px', '100px', '110px']
Note.prototype = {
    init() {
        this.listenMove()
        this.listenOff()
        this.listenEdit()
    },
    create() {
        return new Promise((resolve, reject) => {
            $.post('api/note/create', { id: this.id }).done(res => {
                if (res.status === 0) {
                    resolve()
                } else {
                    reject()
                }
            })
        })
    },
    listenEdit() {
        this.$note.find('.note-content').on('keypress', (e) => {
            if (e.keyCode === 13 && !e.shiftKey) {
                console.log(this.$note.find('.note.content').innerText);
                $.post('/api/note/edit')
            }
        })
    },
    listenOff() {
        this.$note.find('.note-off').click(() => {
            this.$note.remove()
            waterfall($('#content'))
        })
    },
    listenMove() {
        this.drag = false
        this.position = []
        this.$note.find('.note-head').on('mousedown', (e) => {
            this.drag = true
            this.position = [e.clientX, e.clientY]
            this.$note.addClass('draggable')
            $('body').css('user-select', 'none')
            listenOff()
        })
        $(document).on('mousemove', (e) => {
            if (!this.drag) return;
            const moveX = e.clientX - this.position[0]
            const moveY = e.clientY - this.position[1]
            const left = moveX + this.$note.position().left
            const top = moveY + this.$note.position().top
            this.$note.css({ top, left })
            this.position = [e.clientX, e.clientY]
        })
        $(document).on('mouseup', () => {
            if (this.drag) {
                this.drag = false
                this.$note.removeClass('draggable')
                $('body').css('user-select', 'auto')
                listenHeight()
            }
        })
    }
}

module.exports = {
    Note: (msg) => new Note(msg)
}

