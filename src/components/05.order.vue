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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <!-- 运用el的form组件 -->
                                <!-- status-icon用于在验证时方框内的最右侧有小图标 -->
                                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input v-model="ruleForm.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="area">
                                        <v-distpicker 
                                        :province="ruleForm.area.province.value"
                                        :city="ruleForm.area.city.value"
                                        :area="ruleForm.area.area.value"
                                        @selected="onSelected"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="ruleForm.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="ruleForm.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话" >
                                        <el-input v-model="ruleForm.tel"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="email">
                                        <el-input v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input v-model="ruleForm.post_code"></el-input>
                                    </el-form-item>

                                </el-form>    
                            </div>


                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>&nbsp;&nbsp;
                                        <em>手续费：￥0.00</em>
                                        <!-- <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1"> -->
                                        <!-- <input name="payment_price" type="hidden" value="0.00">在线支付 -->
                                        <!-- <em>手续费：0.00元</em> -->
                                        <br>
                                        <el-radio disabled label="禁用">货到付款</el-radio>&nbsp;&nbsp;
                                        <em>手续费：￥10.00</em>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio @change="expressPrice(20)" v-model="ruleForm.express_id" label="1">顺丰快递</el-radio>&nbsp;&nbsp;<em>费用：20.00元</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <el-radio @change="expressPrice(10)" v-model="ruleForm.express_id" label="2">圆通快递</el-radio>&nbsp;&nbsp;<em>费用：10.00元</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <el-radio @change="expressPrice(8)" v-model="ruleForm.express_id" label="3">韵达快递</el-radio>&nbsp;&nbsp;<em>费用：8.00元</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <!-- <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                                        <input name="express_price" type="hidden" value="20.00">顺丰快递
                                        <em>费用：20.00元</em>
                                        <span class="Validform_checktip"></span> -->
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodslist" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                {{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                {{item.sell_price*item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" v-model="ruleForm.message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalProductCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{totalPrice+ruleForm.expressMoment}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <!-- <a class="btn button" href="/cart.html">返回购物车</a> -->
                                        <!-- <a id="btnSubmit" class="btn submit">确认提交</a> -->
                                        <router-link to="/shopcar" class="btn button" href="/cart.html">返回购物车</router-link>
                                        <!-- <router-link to="/orderDetail" @click="subForPay" id="btnSubmit" class="btn submit">确认提交</router-link> -->
                                        <a @click="subForPay" id="btnSubmit" class="btn submit">确认提交</a>
                                    </p>
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
// 引入省市联动的插件
import VDistpicker from "v-distpicker";

export default {
  name: "order",
  data() {
    //   el提供的自定义校验规则
    //      进行一些正则判断
    // 判断手机
    var checkMobile = (rule, value, callback) => {
      let MobileRegex = value.match(
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      );

      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('必须年满18岁'));
        //     } else {
        //       callback();
        //     }
        //   }
        if (MobileRegex) {
          // 号码格式正确则返回
          callback();
        } else {
          // 号码格式不正确提示
          callback(new Error("请输入正确的手机号码"));
        }
      }, 500);
    };
    // 判断电子邮箱
    var checkEmail = (rule, value, callback) => {
      let MobileRegex = value.match(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      );

      if (!value) {
        return callback(new Error("电子邮箱不能为空"));
      }
      setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('必须年满18岁'));
        //     } else {
        //       callback();
        //     }
        //   }
        if (MobileRegex) {
          // 号码格式正确则返回
          callback();
        } else {
          // 号码格式不正确提示
          callback(new Error("请输入正确的电子邮箱格式"));
        }
      }, 500);
    };

    // 判断邮政编码
    var checkPostCode = (rule, value, callback) => {
      let MobileRegex = value.match(/^[1-9][0-9]{5}$/);

      if (!value) {
        return callback(new Error("邮政编码不能为空"));
      }
      setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('必须年满18岁'));
        //     } else {
        //       callback();
        //     }
        //   }
        if (MobileRegex) {
          // 号码格式正确则返回
          callback();
        } else {
          // 号码格式不正确提示
          callback(new Error("请输入正确的邮政编码"));
        }
      }, 500);
    };

    return {
      // 商品列表数据
      goodslist: [],
      // ele组件提供的格式(存数据)
      ruleForm: {
        //  收货人地址
        accept_name: "假名字",
        //   所属地区
        area: {
          province: {
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440306",
            value: "宝安区"
          }
        },
        // 详细地址
        address: "家地址",
        // 手机号码，
        mobile: "13699998888",
        // 联系电话
        tel: "10086",
        // 电子邮箱
        email: "120000@qq.com",
        // 邮政编码
        post_code: "518000",
        //支付方式
        payment_id: "6",
        //运送方式（默认为顺丰）
        express_id: "1",
        //快递费（默认顺丰的费用）
        expressMoment: 20,
        //文本框
        message: "没有真正的内容",
        // 商品总额
        goodsAmount: "",
        // 商品id对象
        cargoodsobj: "",
        // 购买商品的id
        goodsids: "",
      },
      // ele组件提供的格式（存设置）
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "change"
          }
        ],
        area: [{ required: true, message: "请选择收货地区", trigger: "blur" }],
        address: [
          { required: true, message: "请输入收货地址", trigger: "blur" }
        ],
        mobile: [{ required: true, validator: checkMobile, trigger: "change" }],
        email: [{ validator: checkEmail, trigger: "change" }],
        post_code: [{ validator: checkPostCode, trigger: "change" }]
      }
    };
  },
  //   省市联动
  components: { VDistpicker },
  methods: {
    // 点击提交填写的数据
    subForPay() {
        // console.log(1)
        this.$axios.post("site/validate/order/setorder",this.ruleForm).then(response => {
            console.log(response);
            if(response.data.status==0){

                let orderId=response.data.message.orderid
                    console.log(orderId)
                // 带上返回的id值跳转到下一页（订单详情页）
                this.$router.push('/orderDetail/'+orderId)
                // 减去右上角购物车中已购买的数量
                // 因为一下方法是只可以删除单个的id，但是传入的是多个的id,所以要先遍历
                // this.$store.commit('deletGoods',orderId)
                this.goodslist.forEach(v=>{
                    this.$store.commit('deletGoods',v.id)
                })

            }else{
                this.$message(response.data.message)
            }

          });
    },
    // 省市联动取值
    onSelected(value) {
      // console.log(value)
      this.ruleForm.area = value;
      // this.ruleForm.area.city=value
      // this.ruleForm.area.area=value
    },
    // 快递费用
    expressPrice(price) {
      // console.log(price)
      this.ruleForm.expressMoment = price;
    }
  },
  computed: {
    //   计算商品总数量
    totalProductCount() {
      let countNum = "";

      this.goodslist.forEach(v => {
        countNum = parseInt(countNum + v.buycount);
        // console.log(v.buycount)
      });

      return countNum;
    },
    //  计算商品总金额
    totalPrice() {
      let price = "";

      this.goodslist.forEach(v => {
        price = parseInt(v.buycount * v.sell_price + price);
      });

      return price;
    }
  },

  created() {
    let cartGood = this.$store.state.cartGood;
    // let ids = "";
    // let ids = this.$route.path.indexof('=',1);
    let path = this.$route.path;
    let ids = path.split("order/");
    // console.log(ids[1]);

      // 购买商品的id
    this.ruleForm.goodsids=this.$route.params.ids
    // console.log(this.ruleForm.goodsids)

    this.$axios
      .get(`site/validate/order/getgoodslist/${ids[1]}`)
      .then(response => {
        // console.log(response.data.message)

        // 准备写入总金额（goodsAmount）
        let totalprice = 0;
        // 准备商品id对象cargoodsobj
        let cargoodsObj = {};

        response.data.message.forEach(e => {
          // 获取单个商品购买的数量
          e.buycount = cartGood[e.id];
          // 获取单个商品购买的总金额
          e.goodsamount = e.buycount * e.sell_price;
          // 获取所有商品购买的金额
          totalprice = totalprice + e.goodsamount;
          // 获取商品id对象
          cargoodsObj[e.id] = cartGood[e.id];
        });
        // console.log(response.data.message);
        this.goodslist = response.data.message;

        // console.log(response.data.message.buycount)

        // 写入总金额
        this.ruleForm.goodsAmount = totalprice;
        // console.log(totalprice)
        // 商品id对象cargoodsobj
        this.ruleForm.cargoodsobj = cargoodsObj;
        // console.log(cargoodsObj)
      });
  }
};
</script>


<style lang="less">
</style>

