import Vue from 'vue'

import App from './App.vue'

import VueRouter from 'vue-router'
// 首页路由
import Index from './components/01.index.vue'
// 产品详情页路由
import ProductDetail from './components/02.productDetail.vue'

// 格式化时间插件
import moment from 'moment' 

// 轮播图插件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 懒加载
import VueLazyLoad from "vue-lazyload";
Vue.use(VueLazyLoad, {
  error: "./img/404.jpg",
  loading:require('./img/GTR.jpg')
});
 // 轮播图插件
Vue.use(ElementUI);
//运用路由
Vue.use(VueRouter)
// 提示
// Vue.config.productionTip = false

// 设置全局过滤器
Vue.filter('dateStyle', function (value) {

      return moment(value).format("YYYY年MM月DD日");
      //   return moment(value).format('MM月DD日YYYY年')
})




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
  // 引入首页
  { path: '/index', component: Index },
  // 点击进入产品详情页
  // /productDetail/:id,注意/:id写法
  { path: '/productDetail/:id', component: ProductDetail },

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
  router
}).$mount('#app')
// 此处的#app在public中的index.html中调用


