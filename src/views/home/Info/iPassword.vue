<template>
  <el-card class="i-password">
    <el-form :model="form" :rules="rules" ref="form" size="small" label-width="100px"
      :hide-required-asterisk="true">
      <el-form-item prop="oldPassword">
        <span slot="label"><i class="icon-lock iconfont"></i>旧密码</span>
        <el-input v-model="form.oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="newPassword">
        <span slot="label"><i class="icon-lock iconfont"></i>新密码</span>
        <el-input v-model="form.newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <span slot="label"><i class="icon-lock iconfont"></i>确认密码</span>
        <el-input v-model="form.confirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="info" @click="resetForm('form')">重置
        </el-button>
        <el-button type="success" @click="submit('form')">修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import mixin from '@mixins'
import { mapState } from 'vuex'
export default {
  mixins: [mixin.home],
  data() {
    const checkPassword = (rule, value, callback) => {
      const hValue = value.trim()
      const cValue = this.form.newPassword.trim()
      if (hValue !== cValue) {
        callback(new Error('新旧密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        const { success } = await this.$api.changePassword({
          id: this.currentUser.id,
          password: this[formName].confirmPassword
        })
        this.handleSuccess(success, '修改密码', () => {
          this.resetForm(formName)
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.btns {
  float: right;
  .el-button {
    margin-right: 4px;
  }
}
</style>
