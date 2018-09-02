<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{userInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{userInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{userInfo.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{userInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{userInfo.order_amount}}元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{userInfo.message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <!-- 二维码标签 -->
                                    <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+$route.params.ids" :options="{ size: 200 }"></qrcode>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
// 生成二维码
import VueQrcode from "@xkeshi/vue-qrcode";

// Vue.component(VueQrcode.name, VueQrcode);

export default {
  name: "orderDetail",
  data() {
    return {
      userInfo: ""
    };
  },
  //   二维码组件
  components: {
    [VueQrcode.name]: VueQrcode
  },
  methods: {},
  created() {
    let orderid = this.$route.params.ids;

    this.$axios
      .get(`site/validate/order/getorder/${orderid}`)
      .then(response => {
        // console.log(response.data.message[0]);
        this.userInfo = response.data.message[0];
      });

// 设置定时器，每隔1秒向服务器发起请求数据，查看message中的status是否改变
   let settime= setInterval(() => {
      this.$axios
        .get(`site/validate/order/getorder/${orderid}`)
        .then(response => {
            // console.log(response)
            // console.log(response.data.message[0])
            this.userInfo=response.data.message[0]
            
          // 支付成功
          if (this.userInfo.status!=1) {

             this.$message.success('支付成功咯')

               this.$router.push(`/paysuccess/${orderid}`)

               clearInterval(settime)

          } 
          // 未支付成功
        //   else {
             
        //   }


        });
    }, 1000);
  }
};
</script>

<style lang="less">
</style>
