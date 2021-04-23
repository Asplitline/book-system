<template>
  <div class="home" :class="{ indexS: isIndex }">
    <el-container>
      <!-- 头部导航 -->
      <el-header v-show="!isIndex">
        <el-menu :default-active="activeIndex" class="w" mode="horizontal"
          background-color="#444444" text-color="#eee" active-text-color="#ffd04b" router>
          <!-- @select="handleSelect" -->
          <a href="javascript:;" class="logo">
            <img src="../assets/logo.png" alt="" height="50" />
          </a>
          <el-menu-item index="/index"><i class="icon-home iconfont"></i>首页</el-menu-item>
          <el-menu-item index="/borrow"><i class="icon-unorderedlist iconfont"></i>借阅中心
          </el-menu-item>
          <el-menu-item index="/suggest"><i class="icon-calendar-check iconfont"></i>投诉建议
          </el-menu-item>
          <el-menu-item index="/repair"><i class="icon-setting iconfont"></i>损坏保修
          </el-menu-item>
          <!-- <el-menu-item index="/post"
            ><i class="icon-solution iconfont"></i>帖子中心</el-menu-item
          > -->
          <el-menu-item index="/info"><i class="icon-user iconfont"></i>个人中心
          </el-menu-item>
          <div class="login">
            <a href="javascript:;" v-if="!isLogin" @click="showLoginDialog">登录</a>
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
    <el-dialog :visible.sync="isLoginDialog" width="24%" class="loginDialog"
      :close-on-click-modal="false" :show-close="false">
      <el-form :model="form" :rules="rules" ref="form" size="small">
        <h4 content-position="left" class="title">{{loginIndex?'登录界面':'注册界面'}}</h4>
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="el-icon-user"
            placeholder="输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" prefix-icon="el-icon-lock"
            placeholder="输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" v-if="!loginIndex">
          <el-input v-model="form.confirmPassword" type="password"
            prefix-icon="el-icon-lock" placeholder="再次输入密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="toggleIndex()" size="mini">{{loginIndex?'注册':'登录'}}
        </el-button>
        <el-button type="primary" @click="submitForm()" size="mini">
          {{loginIndex?'登录':'注册'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Home',
  data() {
    const checkPassword = (rule, value, callback) => {
      const oVal = value.trim()
      const nVal = this.form.password.trim()
      // console.log(oVal, nVal)
      if (nVal.length === 0) {
        return callback(new Error('确认密码不能为空'))
      } else if (oVal !== nVal) {
        return callback(new Error('新旧密码不一致'))
      } else {
        return callback()
      }
    }
    return {
      activeIndex: sessionStorage.getItem('currentIndexF'),
      isLoginDialog: false,
      form: {
        password: '',
        username: '',
        confirmPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [
          {
            validator: checkPassword
          }
        ]
      },
      isIndex: false,
      loginIndex: true
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
        this.isLoginDialog = true
      }
    },
    // 登录验证
    async submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        if (this.loginIndex) {
          console.log(123)
          const pwdURL = this.toURL(this.form)
          const { status, data } = await this.$http.post(
            '/account/api/login',
            pwdURL
          )
          if (status === 200) {
            if (data.success) {
              this.isLoginDialog = false
              this.$refs.form.resetFields()
              this.initUser(data.data)
            } else {
              this.$message.error('登录失败')
            }
          }
        } else {
          this.form.createTime = Date.now()
          this.form.updateTime = Date.now()
          this.form.level = 0
          const { data } = await this.$http.post(
            '/account/api/regist',
            this.form
          )
          const { success } = data
          if (success) {
            this.$message.success('注册成功..请开始登录吧！')
            this.toggleIndex()
          } else {
            this.$message.error('注册失败')
          }
        }
      })
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
          this.isLoginDialog = true
          sessionStorage.clear('userInfo')
          // this.getLoginStatus()
          this.$message.success('注销成功')
          this.$router.push('/index')
        })
        .catch(() => {
          this.$message.info('已取消')
        })
    },
    toggleIndex() {
      const lgRef = this.$refs.form
      lgRef && lgRef.resetFields()
      this.loginIndex = !this.loginIndex
    },
    submitRegister() {}
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.isLoginDialog = !this.isLogin
    this.activeIndex = sessionStorage.getItem('currentIndexF')
    this.isIndex = sessionStorage.getItem('currentIndexF') === '/index'
  },
  updated() {
    this.activeIndex = sessionStorage.getItem('currentIndexF')
    this.isIndex = sessionStorage.getItem('currentIndexF') === '/index'
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
.el-button {
  margin-right: 10px;
  & + .el-button {
    margin-right: 30px;
    margin-left: 0;
  }
}
.indexS {
  background-image: linear-gradient(to top right, #2d3436, #636e72);
  .footer {
    background-image: none;
  }
}

/deep/.el-form-item__error {
  left: 16px;
}
</style>
