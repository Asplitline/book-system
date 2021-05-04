<template>
  <div class="info">
    <el-tabs type="border-card" tabPosition="left" style="min-height:600px">
      <el-tab-pane label="个人信息" :lazy="true">
        <iInfo />
      </el-tab-pane>
      <el-tab-pane label="修改密码" :lazy="true">
        <iPassword />
      </el-tab-pane>
      <el-tab-pane label="借阅记录" :lazy="true">
        <iBorrow />
      </el-tab-pane>
      <el-tab-pane label="勘误记录" :lazy="true">
        <iErrata />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import iInfo from './iInfo'
import iPassword from './iPassword'
import iBorrow from './iBorrow'
import iErrata from './iErrata'
export default {
  components: {
    iInfo,
    iPassword,
    iBorrow,
    iErrata
  }
}
</script>

<style lang="less" scoped>
/deep/.el-tabs__header.is-left {
  min-height: 600px;
  .el-tabs__nav-scroll {
    height: 600px;
  }
}

/deep/.el-tabs--border-card > .el-tabs__header {
  .el-tabs__item {
    &.is-active {
      color: #cc2929;
    }
    &:not(.is-disabled):hover {
      color: #cc2929;
    }
  }
  // .el-tabs__item:not(.is-disabled):hover {
  //   color: #cc2929;
  // }
}
</style>
