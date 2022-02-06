// home的仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
const actions = {
    // 三级目录数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
            // console.log(result);
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    // 首页轮播图数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    // 获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const state = {
    // state中的数据 初始值不能瞎写（根据服务器返回的数据类型）
    categoryList: [],
    bannerList: [],
    floorList: []
}
const getters = {}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}