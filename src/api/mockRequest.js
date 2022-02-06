// 对于axios的二次封装
import axios from 'axios'
// 引入进度条和进度条样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 利用axios.create,去新建一个axios实例
const request = axios.create({
    //配置对象
    baseURL: '/mock',
    timeout: 5000
})

// 配置请求拦截器
request.interceptors.request.use((config) => {
    // config：配置对象，里面的header请求头很重要
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