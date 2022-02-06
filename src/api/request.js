// 对于axios的二次封装
import axios from 'axios'
// 引入进度条和进度条样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入store
import store from '@/store'
// 利用axios.create,去新建一个axios实例
const request = axios.create({
    //配置对象
    baseURL: '/api',
    timeout: 5000
})

// 配置请求拦截器
request.interceptors.request.use((config) => {
    // config：配置对象，里面的header请求头很重要
    // console.log(store);
    // 携带uuid临时身份给服务器（获取购物车数据需要）
    if (store.state.detail.uuid_token) {
        // 请求头添加一个字段（不能乱写）
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 携带token给服务器
    if (store.state.user.token) {
        // console.log(store.state.user.token);
        config.headers.token = store.state.user.token
    }
    nprogress.start()
    return config
}, error => {
    return Promise.reject(error)
})

// 配置响应拦截器
request.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}, error => {
    return Promise.reject(error)
})

export default request