<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
/**
 * home
 * bookCenter 图书中心
 * errata 书籍勘误
 * message 留言板
 * info 个人中心
 *
 * admin
 * user - 用户管理
 * book - 书籍管理
 * message - 留言管理
 * correction - 勘误管理
 * borrow - 借阅管理
 * log - 日志管理
 */
export default {
  name: 'app'
}
</script>

<style lang="less" scoped>
#app {
  height: 100vh;
}
</style>
