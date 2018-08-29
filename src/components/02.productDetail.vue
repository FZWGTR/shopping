<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer
                                v-if="images.normal_size.length!=0" 
                                    :base-images="images"
                                    :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>

                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <!-- 运用element插件提供的组件 -->
                                                    <el-input-number v-model="buycount" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                             <!-- 设置吸顶效果 -->
                         <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                               
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="showDiscuss=false" :class="{selected:!showDiscuss}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:; " @click="showDiscuss=true" :class="{selected:showDiscuss}">商品评论</a>
                                    </li>
                                </ul>
                                
                            </div>
                            </Affix>
                            <div class="tab-content entry" style="display: block;" v-show="showDiscuss==false" v-html="goodsinfo.content">
                                内容
                            </div>
                            <div class="tab-content" style="display: block;" v-show="showDiscuss==true">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="writeIn" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="submitComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comment" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateCommentStyle}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <!-- 分页插件 -->
                                            <!-- 定义两个官方提供的获取页数页码的方法 on-change on-page-size-change -->
                                            <!--  :total="totalcount"为评论总数量-->
                                             <Page :total="totalcount" show-sizer placement='top'
                                                @on-change='pageChangeFunc' @on-page-size-change='pageSizeChangeFunc'
                                              />
                                            <!-- <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/productDetail/'+item.id">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                                <img :src="item.img_url">
                                            <!-- </a> -->
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/productDetail/'+item.id">{{item.title}}</router-link>
                                            <!-- <a href="#/site/goodsinfo/90" class="">{{item.title}}</a> -->
                                            <span>{{item.add_time | dateStyle}}</span>
                                        </div>
                                    </li>
                                    <!-- <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/91" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200214471783.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/91" class="">尼康(Nikon)D3300套机（18-55mm f/3.5-5.6G VRII）（黑色）</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/92" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200225107390.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/92" class="">联想（Lenovo） G510AM 15.6英寸笔记本电脑</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/93" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/201504200341260763.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/93" class="">Apple iMac MF883CH/A 21.5英寸一体机电脑</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/94" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200239192345.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/94" class="">金士顿（Kingston） DataTraveler SE9 32GB 金属U盘</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/97" class="">
                                                <img src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200258403759.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/97" class="">三星（SAMSUNG）UA40HU5920JXXZ 40英寸4K超高清</a>
                                            <span>2015-04-20</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/102" class="">
                                                <img src="http://39.108.135.214:8899/imgs/wTgAWDLpQReTQ-ZOMdlAk4vF.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/102" class="">Hazzys哈吉斯2017新款男士长袖衬衫纯棉修身英伦衬衫显瘦商务衬衣</a>
                                            <span>2017-09-13</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="img-box">
                                            <a href="#/site/goodsinfo/103" class="">
                                                <img src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/103" class="">骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫衣</a>
                                            <span>2017-09-26</span>
                                        </div>
                                    </li> -->
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <BackTop></BackTop>

        <!-- 加入购物车的小图片 -->
        <!-- 使用标签时切忌在标签前加： -->
        <img class="addCartPic" :src="imglist[0].original_path" alt="" v-if="images.normal_size.length!=0">
    </div>
</template>

<script>
// import axios from "axios";
import $ from "jquery";

export default {
  name: "product",
  data() {
    return {
      productID: "",
      goodsinfo: {},
      //   最右侧列表数据
      hotgoodslist: [],
      imglist: [],
      //   准备购买添加的数量
      buycount: 1,
      showDiscuss: false,
      comment: [],
      commenttxt: "",
      // 放大镜
      zoomerOptions: {
        zoomFactor: 3,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "zoomer",
        // 小图点击可以切换
        move_by_click: true,
        scroll_items: 7,
        choosed_thumb_border_color: "#dd2c00"
      },
      // 轮播图用的图片 默认的数据格式 不支持
      // 这里的数据 需要在接口调用完毕之后 才能够获取
      images: {
        normal_size: []
      },

      //评论区
      // 双向绑定输入框输入的内容
      writeIn: "",
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 10,
      // 评论总数量
      totalcount: 0
    };
  },
  methods: {
    handleChange(value) {
      //   console.log(value);
    },
    // 渲染页面主内容
    getMaincontent() {
      //   获取跳转页面带过来的id
      this.productID = this.$route.params.id;
      //   console.log(this.productID);

      this.$axios
        .get("site/goods/getgoodsinfo/" + this.productID)
        .then(response => {
          //   console.log(response.data.message);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;

          let temArr = [];

          this.imglist.forEach((v, i) => {
            temArr.push({
              id: v.article_id,
              url: v.original_path
            });
          });
          this.images.normal_size = temArr;
        });
    },
    //渲染评论
    getComment() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.productID}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          //   console.log(response.data);
          this.comment = response.data.message;
          this.totalcount = response.data.totalcount;
          // this.hotgoodslist = response.data.message.hotgoodslist;
          // this.imglist = response.data.message.imglist;
        });
    },
    //获取页码改变
    pageChangeFunc(page) {
      //   console.log(page);
      this.pageIndex = page;

      // 页码改变时 重新获取数据即可
      this.getComment();
    },
    // 页容量改变 自动触发 页码改变 把页码改为1
    // 如果当前页码就是1 不会触发 pageChange
    pageSizeChangeFunc(size) {
    //   console.log(size);
      this.pageSize = size;

      // 如果就是第一页 重新获取数据
      this.getComment();
    },
    // 提交评论
    submitComment() {
      if (this.writeIn == "") {
        this.$Message.error("写点东西呗");
        return;
      }
      // 提交评论
      this.$axios
        .post(
          `site/validate/comment/post/goods/${this.productID}`,
          // 按照接口文档中的要求返回的对象格式
          {
            commenttxt: this.writeIn
          }
        )
        .then(response => {
          // console.log(response.data);
          // this.comment = response.data.message;
          // this.hotgoodslist = response.data.message.hotgoodslist;
          // this.imglist = response.data.message.imglist;
          // 局部重新刷新获取评论数据
          this.getComment();
          // 清空输入框内容
          this.writeIn = "";
          // 提示用户成功
          if (response.data.status == 0) {
            this.$Message.success(response.data.message);
          }
          // console.log(response)
        });
    },
    // 点击添加购物车按钮
    addCart() {
      // 获取购物车按钮的起始位置
      let cartOffset = $(".add").offset();
      // 获取右上角有购物车字体的附近位置（消失）
      let targetOffset = $(".icon-cart").offset();
      // console.log(cartOffset)
      // console.log(targetOffset)

      $(".addCartPic")
        .stop()
        .show()
        .offset(cartOffset)
        .addClass("move")
        .animate(targetOffset, 1000, function() {
          $(this)
            .hide()
            .removeClass("move");
        });

      // 提交载荷
      // this.$store.commit为固定的语法 commit是Vuex.Store 实例方法
      this.$store.commit("addgoods", {
        goodID: this.productID,
        goodNum: this.buycount
      });
    }
  },
  created() {
    // 渲染页面主内容
    this.getMaincontent();

    //   渲染评论
    this.getComment();
  },
  watch: {
    //   检测路由发送改变时
    $route(value, oldvalue) {
      // console.log(value)
      // console.log(oldvalue)
      // 重新调用接口 获取数据 渲染页面
      // 回调函数中重新复制 再次 生成
      // 渲染页面主内容
      this.getMaincontent();

      // 人为让他 强制生成 v-if 数组长度
      //   数组长度为0 直接销毁
      // 因为网络存在延迟，所以一开始并没有数据
      this.images.normal_size = [];
    }
  }
};
</script>

<style lang="less">
.tab-content img {
  width: 100%;
  display: block;
}

/* 放大镜相关样式 */
.pic-box {
  width: 395px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    text-align: center;
    display: flex;
    /* // 主轴 */
    justify-content: center;
    /* // 纵轴 副轴 侧轴 */
    align-items: center;
  }
}

// 点击添加到购物车时的移动小图片
.addCartPic {
  position: absolute;

  width: 50px;
  //默认隐藏
  display: none;
}
.addCartPic.move {
  transform: scale(0.5) rotate(720deg);

  transition: transform 1s, opacity 1s;
  opacity: 0.5;
}
</style>




