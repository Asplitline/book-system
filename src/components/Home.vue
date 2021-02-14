<template>
  <div class="home">
    <el-container>
      <!-- 头部导航 -->
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="w"
          mode="horizontal"
          @select="handleSelect"
          text-color="#d8e5ff"
          router
        >
          <a href="javascript:;" class="logo">
            <img src="../assets/logo.png" alt="" height="50" />
          </a>
          <el-menu-item index="/index"
            ><i class="icon-home iconfont"></i>首页</el-menu-item
          >
          <el-menu-item index="/borrow"
            ><i class="icon-unorderedlist iconfont"></i>借阅中心</el-menu-item
          >
          <el-menu-item index="/suggest"
            ><i class="icon-calendar-check iconfont"></i>投诉建议</el-menu-item
          >
          <el-menu-item index="/repair"
            ><i class="icon-setting iconfont"></i>损坏保修</el-menu-item
          >
          <el-menu-item index="/post"
            ><i class="icon-solution iconfont"></i>帖子中心</el-menu-item
          >
          <el-menu-item index="/info"
            ><i class="icon-user iconfont"></i>个人中心</el-menu-item
          >
          <div class="login">
            <a href="javascript:;" v-if="isLogin">登录</a>
            <a href="javascript:;" v-else>注销</a>
          </div>
        </el-menu>
      </el-header>
      <!-- 主体内容 -->
      <el-main class="w content">
        <router-view></router-view>
      </el-main>
      <el-footer class="footer" style="height: 90px">
        <p class="call-me"><a href="">关于我们</a>|<a href="">联系我们</a></p>
        <p class="copy-right">© 2020 NSU All Rights Reserved</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      activeIndex: '/index',
      isLogin: true
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  // Sticky -footer
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  // 头部导航
  .el-header {
    background-color: #1a4d72;
    padding: 0 20px;
    // logo
    .logo {
      float: left;
      height: 60px;
      padding: 5px 8px;
      margin-right: 10px;
      cursor: pointer;
      box-sizing: border-box;
    }

    // 自定义 el-menu 样式
    .el-menu--horizontal {
      border: none;
      .el-menu-item:not(.is-disabled):focus,
      & > .el-menu-item.is-active[data-v-8dc7cce2] {
        background-color: #0984e3;
        color: #fff;
      }

      & > .el-menu-item:not(.is-disabled):hover {
        background-color: #0984e399;
      }
      & > .el-menu-item {
        margin-right: 6px;
        font-size: 15px;
        i {
          color: inherit;
          vertical-align: top;
          margin-right: 3px;
        }
      }
      // 登录样式
      .login {
        float: right;
        outline: none;
        margin: 14px 10px;
        a {
          display: inline-block;
          padding: 0 12px;
          line-height: 32px;
          border-radius: 6px;
          font-size: 14px;
          letter-spacing: 2px;
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.8);
          i {
            font-size: 13px;
            vertical-align: middle;
          }
        }
        a:hover {
          background-color: #fff;
          color: #1a4d72;
        }
      }
    }

    .el-menu {
      background-color: transparent;
      border: none;
      height: 60px;
    }
  }

  // 内容区域
  .content {
    flex: 1;
    background-color: #ccc;
    width: 100%;
  }

  // 页尾
  .footer {
    background-image: linear-gradient(to bottom, #333, #222);
    text-align: center;
    padding: 16px 0;
    p {
      color: #eee;
      height: 30px;
      letter-spacing: 0.2em;
      a {
        margin: 0 6px;
        color: #ddd;
      }
    }
  }
}
</style>
