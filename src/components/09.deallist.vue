<template>
    <div class="el-row">
                <div class="el-col el-col-24">
                    <div class="comp">
                        <div class="tmpl routeanimate">
                            <div class="section">
                                <div class="location">
                                    <span>当前位置：</span>
                                    <a href="/index.html">首页</a> &gt;
                                    <a href="#/site/member/center" class="">会员中心</a>&gt;
                                    <a href="#/site/member/orderlist" class="router-link-exact-active ">我的订单</a>
                                </div>
                            </div>
                            <div class="section clearfix">
                                <div class="left-260">
                                    <div class="bg-wrap">
                                        <div class="avatar-box">
                                            <a href="/user/center/avatar.html" class="img-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </a>
                                            <h3>

                                                ivanyb

                                            </h3>
                                            <p>
                                                <b>注册会员</b>
                                            </p>
                                        </div>
                                        <div class="center-nav">
                                            <ul>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-order"></i>
                                                        <span>订单管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <!-- <a href="#/site/member/orderlist" class="router-link-exact-active "> -->
                                                            <router-link to="/deallist/">
                                                            <i class="iconfont icon-arrow-right"></i>交易订单
                                                            </router-link>
                                                                
                                                        </p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <h2>
                                                        <i class="iconfont icon-user"></i>
                                                        <span>账户管理</span>
                                                    </h2>
                                                    <div class="list">
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                        </p>
                                                        <p>
                                                            <a href="#/site/member/center" class="">
                                                                <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                        </p>
                                                        <p>
                                                            <a href="javascript:void(0)">
                                                                <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="right-auto">
                                    <div class="bg-wrap" style="min-height: 765px;">
                                        <div class="sub-tit">
                                            <ul>
                                                <li class="selected">
                                                    <!-- <a href="/deallist/">交易订单</a> -->
                                                    <router-link to="/deallist/">交易订单</router-link>
                                                </li>
                                            </ul>
                                             
                                        </div>
                                           <el-pagination
                                              @size-change="SizeChange"
                                              @current-change="CurrentChange"
                                              :current-page="pageIndex"
                                              :page-sizes="[5, 10, 15, 20]"
                                              :page-size="pageSize"
                                              layout="total, sizes, prev, pager, next, jumper"
                                              :total="totalcount"
                                              style="margin-left:60px">
                                            </el-pagination>
                                        <div class="table-wrap">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                                                <tbody>
                                                    <tr>
                                                        <th width="16%" align="left">订单号</th>
                                                        <th width="10%">姓名</th>
                                                        <th width="12%">订单金额</th>
                                                        <th width="15%">下单时间</th>
                                                        <th width="10%">状态</th>
                                                        <th width="12%">操作</th>
                                                    </tr>
                                                    <tr v-for="item in message" :key="item.id"  class="messageTr">
                                                        <td>{{item.order_no}}</td>
                                                        <td align="left">{{item.accept_name==""?'匿名':item.accept_name}}</td>
                                                        <td align="left">
                                                            <strong style="color: red;">￥{{item.payable_amount}}</strong>
                                                            <br> 在线支付
                                                        </td>
                                                        <td align="left">{{item.payment_time | dateStyle("YYYY年MM月DD日 HH:mm:ss")}}</td>
                                                        <td align="left">
                                                            {{item.statusName}}
                                                        </td>
                                                        <td align="left">
                                                            <router-link :to="'/watchlist/'+item.id">查看订单</router-link>
                                                            <!-- <a href="#/site/member/orderinfo/12" class="">查看订单</a> -->
                                                            <br>
                                                            <router-link v-if="item.status==1" :to="'/orderDetail/'+item.id">去付款</router-link>
                                                            <!-- <a href="#/site/goods/payment/12" class="">|去付款</a> -->
                                                            <br>
                                                            <a href="javascript:void(0)">|取消</a>
                                                            <br>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="page-foot">
                                                
                                            </div>
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
export default {
  name: "deallist",
  data() {
    return {
      // 默认第一页
      pageIndex: 1,
      // 默认显示10条信息
      pageSize: 10,
      // 总数量
      totalcount: "",
      // 所有的详细数据
      message: []
    };
  },
  methods: {
    // 获取数据
    getData() {
      this.$axios
        .get(
          `site/validate/order/userorderlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(response => {
        //   console.log(response);
          this.totalcount = response.data.totalcount;
          this.message = response.data.message;
        });
    },
    // 页容量改变
    SizeChange(value) {
    //   console.log(value)
      this.pageSize = value;
    //   再次获取数据刷新页面
      this.getData()
    //   改变后去到首页
      this.pageIndex= 1;
    },
    //页码改变
    CurrentChange(value) {
    //   console.log(value)
      this.pageIndex= value;
       //   再次获取数据刷新页面
      this.getData()
    }
  },
  created() {
    // 获取数据
    this.getData();
  }
};
</script>
<style lang="less">
</style>

