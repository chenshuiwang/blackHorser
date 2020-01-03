<template>
    <input type="text" class="hminput" :class="{'success':statu,'error':!statu}" @input="handleInput" @blur="handleBlur">
</template>

<script>
export default {
    props:['rules','msg'],
    data(){
        return {
            statu:true
        }
    },
    methods:{
        handleInput(event){
            let value = event.target.value
            if(this.rules && this.rules.test(value)){
                this.statu = true
            }else{
                this.statu = false
            }
            this.$emit('input',value)
        },
        handleBlur(){
            let value = event.target.value
            if(this.rules && !this.rules.test(value)){
                console.log(this.msg || '输入不正确')  
            }
        }
    }
}
</script>

<style lang='less' scoped>
    .hminput{
        width:318/360*100vw;
        height: 60px;
        outline:none;
        border:none;
        border-bottom: 3px solid #ccc;
        font-size: 20px;
        line-height: 60px;
    }
    .success{
        border-bottom-color:green;
    }
    .error{
        border-bottom-color:red;
    }
</style>