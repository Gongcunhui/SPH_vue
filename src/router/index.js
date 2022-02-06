// 配置路由的文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 先保存一份push replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push和raplace
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    }
    originPush.call(this, location, () => {}, () => {})

}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    }
    originReplace.call(this, location, () => {}, () => {})
}



// 引入一级路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import Paysuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 引入二级路由
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
// 引入store 
import store from '@/store'

// 配置路由器
let router = new VueRouter({
    // 配置路由
    routes: [{
            name: 'home',
            path: '/home',
            component: Home,
            // isShow:是否展示footer组件
            meta: { isShow: true }
        }, {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            meta: { isShow: true },
            // props: { a: 100, b: 200 }
            // props: true
            // props($route) {
            //     return { keyWord: $route.params.keyWord, k: $route.query.k }
            // }
        }, {
            name: "login",
            path: '/login',
            component: Login
        }, {
            path: '/register',
            component: Register
        },
        //路由重定向，在项目跑起来的时候，访问/ 时 ，立马跳转到home页
        // path: '/',
        // redirect: '/home'
        {
            name: 'detail',
            path: '/detail/:id',
            component: Detail,
            meta: { isShow: true }
        },
        {
            name: 'addcartsuccess',
            path: '/addcartsuccess',
            component: AddCartSuccess,
            meta: { isShow: true }
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: ShopCart,
            meta: { isShow: true }
        }, {
            name: 'trade',
            path: '/trade',
            component: Trade,
            meta: { isShow: true }
        }, {
            name: 'pay',
            path: "/pay",
            component: Pay,
            meta: { isShow: true }
        }, {
            name: "paysuccess",
            path: '/paysuccess',
            component: Paysuccess,
            meta: { isShow: true }
        }, {
            name: 'center',
            path: '/center',
            redirect: '/center/myorder', //重定向
            component: Center,
            meta: { isShow: true },
            children: [{
                name: 'myorder',
                path: 'myorder',
                component: myOrder,

            }, {
                name: 'grouporder',
                path: 'grouporder',
                component: groupOrder,

            }]
        }
    ],
    // 每次路由跳转的时候 滚动条置顶
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})


// 导航守卫  : 全局前置守卫
router.beforeEach((to, from, next) => {
    // to：跳转到哪一个的组件实例  // from：从哪里来  // next：放行函数
    let token = store.state.user.token
    if (token) {
        // 用户登录后 就会有token ,此时不能跳转到login组件
        if (to.name == 'login') {
            next("/home") //停留在首页
        } else {
            next()
            store.dispatch('user/getUserInfo') //获取用户信息
        }
    } else {
        next()
    }
})

export default router