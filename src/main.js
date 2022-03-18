import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {router} from "./router/index.js"
import './static/styles/common.scss' // 公共css
import request from "@/static/js/http.js"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { ElMessage } from 'element-plus'
// import * as Icons from "@element-plus/icons-vue";
// import JsonExcel from 'vue-json-excel'
import BaiduMap from 'vue-baidu-map'

NProgress.configure({
  easing: 'ease', // 动画方式    
  speed: 500, // 递增进度条的速度    
  showSpinner: true, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, _from, next) => {
    NProgress.start();
    next()
    const whiteList = ['/login']
    if (localStorage.getItem("token") || whiteList.indexOf(to.path) !== -1) {
      // to.meta.title ? (changeTitle(to.meta.title)) : ""; // 动态title
      next()
    } else {
        ElMessage('请登录')
      router.push({path:'/login'})
      // to.meta.title ? (changeTitle(to.meta.title)) : ""; // 动态title
    }
  });
  
  router.afterEach((to, _from) => {
    // const keepAliveComponentsName = store.getters['keepAlive/keepAliveComponentsName'] || []
    // const name = to.matched[to.matched.length - 1].components.default.name
    // if (to.meta && to.meta.cache && name && !keepAliveComponentsName.includes(name)) {
    //   store.commit('keepAlive/addKeepAliveComponentsName', name)
    // }
    NProgress.done();
  });

const app = createApp(App)
app.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'GXXggBiXGv8w9VP26y4b4D0swydwBxbS'
})
// app.component('downloadExcel', JsonExcel)

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
app.config.globalProperties.$http = request
app.use(router)
app.use(ElementPlus)
app.mount('#app')
