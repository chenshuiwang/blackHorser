<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model="userkey" 
        placeholder="请输入搜索关键字"
        shape='round'
      ></van-search>
      <div @click="onSearch(userkey)">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <a href="javascript:;" v-for="(item,index) in historylist" :key='index' @click="onSearch(item)">{{item}}</a>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link :to='{path:`/articleDetail/${item.id}`}' v-for="item in searchlist" :key='item.id'>
        {{item.title}}
      </router-link>
    </div>
  </div>
</template>

<script>
import {searchArticle} from '../apis/article.js'
export default {
  data(){
    return {
      userkey:'',
      searchlist:[],
      historylist:[]
    }
  },
  mounted(){
    this.historylist = this.getdata()
    //console.log(this.historylist)
  },
  methods:{
    async onSearch(userkey){
      let res = await searchArticle({keyword:userkey});
      if(res.data.data.length > 0){
        this.searchlist = res.data.data;
      }
      let arr = this.getdata();
      let index = arr.indexOf(userkey)
      if(index != -1){
        arr.splice(index,1)
      }
      arr.unshift(userkey);
      this.historylist = arr;
      console.log(arr)
      localStorage.setItem('historylist',JSON.stringify(arr))
      //this.historylist.unshift(userkey)

    },
    getdata(){
      return JSON.parse(localStorage.getItem('historylist')||'[]')
    }
  }
}
</script>

<style lang='less' scoped>
  .header{
    display: flex;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    .van-search{
      flex: 1;
      padding: 5px 12px;
    }
  }
  .historyList{
    padding:10px;
    border-bottom: 1px solid #ccc;
    h2{
      line-height: 40px;
      font-weight: bold;
    }
    > a {
      display: block;
      text-decoration: underline;
      line-height: 30px;
      color:#666;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

</style>