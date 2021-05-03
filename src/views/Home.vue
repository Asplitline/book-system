<template>
  <div class="home">
    <el-menu :default-active="currentHMenu" mode="horizontal" class="w" router>
      <el-menu-item :index="item.index" v-for="item in hMenu" :key="item.index">
        {{item.name}}</el-menu-item>
      <el-menu-item class="h-info">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              alt=""></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
    <el-container class="w">
      <router-view />
    </el-container>
  </div>
</template>

<script>
import { hMenu } from '@static'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      hMenu
    }
  },
  computed: {
    ...mapState(['currentHMenu'])
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
}
.w {
  width: 1200px;
}

.el-container {
  flex: 1;
  background-color: #fff;
  padding: 10px 0;
}

.h-info {
  float: right;
}
</style>
