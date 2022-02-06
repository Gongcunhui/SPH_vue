// 统一管理接口
import request from './request'
import mockRequest from './mockRequest'
// 获取三级列表数据 接口
export const reqCategoryList = () => request.get('/product/getBaseCategoryList')

//获取轮播图数据（mock）
export const reqGetBannerList = () => mockRequest.get('/banner')

// 获取floor数据（mock）
export const reqFloorList = () => mockRequest.get('/floor')

// 获取seatch模块的数据
/* 
参数示例：
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
} */
// 注意params至少得是空对象
export const reqGetSearchInfo = (params) => request({ url: '/list', method: 'POST', data: params })

// 获取产品详情接口
export const reqGoodsInfo = (skuId) => request.get('/item/' + skuId)

// 将产品添加到购物车 || 获取更新某个产品的个数的接口
//   /api/cart/checkCart/{skuID}/{isChecked}
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表的接口
export const reqCartList = () => request.get('/cart/cartList')

// 删除产品的接口
export const reqDeleteCartList = (skuId) => request.delete(`/cart/deleteCart/${skuId}`)

// 修改商品的选中状态
export const reqUpdateChecked = (skuId, isChecked) => request.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 获取验证码的接口
// /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => request.get(`/user/passport/sendCode/${phone}`)

// 注册的接口
// /api/user/passport/register
export const reqUserRegister = (data) => request({ url: '/user/passport/register', method: 'post', data })

// 登录的接口
// /api/user/passport/login
export const reqUserLogin = (data) => request({ url: '/user/passport/login', method: 'post', data })

// 获取用户信息
// /api/user/userAddress/auth/findUserAddressList
export const reqUserMessage = () => request.get('/user/userAddress/auth/findUserAddressList')

// 退出登录
// /api/user/passport/logout
export const reqLogOut = () => request.get('/user/passport/logout')

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => request.get('/user/userAddress/auth/findUserAddressList')

// 获取商品清单
// /api/order/auth/trade
export const reqOrderInfo = () => request.get('/order/auth/trade')

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqCommitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })

// 获取支付信息
// /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => request.get(`/payment/weixin/createNative/${orderId}`)

// 获取支付订单的状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => request.get(`/payment/weixin/queryPayStatus/${orderId}`)

// 获取我的订单 接口
// /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => request.get(`/order/auth/${page}/${limit}`)