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
// 引入支付成功页面
import paySuccess from './components/07.paysuccess.vue'
// 引入会员中心页
import vipCenter from './components/08.vipcenter.vue'
// 引入会员中心交易列表页
import dealList from './components/09.deallist.vue'
// 引入会员中心查看列表页
import watchList from './components/10.watchlist.vue'


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
// 往Vue的原型中添加axios
Vue.prototype.$axios = axios;
// 设置基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//让ajax携带cookie
// 登录以后再发送的请求头部并没有携带登录后设置的cookie，导致后台无法校验其是否登录。
// 检查发现是vue项目中使用axios发送ajax请求导致的。
axios.defaults.withCredentials = true;


// 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。
// Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效（动态）更新。
import Vuex from 'vuex'

Vue.use(Vuex)
// 实例化这个仓库
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
    cartGood: JSON.parse(window.localStorage.getItem('goodsKey')) || {},

    // 登录状态改变，默认为不登录状态
    isShow: false,

    // 记录上一页，搭配路由守卫中的from使用
    pageFrom:'',
  },
// Vuex中的方法储存库
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
    // 新增商品
    addgoods(state, goodsInfo) {

      // console.log('这是state', state)
      // console.log('这是goodsInfo', goodsInfo)

      // 判断是否已有数据存在,可以根据goodID对应的数量（数据）判断这个商品是否已经存在了
      if (state.cartGood[goodsInfo.goodID] == undefined) {

        // Mutation 需遵守 Vue 的响应规则
        // 当需要在对象上添加新属性时，你应该
        // 使用 Vue.set(obj, 'newProp', 123)  Vue.set(对象，对象的键，对象的值)
        // 进行存储后的cartGood的结构为 id：Num ?????
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
    // 修改商品
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
    // 删除商品
    deletGoods(state, goodID) {
      Vue.delete(state.cartGood, goodID)
    },
    // 登录状态改变
    changeLoginStatus(state, type) {
      state.isShow=type
    },
    // 保存上一页的路径
    saveFromPath(state,fromPath){
      state.pageFrom=fromPath
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
  { path: '/order/:ids', component: Order },
  // 设置订单详情页
  { path: '/orderDetail/:ids', component: OrderDetail },
  // 设置支付成功页面
  { path: '/paysuccess/', component: paySuccess },
  // 设置会员中心页
  { path: '/vipcenter/', component: vipCenter },
  // 设置会员中心交易列表页
  { path: '/deallist/', component: dealList },
  // 设置会员中心查看列表页
  { path: '/watchlist/', component: watchList },

]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})




// 设置导航卫士，防止直接通过地址跳转进来
router.beforeEach((to, from, next) => {
  // ...
  // 即将要进入的目标 路由对象
  // console.log('to',to)
  // 当前导航正要离开的路由
  // console.log('from',from)

  // 保存一个from,可以跳转回去之前的那一页
  // 如果访问的是 order页面 判断登陆 
  // 每次过来都保存一下来时的地址
  // 提交载荷 保存数据

  // this.$store.state.pageFrom=from  这种方法可以存储但是没有办法及时动态更新页面中的数据
  // 以下方法可以时时更新数据
  // from中有path的属性
  store.commit('saveFromPath',from.path)

  // 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  // 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  // next()

  //如果当前是跳转到order页面 ，则发送登录状态请求进行判断
  // console.log(123)
  if (to.path.indexOf('/order') != -1) {

    axios.get('site/account/islogin').then(response => {
      // console.log(response)
      if (response.data.code != 'nologin') {
        next()
      } else {
        next('/login')
      }


    })



  } else {

    next()

  }



})




// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

new Vue({
  render: h => h(App),
  router,
  // 仓库对象，属性的名字叫store
  store,

  beforeCreate() {
    axios.get('site/account/islogin').then(response => {

      if (response.data.code == 'logined') {

        store.state.isShow = true

      } else {


      }


    })
  }

}).$mount('#app')
// 此处的#app在public中的index.html中调用


