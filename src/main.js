import Vue from 'vue'
import App from './App.vue'
// 引入三级联动全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
    // element-ui
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由器
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mockServe.js----mock数据
import '@/mock/mockServe.js'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 引入全部接口函数
import * as API from '@/api'

new Vue({
    render: h => h(App),
    // 注册路由器
    router,
    // 注册仓库
    store,
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
            // console.log(API);
    },

}).$mount('#app')