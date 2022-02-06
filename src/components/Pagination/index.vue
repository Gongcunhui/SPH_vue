<template>
  <div class="pagination">
    <button :disabled='pageNo==1' @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="start_end_page.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="start_end_page.start>2">···</button>

    <template v-for="(i, index) in start_end_page.end">
        <button v-if="i >= start_end_page.start" :key="index" @click="$emit('getPageNo',i)" :class="{active:pageNo==i}">{{i}}</button>
    </template>

    <button v-if="start_end_page.end<=totalPage-2">···</button>
    <button v-if="start_end_page.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continuePage"],
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页码的  起始页数  以及  结束页数
    start_end_page() {
      let { pageNo,continuePage, totalPage } = this;
      // s:起始页  e:结束页
      let start = 0;
      let end = 0;
      // 如果总页数小于连续页码数
      if (continuePage > totalPage) {
        start = 1
        end = totalPage
      }else{
        //   正常现象  总页数大于连续页码
        start = pageNo - parseInt(continuePage/2)
        end = pageNo + parseInt(continuePage/2)
        // 当前页如果是 第1、2页 那么start为负数  所以固定为 1
        if(start<1){
            start = 1
            end = continuePage
        }
        // 如果结束页超过总页数 那么end应该固定为总页数
        if(end>totalPage){
            start = totalPage - continuePage + 1
            end = totalPage
        }
      }
      return {start,end}
      
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
    background-color: skyblue;
}
</style>