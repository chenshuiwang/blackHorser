<template>
  <div class="focus">
      <myheader title='我的收藏'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <van-swipe-cell v-for="item in starList" :key="item.id" :beforeClose='beforeClose' @close="onClose">
          <hmarticleblock  :post="item" @click="$router.push({path:`/articleDetail/${item.id}`})"></hmarticleblock>
          <template slot="right">
            <van-button square type="danger" text="删除" />
          </template>
      </van-swipe-cell>
  </div>
</template>

<script>
import hmarticleblock from '../components/hmarticleBlock'
import myheader  from '../components/hmheader'
import {getUserStars} from '../apis/article.js'
import {Dialog} from 'vant'
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
    },
    methods:{
        beforeClose({position,instance}){
            //console.log(2133)
            switch(position){
                case 'left':
                case 'cell':
                case 'outside':
                    instance.close();
                    break;
                case 'right':
                    Dialog.confirm({
                        message:'确定删除吗？'
                    }).then(()=>{
                        // console.log(this.post.id)
                        // let res = await starArticle(this.post.id);
                        // console.log(res)


                        instance.close();
                    });
                    break;
            }
        },
        onClose(){
            
        }
    }
};
</script>

<style>
</style>