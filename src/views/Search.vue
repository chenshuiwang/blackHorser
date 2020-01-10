<template>
  <div class="search">
    <hmheader title="搜索">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmheader>
  </div>
</template>

<script>
import hmheader from '../components/hmheader.vue'
export default {
  components:{
    hmheader
  }
}
</script>

<style>

</style>