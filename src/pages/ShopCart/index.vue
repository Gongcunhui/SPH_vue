<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="changeChecked(cart.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}.00</span>
          </li>
          <!-- 修改产品个数 -->
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
          </li>
          <!-- 删除产品 -->
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked&&cartInfoList.length > 0"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入节流函数throttle
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("shopcart", ["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算商品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.cartPrice * item.skuNum;
      });
      return sum;
    },
    // 全选框是否勾选
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    // 派发action捞取数据
    getData() {
      this.$store.dispatch("shopcart/getCartList");
    },
    // 修改产品个数(后再次发请求)【需添加节流】
    handler: throttle(async function (type, num, cart) {
      // type: 区分这三个元素
      // num：变化量 +（1）-（-1） input最终的个数（不是变化量）
      // cart:  区分哪一个产品（cart.spuId）
      // 整理参数 向服务器发请求 修改产品数量
      switch (type) {
        case "add":
          // +
          num = 1;
          break;
        case "minus":
          // - 产品个数需要大于1
          num = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 输入非法 或 个数小于1
          if (isNaN(num) || num < 1) {
            num = 0;
          } else {
            num = parseInt(num) - cart.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("detail/AddOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: num,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
    // 删除产品的回调
    async deleteCart(skuId) {
      try {
        // 修改服务器的数据（删除一些数据）
        await this.$store.dispatch("shopcart/deleteCartList", skuId);
        //  重新发请求展示数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改产品的选中状态
    async changeChecked(skuId, event) {
      let isChecked = event.target.checked ? "1" : "0";
      try {
        //  发请求---修改服务器中的产品选中状态
        await this.$store.dispatch("shopcart/updateChecked", {
          skuId,
          isChecked,
        });
        //  修改成功---重新展示购物车的数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除全部选中的商品
    async deleteAllCheckedCart() {
      try {
        //  发请求 修改服务器的数据（删除）
        await this.$store.dispatch("shopcart/deleteAllCheckedCart");
        //  重新展示购物车数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 全选框的选中状态
    async updateAllCartChecked(event) {
      try {
        let checked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("shopcart/updateCartChecked", checked);
        // 重新展示数据
        this.getData();
      } catch (error) {
        alert(error.message)
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .item-txt {
          text-align: center;
        }
      }

      .cart-list-con4 {
        width: 10%;
      }

      .cart-list-con5 {
        width: 17%;

        .mins {
          border: 1px solid #ddd;
          border-right: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }

        input {
          border: 1px solid #ddd;
          width: 40px;
          height: 33px;
          float: left;
          text-align: center;
          font-size: 14px;
        }

        .plus {
          border: 1px solid #ddd;
          border-left: 0;
          float: left;
          color: #666;
          width: 6px;
          text-align: center;
          padding: 8px;
        }
      }

      .cart-list-con6 {
        width: 10%;

        .sum {
          font-size: 16px;
        }
      }

      .cart-list-con7 {
        width: 13%;

        a {
          color: #666;
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
  