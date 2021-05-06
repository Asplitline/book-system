<template>
  <el-form :model="form" class="register-screen" :rules="rules" ref="form">
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="账号" prefix-icon="el-icon-user-solid">
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" type="password" placeholder="登录密码"
        prefix-icon="el-icon-lock">
      </el-input>
    </el-form-item>
    <el-form-item prop="cPassword">
      <el-input v-model="form.cPassword" type="password" placeholder="确认密码"
        prefix-icon="el-icon-unlock">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="info" size="small" @click="submit('form')">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getUid } from '@utils'
export default {
  props: {
    form: Object,
    rules: Object
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        const data = Object.assign({}, this.form, {
          level: 0,
          createTime: Date.now(),
          updateTime: Date.now(),
          id: getUid(),
          password: this[formName].cPassword
        })
        const { success, data: user } = await this.$api.register(data)
        if (success) {
          this.$emit('change-nav', 'loginScreen')
          this.$message.success('注册成功...请开始登录吧')
          await this.$api.addFile({
            createTime: Date.now(),
            filename: 'avatar_placeholder.jpg',
            id: getUid(),
            size: 0,
            updateTime: Date.now(),
            userId: user.id
          })
        } else {
          this.$message.error('注册失败...')
        }
      })
    }
  }
}
</script>
