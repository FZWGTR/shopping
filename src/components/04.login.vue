<template>
    
<div v-loading="loading"
    element-loading-text="拼命登录中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%"
>
    <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
    </div>


    <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                         <Input v-model.trim="name" placeholder="请输入用户名" style="width: 342px" />
                         <br>
                         <br>
                         <Input v-model.trim="password" type="password" placeholder="请输入密码" style="width: 342px" />
                         <br>
                         <br>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="submit" @click="login" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>

</div>

</template>


<script>
export default {
  name: "login",
  data() {
    return {
        name:'',
        password:'',
        // 默认为不显示加载遮罩层
        loading:false,
    };
  },
  methods: {
    //   点击登录
      login(){
        //   点击登录发送请求前打开加载遮罩层
          this.loading=true

          this.$axios.post('site/account/login',{
              user_name:this.name,
              password:this.password
          }).then(response=>{
            //   数据请求回来后关闭遮罩层
              this.loading=false
              console.log(response)

            // 如果status表示登录失败（用户名或者密码错误）
            if(response.data.status==1){
                // 根据请求发回的提示
                this.$message(response.data.message)
            }else{
                // 登录成功跳转到上一个页面
                this.$router.push(this.$store.state.pageFrom)

                // 登录后右上角的登录状态改变为会员中心的
                this.$store.commit('changeLoginStatus',true)
                
                // this.$store.state.isShow=true
            }

          })

      }
  }
};
</script>


<style lang="less">
</style>


