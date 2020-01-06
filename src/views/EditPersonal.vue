<template>
  <div>
    <hmheader title="编辑个人信息">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </hmheader>
    <div class="userimg">
      <img :src="currentUser.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell title="昵称" :desc="currentUser.nickname" @click="nickshow=!nickshow"></hmcell>
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm='updateNickname'>
      <van-field ref='nick' :value="currentUser.nickname" placeholder="请输入昵称" required label="昵称" />
    </van-dialog>

    <hmcell title="密码" :desc="currentUser.password" type="password" @click="passshow=!passshow"></hmcell>
     <van-dialog v-model="passshow" title="修改密码" show-cancel-button @confirm='updatePassword'>
      <van-field ref="originPass" placeholder="请输入原密码" required label="原密码" />
      <van-field ref="newPass" placeholder="请输入新密码" required label="新密码" />
    </van-dialog>

    <hmcell title="性别" :desc="currentUser.gender===0?'女':'男'" @click="gendershow=!gendershow"></hmcell>
    <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm = 'updateGender'>
       <van-picker :columns="['女','男']" :default-index="currentUser.gender"  @change="onChange"/>
    </van-dialog>
  </div>
</template>

<script>
import hmheader from "../components/hmheader.vue";
import { getUserById } from "../apis/user.js";
import hmcell from "../components/hmcell.vue";
import { uploadFile, updateUserById } from "../apis/upload.js";
export default {
  components: {
    hmheader,
    hmcell
  },
  data() {
    return {
      currentUser: {},
      // 修改昵称对话框是否可见
      nickshow: false,
      passshow: false,
      gendershow: false
    };
  },
  async mounted() {
    let res = await getUserById(this.$route.params.id);
    //console.log(res);
    if (res.data.message === "获取成功") {
      this.currentUser = res.data.data;
      // 如果有图片，则拼接
      if (this.currentUser.head_img) {
        this.currentUser.head_img =
          "http://127.0.0.1:3000" + this.currentUser.head_img;
      } else {
        // 如果没有图片，则设置默认图片
        this.currentUser.head_img =
          "http://127.0.0.1:3000/uploads/images/default.png";
      }
    }
  },
  methods: {
    async afterRead(file) {
      let formdata = new FormData();
      formdata.append("file", file.file);
      let res = await uploadFile(formdata);
      if (res.data.message == "文件上传成功") {
        this.currentUser.head_img = "http://localhost:3000" + res.data.data.url;
        let res2 = await updateUserById(this.currentUser.id, {
          head_img: res.data.data.url
        });
        if (res2.data.message === "修改成功") {
          this.$toast.success("修改成功");
        } else {
          this.$toast.fail("修改失败");
        }
      } else {
        this.$toast.fail("文件上传失败");
      }
    },
    async updateNickname(){
        //let name = this.$refs.nick.$refs.input.value;
        console.log(this)
        let name = this.$refs.nick.$refs.input.value
        let res = await updateUserById(this.currentUser.id,{
            nickname:name
        });
        if(res.data.message === '修改成功'){
            this.currentUser.nickname = name;
            this.$toast.success('修改成功')
        }else{
            this.$toast.fail('修改失败');
        }
    },
    async updatePassword(){
      console.log(this)
      let originPass = this.$refs.originPass.$refs.input.value;
      if(originPass === this.currentUser.password){
        let newPass = this.$refs.newPass.$refs.input.value
        if(/^\S{3,16}$/.test(newPass)){
          let res = await updateUserById(this.currentUser.id,{
            password:newPass
          });
          if(res.data.message === '修改成功'){
            this.currentUser.password = newPass;
            this.$toast.success('修改成功')
          }else{
            this.$toast.fail('修改失败')
          }
        }
      }
    },
    async updateGender(){
      let res = await updateUserById(this.currentUser.id,{
        gender:this.gender
      });
      if(res.data.message == '修改成功'){
        this.currentUser.gender = this.gender;
        this.$toast.success('修改成功')
      }else{
        this.$toast.fail('注册失败')
      }
    },
    onChange(picker,value,index){
      this.$toast(`当前值：${value}，当前索引：${index}`);
      this.gender = index
    }
    
  }
};
</script>

<style lang='less' scoped>
.userimg {
  height: 150px;
  position: relative;
  > img {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    display: block;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: (translate(-50%, -50%));
  }
  /deep/.van-uploader {
    // width: 90/360 * 100vw;
    // height: 90/360 * 100vw;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: (translate(-50%, -50%));
    opacity: 0;
  }
}
</style>