<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- floor组件没有发请求 是home组件发的请求 -->
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
  name: "Home",
  components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
  mounted() {
    // 获取floor组件的数据
    this.$store.dispatch('home/getFloorList')
    // 登录成功 获取用户信息
    this.$store.dispatch('user/getUserInfo')
  },
  computed:{
    ...mapState('home',['floorList'])
  }
};
</script>

<style>
</style>