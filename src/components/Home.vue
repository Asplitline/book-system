<template>
  <div class="home">
    <el-container>
      <!-- 头部导航 -->
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="w"
          mode="horizontal"
          background-color="#444444"
          text-color="#eee"
          active-text-color="#ffd04b"
          router
        >
          <!-- @select="handleSelect" -->
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
          <!-- <el-menu-item index="/post"
            ><i class="icon-solution iconfont"></i>帖子中心</el-menu-item
          > -->
          <el-menu-item index="/info"
            ><i class="icon-user iconfont"></i>个人中心</el-menu-item
          >
          <div class="login">
            <a href="javascript:;" v-if="isLogin" @click="showLoginDialog"
              >登录</a
            >
            <a href="javascript:;" v-else @click="logOut">注销</a>
          </div>
        </el-menu>
      </el-header>
      <!-- 主体内容 -->
      <el-main class="w content">
        <router-view></router-view>
      </el-main>
      <!-- 页脚 -->
      <el-footer class="footer" style="height: 90px">
        <p class="call-me"><a href="">关于我们</a>|<a href="">联系我们</a></p>
        <p class="copy-right">© 2020 NSU All Rights Reserved</p>
      </el-footer>
    </el-container>
    <!-- 对话框 -->
    <el-dialog
      :visible.sync="isLoginDiaglog"
      width="24%"
      class="loginDialog"
      :close-on-click-modal="false"
      @close="clearDialog('loginForm')"
    >
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        size="small"
      >
        <h4 content-position="left" class="title">登录界面</h4>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-lock"
            placeholder="输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isLoginDiaglog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="verifyLogin()" size="mini"
          >登 录</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      activeIndex: sessionStorage.getItem('currentIndexF'),
      isLoginDiaglog: false,
      loginForm: {},
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      isLogin: false
    }
  },
  methods: {
    ...mapMutations(['initUser']),
    // 显示登录界面
    showLoginDialog() {
      const user = sessionStorage.getItem('userInfo')
      if (user) {
        this.$message.warning('用户已登录')
      } else {
        this.isLoginDiaglog = true
      }
    },
    // 登录验证
    async verifyLogin() {
      const pwdURL = this.toURL(this.loginForm)
      const { status, data } = await this.$http.post(
        '/account/api/login',
        pwdURL
      )
      if (status === 200) {
        if (data.success) {
          this.$message.success('登录成功')
          this.isLoginDiaglog = false
          this.$cookies.set('token', `username=${data.data.username}`)
          this.initUser(data.data)
          this.getLoginStatus()
        }
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 注销
    logOut() {
      this.$confirm('此操作将退出当前账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          sessionStorage.clear('userInfo')
          this.getLoginStatus()
          this.$message.success('注销成功')
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    // 获取当前登录状态
    getLoginStatus() {
      this.$store.commit(
        'initLoginStatus',
        sessionStorage.getItem('userInfo') === null
      )
      this.isLogin = this.$store.state.isLogin
    },
    clearDialog(formName) {
      this.$refs[formName].resetFields()
    }
  },
  created() {
    this.getLoginStatus()
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
    background-color: #444;
    padding: 0 20px;
    // logo
    .logo {
      float: left;
      height: 60px;
      padding: 5px 8px;
      margin-right: 10px;
      cursor: pointer;
      box-sizing: border-box;
      outline: none;
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

  // 登录界面
  .loginDialog {
    /deep/ .el-dialog__body {
      padding: 0 40px 0px;
      .el-form-item {
        margin: 0 10px 20px;
      }
    }
    .title {
      font-size: 22px;
      font-weight: normal;
      line-height: 40px;
      margin: 0 0 16px 10px;
      text-align: center;
    }
  }

  // 内容区域
  .content {
    flex: 1;
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
