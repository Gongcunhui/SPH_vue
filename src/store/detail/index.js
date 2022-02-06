import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const actions = {
    // 获取产品信息的action
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async AddOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
            // 当前这个AddOrUpdateShopCart函数 返回一个Promise
        if (result.code == 200) {
            // 代表服务器加入购物车成功
            return 'ok' //返回一个成功的promise
        } else {
            return Promise.reject(new Error('faile')) //返回一个失败的promise
        }
    }
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const state = {
    goodsInfo: {},
    // 游客的临时身份
    uuid_token: getUUID()
}
const getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }

}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}