// utils文件夹：里面一般封装一些常用的功能模块
import { v4 as uuidv4 } from 'uuid'

// 生成随机的字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    // 先从本地存储获取uuid（本地存储里面是否存在uuid）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
        // 如果本地存储里面没有，则生成uuid
    if (!uuid_token) {
        // 生成uuid
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}