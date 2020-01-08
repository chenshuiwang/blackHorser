<template>
  <div class="test">
      <button @click="getdata">dscd</button>
  </div>
</template>

<script>
import {getCateList} from '../apis/cate.js'
export default {
    methods:{
        getdata(){
            let res = getCateList();
            console.log(res)
        }
    }
}
</script>

<style>

</style>