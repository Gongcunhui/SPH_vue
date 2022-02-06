import { reqGetSearchInfo } from '@/api'
// search的仓库
const actions = {
    async getSearchInfo({ commit }, params = {}) {
        // params至少得是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHINFO', result.data)
        }
    }
}
const mutations = {
    GETSEARCHINFO(state, searchList) {
        state.searchList = searchList
    }
}
const state = {
    searchList: {}
}
const getters = {
    // 简化数据
    goodsList(state) {
        // 这里searchList可能是空对象 会导致goodsList是undefined 后面遍历会报错 所以加上  []
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    total(state) {
        return state.searchList.total
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}