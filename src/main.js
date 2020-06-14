import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'
import { Form, FormItem, Input, Button, Message, Container, Aside, Main, Header, Submenu, MenuItemGroup, MenuItem, Menu, Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Switch, Tooltip, Pagination, Dialog, MessageBox, Tag, Tree, Select, Option, Cascader, Alert, Tabs, TabPane, CheckboxGroup, Checkbox, Upload, Step, Steps } from 'element-ui'
import axios from 'axios'
import ZKTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor /* { default global options } */)

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// axios 请求拦截
axios.interceptors.request.use(config => {
  // 为请求头对象，添加 token 验证的 authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.use(ZKTable)
Vue.prototype.$http = axios

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(Step)
Vue.use(Steps)
Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.prototype.$confirm = MessageBox.confirm
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
