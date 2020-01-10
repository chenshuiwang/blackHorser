<template>
  <div class="cate">
    <hmheader title="频道管理">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </hmheader>
    <div class="mycate">
        <p>点击删除频道</p>
        <span v-for="(item,index) in cateList" :key='item.id' @click="deleteCate(index)">{{item.name}}</span>
    </div>
    <div class="mycate">
        <p>点击增加频道</p>
        <span v-for="(item,index) in uncateList" :key='item.id' @click="addCate(index)">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { getCateList } from "../apis/cate.js";
import hmheader from "../components/hmheader.vue";
export default {
  components: {
    hmheader
  },
  data() {
    return {
      cateList: [],
      uncateList:[]
    };
  },
  async mounted() {
    let res;
    if(localStorage.getItem('cateList')){
        this.cateList = JSON.parse(localStorage.getItem('cateList'))
        this.uncateList = JSON.parse(localStorage.getItem('uncateList'))
    }else{
        res = await getCateList();
        this.cateList = res.data.data;
        if(localStorage.getItem('login_token')){
            this.cateList.splice(0,2);
        }else{
            this.cateList.splice(0,1)
        }
    } 
    //console.log(res);
  },
  methods:{
      deleteCate(index){
          this.uncateList.push(this.cateList[index])
          this.cateList.splice(index,1);
          localStorage.setItem('cateList',JSON.stringify(this.cateList))
          localStorage.setItem('uncateList',JSON.stringify(this.uncateList))
      },
      addCate(index){
          this.cateList.push(this.uncateList[index]);
          this.uncateList.splice(index,1);
          localStorage.setItem('uncateList',JSON.stringify(this.uncateList))
          localStorage.setItem('cateList',JSON.stringify(this.cateList))
      }
  }
};
</script>

<style lang='less' scoped>
  .mycate {
  padding: 15px;
  clear: both;
  > p {
    font-size: 16px;
    color: #888;
    line-height: 30px;
  }
  > span {
    float: left;
    padding: 10px 20px;
    border: 1px solid #ccc;
    margin-left: 12px;
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>