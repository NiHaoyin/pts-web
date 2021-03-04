import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import './assets/css/global.css'
// 跨域
import axios from 'axios'

// 挂载axios
Vue.prototype.$http = axios

// 设置访问根路径
axios.defaults.baseURL = "http://localhost:8081"
// 跨域让请求携带cookie
axios.defaults.withCredentials=false;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
