<template>
  <div class="index">
    <h1>成都东软学院图书管理系统</h1>
    <div class="btns">
      <a class="items" href="#/borrow">
        <i class="icon-unorderedlist iconfont"></i>
        <h4>借阅</h4>
        <p>海量书籍，尽情挑选</p>
      </a>
      <a class="items" href="#/suggest">
        <i class="icon-calendar-check iconfont"></i>
        <h4>投诉</h4>
        <p>发表你的意见，方便我门改进</p>
      </a>
      <a class="items" href="#/repair">
        <i class="icon-setting iconfont"></i>
        <h4>报修</h4>
        <p>有任何问题，都能申请售后处理</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.index {
  color: #fff;
  h1 {
    font-size: 30px;
    font-weight: normal;
    text-align: center;
    margin-bottom: 200px;
  }
  .btns {
    text-align: center;
    .items {
      display: inline-block;
      width: 200px;
      height: 200px;
      padding: 14px;
      margin-right: 10px;
      border-radius: 10px;
      color: #dcdde1;
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

      i {
        font-size: 4em;
        display: block;
      }
      h4 {
        // margin: 0;
        // margin-top: 6px;
      }
      p {
        font-size: 14px;
        line-height: 30px;
      }
    }
    .items:hover {
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      transform: scale(1.1);
    }
  }
}
</style>
