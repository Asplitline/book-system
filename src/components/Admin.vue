<template>
  <div class="admin">
    <el-container class="main-container">
      <el-header>
        <div>
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#1a4d72"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item
              ><img src="../assets/logo.png" alt="" class="logo"
            /></el-menu-item>
            <el-menu-item class="logo-title"
              >成都东软学院图书借阅系统 - 后台</el-menu-item
            >
            <el-submenu class="user-info" index="1">
              <template slot="title">
                <img :src="bindUrl('T_2014_363.jpg')" class="avatar" />
                <span v-once>123</span>
              </template>
              <el-menu-item
                ><i class="icon-user iconfont"></i>个人中心</el-menu-item
              >
              <el-menu-item @click="logout"
                ><i class="icon-export iconfont"></i>退出系统</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </div>
        <!-- <el-button type="info" @click="logout">退出</el-button> -->
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '260px'">
          <div class="toggle-menu" @click="toToggleMenu">|||</div>
          <el-menu
            :default-active="activePath"
            background-color="#fff"
            text-color="#000"
            active-text-color="#F56C6C"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
          >
            <el-menu-item index="/_user" @click="saveActiveMenu('/_user')">
              <i class="iconfont icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/_goods" @click="saveActiveMenu('/_goods')">
              <i class="iconfont icon-unorderedlist"></i>
              <span slot="title">图书管理</span>
            </el-menu-item>
            <el-menu-item
              index="/_suggest"
              @click="saveActiveMenu('/_suggest')"
            >
              <i class="iconfont icon-edit"></i>
              <span slot="title">投诉管理</span>
            </el-menu-item>
            <el-menu-item index="/_repair" @click="saveActiveMenu('/_repair')">
              <i class="iconfont icon-setting"></i>
              <span slot="title">报修管理</span>
            </el-menu-item>
            <el-menu-item index="/_post" @click="saveActiveMenu('/_post')">
              <i class="iconfont icon-solution"></i>
              <span slot="title">帖子管理</span>
            </el-menu-item>
            <el-menu-item index="/_borrow" @click="saveActiveMenu('/_borrow')">
              <i class="iconfont icon-upload"></i>
              <span slot="title">借还管理</span>
            </el-menu-item>
            <el-menu-item index="/_log" @click="saveActiveMenu('/_log')">
              <i class="iconfont icon-send"></i>
              <span slot="title">日志管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      activePath: ''
    }
  },
  methods: {
    saveActiveMenu() {},
    logout() {},
    toToggleMenu() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.admin {
  min-width: 800px;
}
.main-container {
  height: 100%;
}

.el-header {
  padding: 0 0;
  .logo {
    height: 50px;
    pointer-events: none;
  }
  .logo-title {
    font-size: 20px;
  }
  .user-info {
    float: right;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .iconfont {
    color: #fff;
    margin-right: 20px;
  }
}

.el-aside {
  box-shadow: 0 10px 10px #000;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  .iconfont {
    color: #000;
  }
}

.iconfont {
  margin-right: 10px;
  font-size: 18px;
  color: #fff;
}

.el-submenu,
.el-menu-item {
  span {
    font-size: 16px;
  }
}

.toggle-menu {
  width: 100%;
  color: #6c5ce7;
  text-align: center;
  padding: 10px 0;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: letter-spacing 0.5s;
}

.toggle-menu:hover {
  color: blue;
  letter-spacing: 0.5em;
}

.el-menu-item {
  text-align: center;
  letter-spacing: 0.3em;
}
</style>
