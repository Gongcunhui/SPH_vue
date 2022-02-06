<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 没有用户名：未登录 -->
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航：只是跳过去，不做其他的业务逻辑  必须要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 有用户名：登陆成功 -->
           <p v-else>
             <a>{{userName}}</a>
             <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge" 
            v-model="keyword"          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goToSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
// console.log(_);
export default {
    name:'Header',
    data() {
      return {
        keyword:''
      }
    },
    methods: {
      goToSearch(){
        // 跳转到search路由
        // 对象写法
        // 如果有query 需要把query参数带过去
          this.$router.push({name:'search',params:{keyword:this.keyword || undefined},query:this.$route.query})
        // 面试题1：路由传参(对象方式)path是否可以结合params一起使用吗?  答：不能，路由跳转params只能和name属性一起使用
        // this.$router.push({path:'/search',params:{keyWord:this.keyWord}})

        // 面试题2：如何指定params参数可传可不传？ 答：占位符后面加一个？
        // this.$router.push({name:'search',params:{keyWord:this.keyWord},query:{k:this.keyWord}})

        // 面试题3：params参数可以传递也可以不传递，但是如果传递的是空串，如何解决？
        //  答：  params:{keyWord:'' || undefined},
       // this.$router.push({name:'search',params:{keyWord:'' || undefined},query:{k:this.keyWord}})
      },
      // 清空input关键字
      removeKeyword(){
        this.keyword = ''
      },
      // 退出登录
      async logout(){
        // 需要发请求，通知服务器退出登录（清楚一些数据：token、userInfo）
        try {
          await this.$store.dispatch('user/logOut')
          // 退出成功 回到首页
          this.$router.push('/home')
        } catch (error) {
          alert(error.message)
        }
      }
    },
    mounted() {
      // 通过全局事件总线清除input关键字
      this.$bus.$on('removeKeyword',this.removeKeyword)
      // console.log(this.$store.state.userInfo.id);
    },
    computed:{
      userInfo(){
        return this.$store.state.user.userInfo[0] || {}
      },
      userName(){
        return this.userInfo.id
      }
    }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>