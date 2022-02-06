//引入mockjs
import Mock from 'mockjs'
//模拟数据引入进来（JSON）// json 和 图片默认对外暴露
import banner from './banner.json'
import floor from './floor.json'


//mock数据:参数1：参数请求地址  参数2：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })