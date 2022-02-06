import { reqGetCode, reqUserLogin, reqUserRegister, reqUserMessage, reqLogOut } from "@/api"
import { setToken } from '@/utils/token'
// 登录和注册的仓库
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
}
const mutations = {
    // 验证码
    GETCODE(state, code) {
        state.code = code
    },
    // token
    USERLOGIN(state, token) {
        state.token = token
    },
    // 登录用户的信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 退出登录 清除state数据
    CLEAR(state) {
        // 清除用户数据
        state.token = ''
        state.user = {}
            // 清除本都存储的token
        localStorage.removeItem('TOKEN')
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 这个接口是把验证码返回，但是正确的是，后台把验证码发到用户手机上面
        let result = await reqGetCode(phone)
            // console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
            // console.log(result);
            // 登录成功下发token，通过token向服务器要登录用户的信息
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
                // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserMessage()
            // console.log(result);
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
        }
    },
    // 退出登录
    async logOut({ commit }) {
        let result = await reqLogOut()
        if (result.code == 200) {
            // 清除数据
            commit("CLEAR")
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}