<template>
  <div class="login">
    <div class="login-box">
      <el-form
        class="login-form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginForm"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
            @keyup.enter.native="submitForm"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="info" @click="resetForm">重置</el-button>
          <el-button type="success" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['initUser']),

    submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return
        const pwdURL = this.toURL(this.loginForm)
        const { data, status } = await this.$http.post(
          'http://127.0.0.1:8089/account/api/login',
          pwdURL
        )
        if (status === 200) {
          if (data.success) {
            this.$message.success('登录成功')
            this.initUser(data.data)
            this.$router.push('/admin')
          } else this.$message.error('登录失败')
        } else {
          this.$message.warning('请求失败')
        }
      })
    },
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  height: 100vh;
  background-color: #565656;
}

.login-box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #ddd;
  .avatar-box {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}
</style>
