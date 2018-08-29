<template>
    <div>

        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>


    
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 判断返回来的数组长度，如果为0则表示没有数据，那么就显示 -->
                                <tr v-if="message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <!-- 如果有数据，则显示下面的数据 -->
                                <tr v-for="item in message" :key="item.id">
                                    <td><el-switch
                                         v-model="item.selected"
                                         active-color="#13ce66"
                                         inactive-color="#ff4949">
                                        </el-switch></td>
                                    <td class="itemImg"><img :src="item.img_url" alt=""></td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>




                                    <!-- ????$event??? -->


                                    <td><el-input-number size="mini" :min='1' v-model="item.buycount"  @change="numChange($event,item.id)"></el-input-number></td>
                                    <td>{{item.sell_price*item.buycount}}</td>
                                    <td><el-button @click="deleteOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button></td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPriceCount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>

    </div>

        
</template>

<script>
export default {
  name: "shoppingcar",
  data() {
    return {
      message: []
    };
  },
  created() {
    // 获取购物车里面存储的商品
    let cartGood = this.$store.state.cartGood;

    // 获取所有商品的id
    let ids = "";

    // 遍历生成所有id进行拼接
    for (const key in cartGood) {
      ids = ids + key + ",";
      // console.log(ids)
    }
    // 截除字符串中最后的‘,’
    ids = ids.slice(0, -1);
    // console.log(ids)

    this.$axios(`site/comment/getshopcargoods/${ids}`).then(response => {
      console.log(response.data.message);
      response.data.message.forEach(element => {
        // 因为后台返回的购买数量固定为0 , 所以需要动态的在这里进行赋值
        element.buycount = cartGood[element.id];

        // 为了设置开关按钮，所以给每个数据中插入，默认值为true
        // 为了统计开关时涉及到的数量加减
        element.selected = true;
      });

      this.message = response.data.message;
    });
  },
  methods: {
    //  定义删除的方法
    deleteOne(id) {
      // 提交载荷 这里是删除 Vuex中的
      this.$store.commit("deletGoods", id);

      // 页面中的 并没有删除
      // this.message
      //   遍历message中选中的id，删除对应的数据
      this.message.forEach((v, index) => {
        if (v.id == id) {
          this.message.splice(index, 1);
        }
      });
    },
    // 提交载荷
    // 定义修改的方法
    numChange(num, id) {
        console.log(num,id)
      this.$store.commit("updataGoodsNum", {
        goodID: id,
        goodNum: num
      });
    }
  },
  computed: {
    //   计算总数
    totalCount() {
      let totalcount = 0;

      this.message.forEach(v => {
        if (v.selected == true) {
          totalcount = parseInt(totalcount + v.buycount);
        }
      });

      return totalcount;
    },

    // 计算总金额
    totalPriceCount() {
      let totalprice = 0;

      this.message.forEach(v => {
        if (v.selected == true) {
          totalprice = v.buycount * v.sell_price + totalprice;
        }
      });

      return totalprice;
    }
  }
};
</script>

<style lang="less">
.itemImg > img {
  width: 70px;
}
</style>

