<template>
  <div class="index">
    <h1>图书管理系统</h1>
    <div class="btns">
      <a class="items" href="#/bookCenter">
        <i class="el-icon-notebook-1"></i>
        <h4>图书中心</h4>
        <p>海量书籍，尽情挑选</p>
      </a>
      <a class="items" href="#/errata">
        <i class="el-icon-s-opportunity"></i>
        <h4>书籍勘误</h4>
        <p>活跃社区，共同学习</p>
      </a>
      <a class="items" href="#/info">
        <i class="el-icon-s-custom"></i>
        <h4>个人中心</h4>
        <p>个人定制，个性签名</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.index {
  color: #000;
  margin-top: 100px;
  background-color: #fdf2ed;
  box-shadow: 0px 0px 3px 2px #ffa3a3;
  padding: 40px;
  h1 {
    font-size: 30px;
    font-weight: normal;
    text-align: center;
    padding: 40px 0;
    color: #cc2929;
  }
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    .items {
      width: 200px;
      height: 200px;
      padding: 14px;
      text-align: center;
      border-radius: 10px;
      color: #cc2929;
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
      i {
        font-size: 64px;
      }
      h4 {
        margin: 16px 0;
      }
      p {
        font-size: 14px;
        // line-height: 30px;
      }
    }
    .items:hover {
      color: #fff;
      background-color: rgba(#cc2929, 0.8);
      transform: scale(1.1);
    }
  }
}
</style>
