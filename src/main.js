import Vue from 'vue'

import App from './App.vue'

import VueRouter from 'vue-router'
// 引入首页路由
import Index from './components/01.index.vue'
// 引入产品详情页路由
import ProductDetail from './components/02.productDetail.vue'
// 引入购物车页面
import Shopcar from './components/03.shopcar.vue'
// 引入登录页面
import Login from './components/04.login.vue'
// 引入下单页面
import Order from './components/05.order.vue'
// 引入订单详情页
import OrderDetail from './components/06.orderDetail.vue'


// 格式化时间插件
import moment from 'moment'

// 轮播图插件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 懒加载
import VueLazyLoad from "vue-lazyload";
//iView插件
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// 放大镜
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// 设置全局的axios,挂在在Vue原型中。之后的使用可以直接this.axios
import axios from "axios";
Vue.prototype.$axios = axios;
// 设置基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';


// 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。
// Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // state 是 Vuex.Store 实例属性 用于存储数据，为只读的。通俗说法叫state为仓库
  state: {
    // count: 1,
    //用于存储购物车数据
    // cartGood: {
    //   // id等于goodsInfo.goodID
    //   // id：num
    // },
    // 尝试读取数据 有使用读取的数据 没有 使用 空对象 [Object object]
    cartGood: JSON.parse(window.localStorage.getItem('goodsKey')) || {}


  },

  mutations: {
    // 暴露修改的方法
    // increment (state,n) {
    //   // 变更状态
    //   state.count+=n
    // }
    // 购物车添加商品。
    // goodsInfo{
    //   goodID:
    //   goodNum:
    // }
    addgoods(state, goodsInfo) {

      // console.log('这是state', state)
      // console.log('这是goodsInfo', goodsInfo)

      // 判断是否已有数据存在,可以根据goodID对应的数量（数据）判断这个商品是否已经存在了
      if (state.cartGood[goodsInfo.goodID] == undefined) {

        // Mutation 需遵守 Vue 的响应规则
        // 当需要在对象上添加新属性时，你应该
        // 使用 Vue.set(obj, 'newProp', 123)
        // 进行存储后的cartGood的结构为 id：Num
        Vue.set(state.cartGood, goodsInfo.goodID, goodsInfo.goodNum)

      } else {


        // 传过来的id 已经存在 累加 
        // [goodsInfo.goodID]先运算,并且会作为一个键,state.cartGood[键]值（这个值就是num）\
        // state.cartGood[goodsInfo.goodID]是原来的数据（数量）
        // goodsInfo.goodNum 是后来新增过来的数据（数量）
        state.cartGood[goodsInfo.goodID] = state.cartGood[goodsInfo.goodID] + goodsInfo.goodNum;

        //  state.cartGood

      }

    },

    // 额外的增加一个修改的方法
    // 逻辑是 直接把传入的 数量 替换掉 默认的数量
    // 格式约定 格式{goodId:商品id,goodNum:数量}
    updataGoodsNum(state, goodsInfo) {
      state.cartGood[goodsInfo.goodID] = goodsInfo.goodNum
    },
    // 额外的增加一个删除的方法
    // goodId就是 商品的id
    // 如何删除对象中的属性
    // delete 删除对象中的属性
    // delete state.cartDate[goodId];
    // delete 删除的属性不会触发视图更新
    // 需要调用Vue.delete方法才可以
    deletGoods(state, goodID) {
      Vue.delete(state.cartGood,goodID)
    },


  },
  // 计算
  getters: {
    // ...
    // 计算商品的总数量
    goodsCount: state => {

      let num = 0;

      for (const key in state.cartGood) {

        num = num + state.cartGood[key]

      }

      return num

    }
  }



})




// 懒加载
Vue.use(VueLazyLoad, {
  error: "./img/404.jpg",
  loading: require('./img/GTR.jpg')
});
// 轮播图插件
Vue.use(ElementUI);
//运用路由
Vue.use(VueRouter)
// 提示
// Vue.config.productionTip = false

//iView插件
Vue.use(iView);

// 设置全局过滤器
Vue.filter('dateStyle', function (value) {

  return moment(value).format("YYYY年MM月DD日");
  //   return moment(value).format('MM月DD日YYYY年')
})
Vue.filter('dateCommentStyle', function (value) {

  return moment(value).format("YYYY年MM月DD日 h:mma");
  //   return moment(value).format('MM月DD日YYYY年')
})

// 浏览器页面关闭(刷新时)保存到localStorage中
// window.localStorage.setItem('goodsKey',JSON.stringify(cartGood))
window.onbeforeunload = function () {

  window.localStorage.setItem('goodsKey', JSON.stringify(store.state.cartGood))

}




// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  // 设置默认主页
  {
    path: '/',
    // 解析到/ 直接修改路由地址为/index
    redirect: '/index'
  },
  // 设置首页
  { path: '/index', component: Index },
  // 点击进入产品详情页
  // /productDetail/:id,注意/:id写法
  { path: '/productDetail/:id', component: ProductDetail },
  //设置购物车页面
  { path: '/shopcar/', component: Shopcar },
  // 设置登录页面Login
  { path: '/login/', component: Login },
  // 设置下订单页面
  { path: '/order/', component: Order },
  // 设置订单详情页
  { path: '/orderDetail/', component: OrderDetail },

]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

new Vue({
  render: h => h(App),
  router,
  // 仓库对象，属性的名字叫store
  store

}).$mount('#app')
// 此处的#app在public中的index.html中调用


