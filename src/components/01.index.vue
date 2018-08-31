<template>
     
     <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <!-- 循环遍历 catelist ，注意里面有双重遍历-->
                                <li v-for="(item, index) in catelist" :key="index">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(itemSon1, indexSon1) in item.subcates" :key="indexSon1">
                                                {{itemSon1.title}}
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd v-for="(itemSon2, index2) in item.subcates" :key="index2">
                                                <a href="/goods/43.html">{{itemSon2.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                         <el-carousel height="341px">
                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                <router-link :to="'/productDetail/'+item.id">
                                    <!-- <a href=""> -->
                                    <h3>{{ item.title }}</h3>
                                    <img :src="item.img_url" alt="">
                                    <!-- </a> -->
                              </router-link>
                            </el-carousel-item>
                          </el-carousel>
                      
                        <!-- <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <ul class="slides">
                                    <li class="" style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;">
                                        <a href="/goods.html">
                                            <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg" draggable="false">
                                        </a>
                                    </li>
                                    <li style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;" class="flex-active-slide">
                                        <a href="/goods.html">
                                            <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200314272543.jpg" draggable="false">
                                        </a>
                                    </li>
                                </ul>
                                <ol class="flex-control-nav flex-control-paging">
                                    <li>
                                        <a class="">1</a>
                                    </li>
                                    <li>
                                        <a class="flex-active">2</a>
                                    </li>
                                </ol>
                            </div>

                        </div> -->
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <!-- 循环遍历 toplist ，注意里面有使用到过滤器（管道符），以及其中加入了修改时间格式的-->
                            <li v-for="(item, index) in toplist" :key="index">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | dateStyle}}</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in getgoodsgroup">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="itemSon in item.level2catelist" :key="itemSon.subcateid">{{itemSon.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemSon in item.datas" :key="itemSon.artID">
                            <router-link :to="'/productDetail/'+itemSon.artID">
                            <!-- <a href="#/site/goodsinfo/87" class=""> -->
                                <div class="img-box">
                                    <img v-lazy="itemSon.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemSon.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemSon.sell_price}}</b>元</p>
                                    <p>
                                        <strong>{{itemSon.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemSon.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            <!-- </a> -->
                            </router-link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
        
    </div>

</template>

<script>
// import axios from "axios";


export default {
  // 为结构命名，可以随意命名
  name: "index",
  data() {
    return {
      // 左边的数据
      catelist: [],
      // 中间轮播图的数据
      sliderlist: [],
      //右边的数据
      toplist: [],

      //   详细商品数据
      getgoodsgroup: []
    };
  },
  created: function() {
    // `this` 指向 vm 实例
    this.$axios.get("site/goods/gettopdata/goods").then(response => {
      // console.log(response);
      this.catelist = response.data.message.catelist;
      this.sliderlist = response.data.message.sliderlist;
      this.toplist = response.data.message.toplist;
    });
    this.$axios.get("site/goods/getgoodsgroup").then(response => {
      // console.log(response)
      // console.log(response.data.message)
      this.getgoodsgroup = response.data.message;
    });
  }
};
</script>

<style>
.el-carousel__item  img {
  width: 100%;
  height: 100%;
}
</style>
