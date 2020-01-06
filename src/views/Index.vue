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
    </div>

    <div class="nav">
      <!-- sticky导航栏固定 -->
      <van-tabs v-model="active" sticky swipeable>
        <van-tab :title="cate.name" v-for="cate in cateList" :key='cate.id'>
          
        </van-tab>
      </van-tabs>
    </div>
    <div class="newList"></div>
  </div>
</template>

<script>
import {getCateList} from '../apis/cate.js'
export default {
  data(){
    return {
      id:'',
      cateList:[],
      active:localStorage.getItem('login_token')?1:0
    }
  },
  async mounted(){
    console.log(this.active)
    this.id = JSON.parse(localStorage.getItem('userInfo')||"{}").id
    let res = await getCateList();
    console.log(res)
    this.cateList = res.data.data
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
</style>