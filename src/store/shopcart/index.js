import { reqCartList, reqDeleteCartList, reqUpdateChecked } from '@/api'

const actions = {
    // 获取购物车列表的数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某个产品
    async deleteCartList({ commit }, skuId) {
        let result = await reqDeleteCartList(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某个产品的选中状态
    async updateChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('falie'))
        }
    },
    // 删除选中的全部商品(调用上面的deleteCartList)
    deleteAllCheckedCart({ dispatch, getters }) {
        // 获取购物车的全部产品数据【数组】
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartList', item.skuId) : ''
            promiseAll.push(promise)
        });
        // 只有数组里面的promise全部为成功 最终的结果才为成功
        return Promise.all(promiseAll)
    },
    // 全选框的选中状态控制 单个多选框
    updateCartChecked({ dispatch, state }, isChecked) {
        // promise数组
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateChecked', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const state = {
    cartList: []
}
const getters = {
    cartList() {
        return state.cartList[0] || {}
    },
}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}