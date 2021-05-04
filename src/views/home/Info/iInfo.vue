<template>
  <el-card class="i-info">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" size="small"
      :hide-required-asterisk="true">
      <el-form-item prop="username" label="账号">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item prop="name" label="昵称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号码">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item prop="avatar" label="头像">
        <el-upload class="avatar-uploader" :action="bindIMG('util/uploadfile')"
          :show-file-list="false" :on-success="handleEditAvatarSuccess" name="files"
          :data="uploadInfo">
          <img v-if="form.avatar" :src="bindIMG(form.avatar.filename)" class="avatar"
            ref="preview" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="name" label="自我描述">
        <el-input v-model="form.description" type="textarea"
          :autosize="{ minRows: 3, maxRows: 6 }" resize="none"></el-input>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="success" @click="submit('form')">修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { bindIMG, checkEmail, checkPhone, deepClone } from '@utils'
import { mapMutations, mapState } from 'vuex'
import mixin from '@mixins'
export default {
  mixins: [mixin.home],
  data() {
    return {
      rules: {
        username: [
          { required: true, message: '输入账号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '输入电话号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '输入电子邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        avatar: [{ required: true, message: '选择头像', trigger: 'blur' }]
      },
      uploadInfo: {},
      form: {}
    }
  },
  methods: {
    bindIMG,
    ...mapMutations(['setCurrentUser']),
    handleEditAvatarSuccess(res, file) {
      this.$set(this.form, 'avatar', {
        id: this.uploadInfo.id,
        filename: file.name
      })
    },
    async getUser() {
      const [avatar] = await this.$api.getFileById({
        id: this.form.id
      })
      this.$set(this.form, 'avatar', avatar)
      this.uploadInfo = { id: this.form.avatar.id }
    },
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        console.log(this[formName])
        this[formName].updateTime = Date.now()
        const { success } = await this.$api.editUser(this[formName])
        this.handleSuccess(success, '修改用户', () => {
          this.setCurrentUser(this[formName])
        })
      })
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.form = deepClone(this.currentUser)
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
/deep/.el-upload {
  border-radius: 2px;
  line-height: 120px;
  width: 120px;
  height: 120px;
  border: 2px dashed #e0e0e0;
  img {
    width: 100%;
    height: 100%;
    box-shadow: 0px 1px 2px 1px rgba(0 0 0 / 0.2);
  }
  &:hover {
    border: 2px dashed #cc2929;
  }
  i {
    font-size: 20px;
  }
}
.btns {
  float: right;
  .el-button {
    margin-right: 4px;
  }
}
</style>
