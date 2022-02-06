<template>
  <div>
    <Header></Header>
    <!-- 路由组件的出口 -->
    <router-view></router-view>
    <Footer v-if="isShow"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{Header,Footer},
  computed:{
    isShow(){
      return this.$route.meta.isShow
    }
  },
  mounted() {
    // 三级列表的数据 （全局组件的数据最好只向服务器发一次请求，所以放在app根组件）
    this.$store.dispatch("home/categoryList");
  },
}
</script>