<template>
  <div class="focus">
      <myheader title='我的收藏'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <hmarticleblock v-for="item in starList" :key="item.id" :post="item" @click="$router.push({path:`/articleDetail/${item.id}`})"></hmarticleblock>
  </div>
</template>

<script>
import hmarticleblock from '../components/hmarticleBlock'
import myheader  from '../components/hmheader'
import {getUserStars} from '../apis/article.js'
export default {
    components:{
        hmarticleblock,myheader
    },
    data(){
        return{
            starList:[]
        }
    },
    async mounted(){
         let res = await getUserStars()
         console.log(res) ;
         this.starList = res.data.data
    }
};
</script>

<style>
</style>