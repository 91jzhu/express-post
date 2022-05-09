require('less/toast.less');
 
function toast(msg,time){
    this.msg=msg
    this.dissmissTime=time||1000
    this.createToast()
    this.showToast()
}
console.log($);
toast.prototype={
    createToast(){
        const tmp=`<div class="toast">${this.msg}</div>`
        this.$toast=$(tmp)
        $('body').append(this.$toast)
    },
    showToast(){
        this.$toast.fadeIn(300,()=>{
            setTimeout(()=>{
                this.$toast.fadeOut(300,()=>{
                    this.$toast.remove()
                })
            },this.dissmissTime)
        })
    }
}
function Toast(msg,time){
    return new toast(msg,time)
}

module.exports={
    Toast
}
