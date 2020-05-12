import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'
import { Form, FormItem, Input, Button, Message } from 'element-ui'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
