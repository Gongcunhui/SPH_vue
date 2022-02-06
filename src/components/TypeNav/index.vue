<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派：子元素事件派给父元素执行-->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- @click="goSearch" ：a标签的跳转 委派 -->
        <transition name="sort">
          <div class="sort" @click="goSearch" v-show="show">
            <div class="all-sort-list2">
              <div
                class="item bo"
                :class="{ cur: currentIndex == index }"
                v-for="(c1, index) in categoryList.slice(0, 16)"
                :key="c1.categoryId"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//引入节流函数throttle
import throttle from "lodash/throttle";
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储一级目录索引
      currentIndex: -1,
      show: true,
    };
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  mounted() {
    // 如果是search组件，隐藏三级目录
    if (this.$route.name != "home") {
      this.show = false;
    }
  },
  methods: {
    // 鼠标进去 改变索引
    // changeIndex(index){
    //   // index:收集用户移到哪一个一级目录上
    //   this.currentIndex = index
    // },

    // 使用节流
    changeIndex: throttle(function (index) {
      // index:收集用户移到哪一个一级目录上
      this.currentIndex = index;
    }),

    // 鼠标移出隐藏三级目录
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.name != "home") {
        this.show = false;
      }
    },
    goSearch(event) {
      // this.$router.push('/search')
      //  最好的解决方法：编程式导航 + 事件委派
      //       存在问题1：事件委派，是把全部子节点【h3、dt、dl、em、a】的事件回调委派给父亲节点,那么怎么确定点击的是a？
      //       解决方法：把子节点中的a标签，添加一个自定义属性data-categoryname，其余节点是没有的【和h3、dt、dl、em区分开】

      //       存在问题2：即使确定点击的是a标签，怎么分辨出是1 2 3级目录的a标签？
      //       解决办法：给对应的123级目录的a标签分别添加自定义属性 category1Id   category2Id  category3Id

      //dataset是节点第一个属性，可以获取节点的自定义属性和属性值
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      if (categoryname) {
        // 存在categoryName就确定是a标签，但还需要区分是1 2 3级的a标签
        let location = {
          name: "search",
          query: { categoryName: categoryname },
        };
        if (category1id) {
          location.query.category1Id = category1id;
        } else if (category2id) {
          location.query.category2Id = category2id;
        } else if (category3id) {
          location.query.category3Id = category3id;
        }
        // 如果路由中含有params参数需要一起携带过去
          location.params = this.$route.params
          this.$router.push(location)
      }
    },
    // 鼠标进入展示三级目录
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画
    // 进入的起点、离开的终点
    .sort-enter,.sort-leave-to {
      height: 0;
    }
    // 进入的终点、离开的起点
    .sort-enter-to ,.sort-leave{
      height: 400px;
    }
    //进入、离开的过程
    .sort-enter-active,.sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>