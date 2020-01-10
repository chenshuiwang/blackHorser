<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({name:'Search'})">
        <van-icon name="search"></van-icon>
        <span>搜索商品</span>
      </div>
      <div class="user" @click="$router.push({path:`/personal/${id}`})">
        <van-icon name="manager-o" />
      </div>
      <!-- <span style="font-size:30px" @click="$router.push({name:'CateManager'})">+</span> -->
    </div>
    <div class="nav">
      <!-- sticky导航栏固定 -->
      <van-tabs v-model="active" sticky swipeable>
        <van-tab :title="cate.name" v-for="cate in cateList" :key='cate.id'>
          <van-list
            v-model="cate.loading"
            :finished="cate.finished"
            finished-text='没有啦'
            @load='onload'
            :immediate-check='false'
            :offset='10'
          >
            <van-pull-refresh v-model="cate.isloading" @refresh='onRefresh'>
              <hmarticleblock v-for="item in cate.postList" :key="item.id" :post="item" @click="$router.push({path:`/articleDetail/${item.id}`})"></hmarticleblock>
            </van-pull-refresh>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <div class="newList"></div>
  </div>
</template>

<script>
import {getCateList} from '../apis/cate.js'
import hmarticleblock from '../components/hmarticleBlock.vue'
import {getPostList} from '../apis/article.js'
export default {
  components:{
    hmarticleblock
  },
  data(){
    return {
      id:'',
      cateList:[],
      active:localStorage.getItem('login_token')?1:0,
      a:0
    }
  },
  async mounted(){
    document.querySelector('.van-sticky').onclick = (e)=>{
      
      if(e.target.className === 'van-sticky'){
        //console.log('1223')
        this.$router.push({name:'CateManager'})
      }
      return false;
    }
    this.id = JSON.parse(localStorage.getItem('userInfo')||"{}").id
    if(localStorage.getItem('cateList')){
      this.cateList = JSON.parse(localStorage.getItem('cateList'));
      this.cateList.unshift(...[{id:0,name:'关注',is_top:1},{id:999,name:'头条',is_top:1}])
    }else{
      let res = await getCateList();
      this.cateList = res.data.data
    }
    this.cateList = this.cateList.map((value)=>{
      return{
        ...value,
        postList:[],
        pageSize:5,
        pageIndex:1,
        loading:false,
        finished:false,
        isloading:false
      }
    })
    //console.log(this.cateList)
    this.init()
  },
  watch:{
    active(){
      if(this.cateList[this.active].postList.length === 0){
        this.init()
    }}
  },
  methods:{
    async init(){
    let id = this.cateList[this.active].id;
    let res2 = await getPostList({
        pageSize: this.cateList[this.active].pageSize,
        pageIndex: this.cateList[this.active].pageIndex,
        category: id
    })
    this.cateList[this.active].loading = false
    this.cateList[this.active].isloading = false;
    if(res2.data.data.length < this.cateList[this.active].pageSize){
      this.cateList[this.active].finished = true;
    }
    this.cateList[this.active].postList.push(...res2.data.data);
    },
    onload(){
      if(this.cateList[this.active].isloading === false){
        this.cateList[this.active].pageIndex++;
        setTimeout(()=>{
          this.init()
        },1000)
      }
    },
    onRefresh(){
      this.cateList[this.active].pageIndex = 1;
      this.cateList[this.active].postList.length = 0;
      setTimeout(()=>{
        this.init()
      },1000)
      this.cateList[this.active].finished = false;
    },
  }
}
</script>

<style lang='less' scoped>
.header{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #f00;
  align-items: center;
  color: #fff;
  .logo{
    padding:0 10px;
    .iconnew{
      font-size: 60px
    }
  }
  .search{
    height: 40px;
    border-radius: 20px;
    line-height: 40px;
    flex: 1;
    background-color: rgba(255,255,255,0.4);
    text-align: center;
  }
  .user{
    font-size: 25px;
    padding:0 10px;
  }
  
}
/deep/.van-sticky{
  padding-right: 50px;
  &::after{
    content: '+';
    position: absolute;
    width: 51px;
    height: 44px;
    background-color: #fff;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 42px;
    font-size: 35px;
  }
  }
</style>