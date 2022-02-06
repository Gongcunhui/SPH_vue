import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
    addressInfo: [],
    orderInfo: {}
}
const mutations = {
    GETADDRESS(state, addressInfo) {
        state.addressInfo = addressInfo
    },
    GETORDER(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址信息
    async getAddress({ commit }) {
        let result = await reqAddressInfo()
            // console.log(result);
        if (result.code == 200) {
            commit('GETADDRESS', result.data)
        }
    },
    // 获取商品信息
    async getOrder({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('GETORDER', result.data)
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