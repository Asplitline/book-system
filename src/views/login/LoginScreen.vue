<template>
  <el-form :model="form" class="login-screen" :rules="rules" ref="form">
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="账号" prefix-icon="el-icon-user-solid">
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" type="password" placeholder="密码"
        prefix-icon="el-icon-unlock">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="success" size="small" @click="submit('form')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { convertURL } from '@utils'
import { mapMutations } from 'vuex'
import { NORMAL, ADMIN } from '@static'
export default {
  props: {
    form: Object,
    rules: Object
  },
  methods: {
    ...mapMutations(['setCurrentUser']),
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        const { success, data } = await this.$api.login(convertURL(this.form))
        if (success) {
          this.setCurrentUser(data)
          this.$message.success('登录成功...')
          if (data.level === NORMAL) {
            this.$router.push({ name: 'home' })
          } else if (data.level === ADMIN) {
            this.$router.push({ name: 'admin' })
          }
        } else {
          this.$message.error('账号或密码错误...')
        }
      })
    }
  }
}
</script>
