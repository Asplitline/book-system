<template>
  <div class="login">
    <el-card class="warpper">
      <loginNav :index="current" @change-nav="handleNav" />
      <component :form="form" :rules="rules" :is="current" @change-nav="handleNav">
      </component>
    </el-card>
  </div>
</template>

<script>
import loginNav from './login/LoginNav'
import loginScreen from './login/LoginScreen'
import registerScreen from './login/RegisterScreen'
export default {
  components: {
    loginNav,
    loginScreen,
    registerScreen
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        cPassword: ''
      },
      current: 'loginScreen',
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        cPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          {
            validator: (rules, value, callback) => {
              const pwd = this.form.password.trim()
              const cpwd = this.form.cPassword.trim()
              if (pwd === cpwd) {
                return callback()
              } else {
                return callback(new Error('两次密码不一致'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleNav(val) {
      this.current = val
      this.form = {}
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.warpper {
  width: 400px;
  [class$='-screen'] {
    margin-top: 16px;
    /deep/.el-button {
      width: 100%;
    }
  }
}
/deep/.el-input__inner {
  background-color: #fafafa;
}
/deep/.el-input__icon {
  color: #777;
}
</style>
