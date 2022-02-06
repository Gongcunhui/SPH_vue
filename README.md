# part1
## 1： vue-cli脚手架初始化项目
node + webpack +淘宝镜像

node_modules文件夹：项目依赖文件夹
public文件夹：一般放一些静态资源（图片），需要注意，放在public文件夹中的静态资源，webpack进行打包的时候，会原封不动的打包到dist文件夹中。

src文件夹（程序员源代码文件夹）：
    assets文件夹：一般也是放一些静态资源（一般放置多个组件共用的资源），需要注意，放在assets文件夹的资源，在webpack打包的时候，webpack会把静态资源当成一个模块，打包js文件里面。

    components文件夹：一般放置的是非路由组件（全局组件）
    App.vue：唯一根组件
    main.js:程序入口文件，也是整个程序最先执行的文件

bable.config.js：配置文件（bable相关）

package.json：被认为是项目的`身份证`，记录项目叫什么，项目中有哪些依赖，项目怎么运行。

package-lock.json：缓存性文件

README.md：说明性文件（笔记）

## 2 项目的其他配置：
        一.项目运行起来的时候浏览器自动打开
           ----package.json文件中 ：vue-cli-service serve --open
             "scripts": {
                "serve": "vue-cli-service serve --open",
                "build": "vue-cli-service build",
                "lint": "vue-cli-service lint"
            }

        二.eslint校验功能关闭。
            ---在根目录下，创建一个vue.config.js文件
            比如：声明变量没有赋值，但没有使用eslint进行报错
        
        三.src文件夹的简写方法，配置别名：@
            jsconfig.js配置别名@提示【@代表的是src文件，这样将来文件过多，找的时候比较方便】
            {
                "compilerOptions":{
                    "baseUrl":"./",
                    "path":{
                        "@/*":["src/*"]
                    }
                },
                "exclude":["node-modules","dist"]
            }

## 3 项目路由的分析
    vue-router
    前端所谓的路由：kv键值对
    key：URL
    value：相应的组件
    注意：项目上中下结构

    路由组件：
    Home首页路由组件、Search路由组件、login登录路由组件、Register注册路由组件
    非路由组件：
    Header组件【首页、搜索页】
    Footer组件【首页、搜索页】，但在登录和注册页没有

## 4 完成非路由组件Header与Footer业务
    在尚品汇项目中，不以HTML+CSS为主，主要搞逻辑、业务
    在开发项目的时候:
    1：书写静态页面
    2：拆分组件
    3：获取服务器的数据动态展示
    4：完成相应的动态业务逻辑

## 5 路由组件的搭建
    components文件夹：放非路由组件的文件（公用的全局组件）
    pages或views文件：放路由组件

    5.1配置路由：项目中经常将配置的路由放在router文件中

    5.2总结
        路由组件与非路由组件的区别：
            1.放置位置不同
            2.使用方式的不同：路由组件一般需要在router文件中注册，使用是<router-view>，非路由组件在使用的时候以标签的形式使用
            3.在main.js中注册router后，不管是非路由组件，还是路由组件身上都添加了$route、$router
    
    $route和$router的区别：
        $route:一般获取路由信息【包括路径、query参数、params参数等】   
        $router:一般进行编程式导航进行路由跳转【push|replace】

    5.3路由的跳转
        路由的跳转有2种形式：1、声明式导航router-link
                           2、编程式路由导航push|replace。
        编程式路由导航：声明式能够做的，编程式导航都能做，但是编程式导航除了可以进行路由跳转，还能做一些其他的业务逻辑

## 6 Footer组件的显示与隐藏
显示或者隐藏组件：v-show | v-if
Footer组件：在home、search显示footer组件，在login、register时隐藏
        6.1我们可以根据组件上的$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏
        6.2配置路由的时候，可以给路由添加路由元信息【meta】，路由需要配置对象，key不能乱写

## 7 路由传参
7.1路由跳转有几种方式？
    1声明式导航：router-link（必须要有to属性），可以实现路由的跳转
    2编程式导航（字符串、模板字符串、对象方式）：利用的是组件实例的$router.push | $router.replace方法，可以实现路由跳转，也可以实现一些其他的业务逻辑
7.2 路由传参，参数有几种写法？
    params参数：属于路径的一部分，注意在配置路由的时候，params需要占位
    query参数：不属于路径的一部分，类似与ajax的queryString  /xxx?k=v&k=v

## 8 路由传参相关面试题总结
### 面试题1：路由传参(对象方式)path是否可以结合params一起使用吗?
    答：不行，跳转路由传参的时候，对象的写法可以是path、name的形式，但需要注意的是path不能和params参数一起用

### 面试题2：如何指定params参数可传可不传？
    答：在配置路由的时候，在占位符后面加上一个？，来表示params可传可不传  path: "/search/:keyword?"
    解析：如果路由要求传递params参数，但是你不传递params参数，会出现url错误的情况
            错误的url：http://localhost:8080/#/?k=A
            正确的url：http://localhost:8080/#/search?k=

### 面试题3：params参数可以传递也可以不传递，但是如果传递的是空串，如何解决？
    答：使用undefined解决{params:{keyword:''||undefined}，此时如果传递的是空串也不会出现url错误
    解析：如果你传递params参数为空串，会出现url错误的情况

### 面试题4：路由组件能不能传递props数据？
       答：路由的props配置3种形式：
                一、值为对象，该对象的k-v都会以props的形式传递给当前路由组件 ，缺点是 死数据
                 props: { a: 1, b: 2 },

                二、值为布尔值，若布尔值为真，就会把组件收到的params参数传递给组件,缺点是只能传递params参数
                props: true,

                三、值为函数，该函数返回的对象中每一组key-value都通过props传递给该路由组件
                props($route) {
                    return { id: $route.params.id, title: $route.params.id }
                },  

# part2
## 重写push和replace
1:编程式路由跳转到当前路由(参数不变)，多次执行会抛出Navigat ionDuplicated的警告错误?
--路由跳转有两种形式:声明式导航、编程式导航
--声明式导航没有这类问题的，因为vue-router底层已经处理好了

1.1为什么编程式导航进行路由跳转的时候，就有这种警告错误那?
  答：最新的vue-router引入promise，即执行push或replace返回一个promise对象

1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决。
this.$router.push({name:"search"},()=>{},()=>{});
这种写法:治标不治本，将来在别的组件当中push|replace,编程式导航还是有类似错误。

1.3重写push和replace
    // 先保存一份push replace
    let originPush = VueRouter.prototype.push;
    let originReplace = VueRouter.prototype.replace;
    // 重写push和raplace
    VueRouter.prototype.push = function(location, resolve, reject) {
        if (resolve && reject) {
            originPush.call(this, location, resolve, reject)
        }
        originPush.call(this, location, () => {}, () => {})
    }
    VueRouter.prototype.replace = function(location, resolve, reject) {
        if (resolve && reject) {
            originReplace.call(this, location, resolve, reject)
        }
        originReplace.call(this, location, () => {}, () => {})
    }:编程式路由跳转到当前路由(参数不变)，多次执行会抛出Navigat ionDuplicated的警告错误?
--路由跳转有两种形式:声明式导航、编程式导航
--声明式导航没有这类问题的，因为vue-router底层已经处理好了

1.1为什么编程式导航进行路由跳转的时候(多次执行跳转)，就有警告错误?
"vue - router": "^3.5.3": 最新的vue-router引入promise，即执行push或replace返回一个promise对象

1.2通过给push或replace方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决。

1.3通过底部的代码，可以实现解决错误
this.$router.push({name:"search",params:{keyword:this.keyword},query:{k: this. keyword . toUpperCase()}},()=>{},()=>{});
这种写法:治标不治本，将来在别的组件当中push|replace,编程式导航还是有类似错误。

## 2 静态页面拆分

## 3 三级联动组件完成（全局组件）
----Home、search、detail都存在 ，这样的组件可以作为全局组件注册
好处：只需要注册一次，可以在项目任意地方使用

## 4 完成其他静态组件
HTML + CSS + 图片资源-----信息【结构、样式、图片资源】

## 5 postman测试接口
--如果服务器返回的数据code字段是200，表示服务器返回数据成功
--整个项目，接口前缀都有/api字样

## 6 axios的二次封装
发请求：XMLHttpRequest、fetch、JQ、axios
6.1为啥需要二次封装axios？
请求拦截器、相应拦截器：请求拦截器，可以在发请求之前处理一些业务、相应拦截器：当服务器数据返回以后可以处理一些事情

6.2在项目中经常用api文件夹【配置axios】
接口中：路径都带有/api
baseURL:"/api"

6.3 axios可以使用git和npm关于axios的文档

## 7 接口统一管理

项目小：完全可以在组件的生命周期钩子中发请求
项目大：axios.get(xxx)

7.1跨域问题：协议、域名、端口号不同的请求，称为跨域
http://localhost:8080/#/home  ---前端本地服务器
http://39.98.123.211          ---后台服务器

解决跨域的方法：JSONP、CROS、代理

## 8 nprogress进度条的使用

nprogress.start():进度条开始
nprogress.done()：进度条结束
可以修改进度条的样式

## 9 vuex
### 9.1vuex是什么？
    --vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据
    --项目小，一般不需要使用vuex，项目大组件多，数据复杂，才会用vuex

### 9.2 vuex的基本使用
        actions:处理action，可以处理一些其他的业务逻辑和网络请求，也可以处理异步（可省略）
        mutations：修改state数据的唯一手段
        state：仓库存储数据的地方
        getters：可以理解为vuex里面的计算属性，用于简化仓库数据，让组件获取数据更加的方便
        modules: vuex模块化
        
### 9.3 vuex实现模块式开发
--将大仓库分成多个小仓库：每个组件对应自己的store

## 10 完成TypeNav三级联动展示数据业务

# part3
## 1 鼠标移入移出修改背景颜色
---1：css
---2： :class="{ cur: currentIndex == index? 'cur':'' }"

## 2 通过js控制23级商品分类的显示与隐藏
---1：通过css的  display：none | block
---2：通过js的   style="{display:currentIndex == index?'block':'none'}

## 3 演示卡顿现象
正常：事件触发非常频繁，而且每一次的触发，回调函数都要出执行
    （如果时间很短，而且回调函数内部有计算，那么很有可能出现浏览器卡顿）
节流：在规定间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会出发回调，把频繁出发变为少量触发
防抖：前面所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次

## 4 节流与防抖
节流：在规定间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会出发回调，把频繁出发变为少量触发
防抖：前面所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次

## 5 三级联动节流

## 6 三级联动路由跳转分析
    三级联动用户可以点击的：一级目录、二级目录、三级目录，当用户点击的时候home跳转到search，会把用户点击的哪一个目录的
    categoryName和categoryId传递过去

    跳转方法：声明式导航 和 编程时导航
    声明式导航的缺点：返回数据后 v-for创建了许许多多的router-link此时跳转会出现卡顿现象
    编程式导航缺点：每个目录的a标签都需要绑定一个事件回调，性能不好 

     最好的解决方法：编程式导航 + 事件委派
          存在问题1：事件委派，是把全部子节点【h3、dt、dl、em、a】的事件回调委派给父亲节点,那么怎么确定点击的是a？
          解决方法：把子节点中的a标签，添加一个自定义属性data-categoryname，其余节点是没有的【和h3、dt、dl、em区分开】

          存在问题2：即使确定点击的是a标签，怎么分辨出是1 2 3级目录的a标签？
          解决办法：给对应的123级目录的a标签分别添加自定义属性 category1Id   category2Id  category3Id
 
      goSearch(event) {
          //dataset是节点第一个属性，可以获取节点的自定义属性和属性值
          let { categoryname, category1id, category2id, category3id } = event.target.dataset;
          if (categoryname) {
            // 存在categoryName就确定是a标签，但还需要区分是1 2 3级的a标签
            let location = {name:"search",query:{categoryName:categoryname}}
            if (category1id) {
              location.query.category1Id = category1id
            } else if (category2id) {
            location.query.category2Id = category2id
            } else if (category3id) {
              location.query.category3Id = category3id
            }
            this.$router.push(location)
          }
        },

## 复习
1：商品分类的三级列表由静态列表变为动态列表【获取服务器的数据：解决跨域问题】
2：函数的防抖与节流【面试很重要】
3：路由跳转：声明式导航（router-link）、编程式导航【this.$router.push() || this.$router.replace()】
---编程式导航的问题【怎么确定点的哪一个具体哪级目录的a标签】
---解决：添加自定义属性


# part4
## 1 开发search模块的TypeNav(过渡动画效果)
---过渡动画前提：组件或元素 必须要有v-if v-show指令才能进行过渡

## 2 typeNav发请求的优化（全局组件，只发一次请求数据一直用）
---在app组件发请求就可以了【mounted只会执行一次】

## 3 合并params参数和query参数

## 4 开发home首页的ListContainer组件与Floor组件----mockjs模拟数据
【服务器没有他们的数据----使用mock数据 ，使用mockjs】
mock（模拟）数据：如果使用mock数据，需要使用mockjs插件

使用步骤：
  --1：在项目中src文件夹中创建一个mock文件夹
  --2：准备JSON数据（mock文件夹中创建相应的json文件）---json数据不能有空格（程序跑不起来）
  --3：把mock数据需要的图片放到public文件夹【打包后public会转为dist】
  --4：开始mock--创建mockServe文件，用mockjs实现模拟数据
  --5：mockServe.js在入口文件中引入（执行才能模拟数据）

//先引入mockjs
import Mock from 'mockjs'
//把json数据引入进来【json数据不需要暴露，即可引入】
//webpack默认对外暴露的：图片、json数据格式
import banner from './banner.json'
import floor from './floor.json'
//mock数据:参数1：请求地址  参数2：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })

## 5 Listcontainer的开发--轮播图
  swiper插件使用的步骤（经常用来制作轮播图）：
        1：导包（js和css）
        2：页面中结构必须要有
        3：new Swiper():添加交互效果

# 问题点：
1三级路由跳转分析（利用currentIndex == index添加加类名）

2push多次点击报错问题（重写push、replace）

3轮播图Swiper实例直接在mounted中书写不行？因为可能仓库的数据还未更改成功，结构还未完整（swiper要求结构完整）(解决：watch+nextTick)

4mockjs

5在自己的组件里面跳转自己可以实现清除url

6分页器

7在路由跳转的时候，路由之间传递数据时-
        ----简单数据通过params、query
        ----复杂数据通过（比如产品信息）：可使用会话存储sessionStorage

8发请求的时候，获取不到购物车的数据，因为服务器不知道你是谁？
    解决：在跳转到购物车模块时，带上uuid（生成随机id）临时游客身份

    // 生成随机的字符串，且每次执行 uuid不能发生变化，游客身份持久存储
    export const getUUID = () => {
    // 先从本地存储获取uuid（本地存储里面是否存在uuid）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
        // 如果本地存储里面没有，则生成uuid
    if (!uuid_token) {
        // 生成uuid
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
}

9 登录---登录成功的时候，后台为了区分你这个用户是谁-服务器发下发一个token（令牌：唯一标识）
  登录接口： 登录成功服务区下发token，前台持久化存储token，可以带着token找服务器要用户的信息

10 登录过后展示用用户名
 1.用户注册成功，用户名+密码登录，向服务器发请求，成功登陆后，获取到服务器下发的token，
     然后把token存储在user仓库中（非持久的），路由跳转到home首页
 2.跳到首页后，一挂载mounted  就派发action获取用户信息，header动态展示用户信息
 3.一刷新home首页，仓库的token就丢失了，所以用户信息就没有了 ，所以需要持久化的存储token
 4.本地持久化存储token
 5.存在问题1：token已经本地存储了，但需要派发请求捞用户信息，多个路由组件切换时都需要用户信息，假如在每个组件的mounted派发请求不行，太繁琐了
   存在问题2：用户已经登录了，就不能在进登录页了
# part5
## 1 完成轮播图效果的正确方法
---watch + nextTick
--watch：保证bannerList数据已经修改
--nextTick：保证根据已经修改的数据，生成了新的dom


$nextTick：在下次DOM更新 循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

正确做法：
 watch: {
    // 监听bannerList数据的变化：有空---变为有数据
    // nextTick:在下次DOM更新 循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
    bannerList: {
      handler(newVal,oldVal) {
        //这里只能保证数据有了，也得保证（v-for执行需要时间）html结构出来了【使用nextTick】
        this.$nextTick(() => {
            var mySwiper = new Swiper(".swiper-container", {
                ......
                ......
            });
        });
      },
    },
  },

## 2 开发floor组件
1：getFloorList这个action在哪里发？
---答：是需要在home组件当中触发的，因为floor组件在home组件中进行了复用(v-for)

2:v-for也可以在自定义组件上使用

3：组件通信方式有哪些？（面试很重要）
---1：props（传递数据） ：用于父传子
---2：props（传递函数） ：可以实现子传父
---3：自定义事件        ：@on、@emit，可以实现子传父
---4：全局事件总线 $bus      ：全能
---5:pubsub.js （vue中几乎不用）          :全能
---6：插槽  ：父子组件通信 ----（一般是结构）
---7：vuex   ：万能

## 3 把首页的轮播图拆分为一个共用的组件
记住：如果一个组件在很多的地方都使用，可以把它变为全局组件（放入到components）,注册一次，全局使用

## 4 search组件的开发
1：先静态页面 + 静态组件拆分出来
2：发请求（api）
3：vux（三连环）
4：组件获取仓库数据，动态展示数据

## 5 search页面不应该挂载时发一次请求  还需要路径发生改变时再次发送请求（watch监听$route可以实现）

## 6 组件内跳转到自身 可以请除url的参数（params、query）

# part6
## 1 排序操作(重点)
 ----1：综合 2：价格 升序：asc 降序：desc
  1：order属性的属性值有多种写法？
     答：4种，1：asc | desc  2：asc | desc
  2：综合和价格谁有类名？
     答：通过order属性值包含1还是包含2
  3：综合和价格谁有箭头？
     答：谁有类名谁就有箭头
  4:

## 2 分页
1：为什么需要分页？（轮播图，分页，日历很重要）
   ---如果数据很多（1万+），，就可以使用分页，可以减少服务器压力 
2：分页器展示，需要哪些数据（条件）？
   ---需要知道当前是第几页：pageNo字段代表当前页数
   ---需要知道每一页有多少条数据：pageSize
   ---分页器一共有多少条数据（可知道有多少页）：total  （total / pageSiz ==多少页）
   ---需要知道分页器连续页码数（continues：一般是 5 | 7

   pageNo：当前页数
   pageSize：代表每一页展示多少条数据
   tatal：整个分页一共需要展示多少条数据
   continues：连续页码数
   总结：对于分页器而言，自定义需要知道四个前提条件

3：自定义分页器，在开发的时候一般传 假的数据 调试好（先别使用服务器的数据）

4：对于分页器而言，最重要的是计算出连续页码的 开始数字和结束数字
-----当前页在中间   当前页第8  那么开始页是6  结束页是10   {6，7，8，9，10}

start_end_page(){
   const {pageNo,pageTotal,continues}=this
   <!-- 起始页start -->
   let start = 0
   <!-- 结束页end -->
   let end = 0
   if(continues > pageTotal){
      start= 1
      end = pageTotal
   }else{
      start = pageNo-parseInt(continues /2)
      end = pageNo - parseInt (continues/2)
      if(start <1){
         start = 1
         end = continues
      }
      if(end >pageTotal){
         end = pageTotal
         start = pageTotal-continues+1
      }
   } 
    return {start,end}
}

## 3 开发某一个产品的详情页面
   步骤 1：静态组件(滚动行为)
       2：发请求
       3：vux (获取产品详情数据)
       4：动态展示组件






# part7
## 数据解释？------售卖属性
  [
      {
          attr:'颜色'
          attrValue:['红色','蓝色','绿色']
      },
      {
          attr:'版本'
          attrValue:['4g','8g','16g']
      }
  ]

## 浏览器存储功能 ：html5新增，本地存储（localStorage）和 会话存储（sessionStorage）
本地存储（localStorage）:数据是持久的 ------上限5M ：可手动删除数据
会话存储（sessionStorage）: 数据是非持久的，页面关闭、浏览器关闭数据丢失（一个会话结束，数据就丢失）
注意：localStorage和sessionStorage一般存储的是字符串（不能存储对象）
---对象转字符串 ：JSON.stringfy(xxx)
---字符串转对象 ：JSON.parse(sessionStorage.getItem('skuInfo'))

## 购物车组件开发
 1.静态组件
 2.向服务器发ajax请求，获取购物车数据，操作vuex三连环、组件获取数据展示数据
 -----问题：发请求的时候，获取不到购物车的数据，因为服务器不知道你是谁？
 3.解决：uuid（生成随机id）临时游客身份
 4.动态展示购物车

## ----------- bug：购物车列表从服务器获取不到数据，uuid也在headers上面添加了，但还是获取不到购物车列表的数据
  ---------解决：接口挂了

## 修改购物车产品的数量【需要节流】
  <li class="cart-list-con5">
       <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cart)">-</a>
       <input autocomplete="off" type="text":value="cart.skuNum" minnum="1"class="itxt" @change="('change',$event.target.value * 1, cart)"/>
       <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
  </li>


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
        await this.$store.dispatch("detail/AddOrUpdateShopCart", {skuId: cart.skuId,skuNum: num,});
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
## 删除购物车的某个产品

## 删除选中的全部商品的操作
  注意：没有一次删除多个商品的接口，但是可以通过id删除产品的接口（一次删一个）
  难点：点击删除选中商品按钮 调用 删除某个产品这个函数（action里面）
        Promise.all[p1,p2,p3]
        p1,p2,p3 都是Promise对象，如果有一个Promise失败，都失败，都成功才成功

## 登录与注册组件开发---（处理共用图片资源问题）
  登陆与注册 还有git 是进公司必备的技能

  1.登陆与注册静态组件
  2.assets文件夹---放置全部组件的共用静态资源
  3.在css可以使用 ~@ 当作src的别名

## 注册的业务 
   1.注册业务 | 登陆业务的表单验证先不做（最后一天统一做）
   2.获取验证码的地址 ：/api/user/passport/sendCode/{phone}
  
## 登录业务
1.注册----通过数据库存储用户信息
2.登录---登录成功的时候，后台为了区分你这个用户是谁-服务器发下发一个token（令牌：唯一标识）
  登录接口： 登录成功服务区下发token，前台持久化存储token，可以带着token找服务器要用户的信息

## 登录过后首页展示用用户名
 1.用户注册成功，用户名+密码登录，向服务器发请求，成功登陆后，获取到服务器下发的token，
     然后把token存储在user仓库中（非持久的），路由跳转到home首页
 2.跳到首页后，一挂载mounted  就派发action获取用户信息，header动态展示用户信息
 3.一刷新home首页，仓库的token就丢失了，所以用户信息就没有了 ，所以需要持久化的存储token
 4.本地持久化存储token
 5.存在问题1：token已经本地存储了，但需要派发请求捞用户信息，多个路由组件切换时都需要用户信息，假如在每个组件的mounted派发请求不行，太繁琐了
   存在问题2：用户已经登录了，就不能在进登录页了
   

## token令牌理解

## vuex仓库存储数据不是持久化的 （页面一刷新就没有了）

## 导航守卫
导航守卫：表示路由在跳转的时候，守卫来决定能不能完成跳转

1.全局守卫：所有的路由跳转都需要守卫  （只要发生路由跳转，守卫都可以检测到）
     全局守卫分类: 1--全局前置守卫：beforeEach((to, from, next)
                  2--全局解析守卫：beforeResolve
                  3--全局后置钩子：afterEach((to, from)

2.路由独享守卫：守卫跳转到当前路由
                ---：beforeEnter((to, from, next))
3.组件内守卫：守卫当前路由组件（用的少）
              1. beforeRouteEnter
              2. beforeRouteUpdate (2.2 新增)
              3. beforeRouteLeave


 beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`



比如：用户已经登陆，就不能回到login组件了


## 整个项目 游客（uuid） 和用户（token），后台以token为准


## 交易页面

## 提交订单
1.静态页面
2.发起ajax请求
3.需要知道不用vuex的时候，怎么搞

#  注意：不能再生命周期钩子中使用 async 和 await


## 组件库  -- ElementUI
ElementUI的使用 + 按需引用  （一般工作中 From 和 Table）
 引入：你可以引入整个 Element，或是根据需要仅引入部分组件
  1.完整引入：import ElementUI from 'element-ui';  
             Vue.use(ElementUI);
  2.按需引入：借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
          首先，安装 babel-plugin-component：npm install babel-plugin-component -D

# 扫码支付后需要发ajax请求 （一直发）

# 个人中心


# 图片懒加载：vue-lazyload插件

# 路由懒加载    
        引入注册方式： new VueRouter ({
          routes:[{
                path: "/home",
                 // 路由懒加载
                component: () =>import ('@/pages/Home'),
                meta: { isShow: true }
                 },]
            })
        优点：当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，
        然后当路由被访问的时候才加载对应组件，这样就更加高效了。

# 打包上线： npm run build
当项目打包后，代码都是加密经过压缩了的，如果运行时报错，输出的错误信息无法准确的得知是哪里的错误，
map文件 ：可以解决这个问题，准确的得知是哪一行代码出错，但是对我们没有意义，可在vue.config.js配置  ： productionSourceMap: false, 打包的时候就不会出现码map文件了

# 购买云服务器
   1：阿里云  腾讯云（便宜）
   2：设置安全组，让服务器的一些端口号打开
   3：利用xshell工具登录服务器

# nginx？
1.为什么访问购买的服务器ip地址xxxxx，就可以访问到打包后的dist里面的index.html的文件？
2.项目的数据来自接口：http://39.98.123.211"    自己服务器的接口：xxxxxxx

# nginx配置:（利用xshell6在自己的服务器上配置）
1:xshell进入根目录/etc
2:进入etc目录，这个目录下有一个nginx目录，进入到这个目录[已经安装过nginx:如果没有安装过，只有四五个文件]
3:如果想安装nginx:yum install nginx 
4:安装完nginx服务器以后，你会发现在nginx目录下，多了一个nginx. conf文件，在这个文件中进行配置
5: vim nginx.conf进行编辑，主要添加如下两项

解决第一个问题:
location / {   
        root    /root/jch/www/ shangpinhui/dist;
        index  index.html;
        try_files $uri $uri/ / index.html;
  }
//解决第二个问题
location /api {
        proxy_pass http://39.98.123.211;
}

6:nginx服务器跑起来 service nginx start



