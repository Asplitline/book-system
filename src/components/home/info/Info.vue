<template>
  <div class="info">
    <el-row>
      <el-col :span="5" :offset="2">
        <!-- 用户信息 -->
        <el-card class="user-info">
          <img :src="bindUrl('T_2014_363.jpg')" alt="" />
          <div class="desc">
            <h4 class="username">nihao</h4>
            <p>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</p>
          </div>
        </el-card>
        <!-- 左侧导航栏 -->
        <el-card class="menu-nav">
          <ul>
            <li @click="setActive(1)">
              <a href="javascript:;" :class="{ active: activeIndex === 1 }"
                ><i class="iconfont icon-user">个人信息</i></a
              >
            </li>
            <li @click="setActive(2)">
              <a href="javascript:;" :class="{ active: activeIndex === 2 }"
                ><i class="iconfont icon-edit-square">更改密码</i></a
              >
            </li>
            <li @click="setActive(3)">
              <a href="javascript:;" :class="{ active: activeIndex === 3 }"
                ><i class="iconfont icon-unorderedlist">借阅记录</i></a
              >
            </li>
            <li @click="setActive(4)">
              <a href="javascript:;" :class="{ active: activeIndex === 4 }"
                ><i class="iconfont icon-solution">发帖记录</i></a
              >
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="14" :offset="1">
        <el-card class="content">
          <!-- 用户信息 -->
          <div class="edit-info" v-if="activeIndex === 1">
            <el-form
              :model="userInfoForm"
              :rules="userInfoRules"
              ref="userInfoForm"
              label-width="100px"
              size="small"
              :hide-required-asterisk="true"
            >
              <el-form-item prop="name">
                <span slot="label"
                  ><i class="icon-contacts iconfont"></i>账号</span
                >
                <el-input v-model="userInfoForm.username" disabled></el-input>
              </el-form-item>

              <el-form-item prop="name">
                <span slot="label"><i class="icon-user iconfont"></i>昵称</span>
                <el-input v-model="userInfoForm.name"></el-input>
              </el-form-item>

              <el-form-item prop="name">
                <span slot="label"
                  ><i class="icon-mobile iconfont"></i>手机号码</span
                >
                <el-input v-model="userInfoForm.phone"></el-input>
              </el-form-item>
              <el-form-item prop="name">
                <span slot="label"><i class="icon-mail iconfont"></i>邮箱</span>
                <el-input v-model="userInfoForm.email"></el-input>
              </el-form-item>
              <el-form-item prop="name">
                <span slot="label"
                  ><i class="icon-camera1 iconfont"></i>头像</span
                >
                <el-upload
                  class="avatar-uploader"
                  :action="bindImg('util/uploadfile')"
                  :show-file-list="false"
                  :on-success="handleEditAvatarSuccess"
                  name="files"
                  :data="{ id: userInfoForm.fileId }"
                >
                  <img
                    v-if="userInfoForm.imgUrl"
                    :src="bindUrl(userInfoForm.imgUrl)"
                    class="avatar"
                    ref="preview"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item prop="name">
                <span slot="label"
                  ><i class="icon-bulb iconfont"></i>自我描述</span
                >
                <el-input
                  v-model="userInfoForm.description"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 6 }"
                  resize="none"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="submitUserInfo()"
                  >修改</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <!-- 修改密码 -->
          <div class="edit-password" v-else-if="activeIndex === 2">
            <el-form
              :model="passwordForm"
              :rules="passwordRules"
              ref="passwordForm"
              size="small"
              label-width="100px"
            >
              <el-form-item prop="name">
                <span slot="label"
                  ><i class="icon-lock iconfont"></i>旧密码</span
                >
                <el-input v-model="passwordForm.name"></el-input>
              </el-form-item>
              <el-form-item prop="name">
                <span slot="label"
                  ><i class="icon-lock iconfont"></i>新密码</span
                >
                <el-input v-model="passwordForm.name"></el-input>
              </el-form-item>
              <el-form-item prop="name">
                <span slot="label"
                  ><i class="icon-lock iconfont"></i>确认密码</span
                >
                <el-input v-model="passwordForm.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success">修改</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 借阅记录 -->
          <div class="borrow-records" v-else-if="activeIndex === 3">
            <el-table :data="borrowTable" style="width: 100%">
              <el-table-column prop="date" label="书籍编号" min-width="80">
              </el-table-column>
              <el-table-column prop="name" label="书籍名称" min-width="80">
              </el-table-column>
              <el-table-column prop="address" label="书籍分类" min-width="80">
              </el-table-column>
              <el-table-column prop="date" label="借阅状态" min-width="80">
              </el-table-column>
              <el-table-column prop="name" label="借阅结果" min-width="80">
              </el-table-column>
              <el-table-column prop="address" label="归还结果" min-width="80">
              </el-table-column>
              <el-table-column prop="address" label="操作" min-width="80">
                <el-button type="primary" size="mini">归还</el-button>
                <!-- <el-button type="danger" size="mini" disabled>归还</el-button> -->
              </el-table-column>
            </el-table>
          </div>
          <!-- 发帖记录 -->
          <div class="post-records" v-else>1234</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data() {
    // 验证邮箱
    const checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/
      if (regEmail.test(value)) return callback()
      callback(new Error('邮箱不合法'))
    }
    // 验证手机
    const checkPhone = (rule, value, callback) => {
      const regPhone = /^1[34578]\d{9}$/
      if (regPhone.test(value)) return callback()
      callback(new Error('手机号码不合法'))
    }
    return {
      activeIndex: Number(sessionStorage.getItem('asideIndex')) || 1,
      // 1
      userInfoForm: {},
      userInfoRules: {
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
        imgUrl: [{ required: true, message: '选择头像', trigger: 'blur' }]
      },
      currentUser: {},
      // 2
      passwordForm: {},
      passwordRules: {},
      // 3
      borrowTable: [{}]
    }
  },
  methods: {
    ...mapActions(['getFileById']),
    ...mapMutations(['initUser']),
    // 设置当前选择菜单
    setActive(index) {
      this.activeIndex = index
    },
    // 修改头像
    handleEditAvatarSuccess(res, file) {
      this.userInfoForm.imgUrl = file.name
    },
    // 处理active
    handleActive() {
      switch (this.activeIndex) {
        case 1:
          this.handleUserInfo()
          break
        case 2:
          this.handleChangePassword()
          break
        case 3:
          this.handleBorrowRecords()
          break
        case 4:
          this.handleSuggestRecords()
          break
      }
    },
    // 1----
    async handleUserInfo() {
      this.userInfoForm = this.convertDeepCopy(this.currentUser)
      const file = await this.getFileById(this.userInfoForm.id)
      this.$set(this.userInfoForm, 'imgUrl', file.name)
      this.userInfoForm.fileId = file.id
    },
    async submitUserInfo() {
      const { data, status } = await this.$http.put(
        '/user/updateIgnoreNull',
        this.userInfoForm
      )
      if (status === 200) {
        if (data.success) {
          this.initUser(this.userInfoForm)
          this.currentUser = this.convertDeepCopy(this.userInfoForm)
          this.$message.success('修改成功')
        } else {
          this.$message.error('修改失败')
        }
      } else {
        this.$message.waring('请求失败')
      }
    },
    // 2----
    handleChangePassword() {
      console.log(2)
    },
    // 3----
    handleBorrowRecords() {
      console.log(3)
    },
    // 4----
    handleSuggestRecords() {
      console.log(4)
    }
  },
  watch: {
    activeIndex(newVal) {
      sessionStorage.setItem('asideIndex', newVal)
      this.handleActive()
    }
  },
  destroyed() {
    sessionStorage.removeItem('asideIndex')
  },
  created() {
    this.handleActive()
    this.currentUser = this.$store.state.user
  }
}
</script>

<style lang="less" scoped>
// 用户信息
.user-info {
  margin-bottom: 20px;
  img {
    display: block;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    padding: 6px;
    border: 1px solid #ccc;
    box-shadow: 1px 2px 6px 1px rgb(0 0 0 / 0.1);
    margin: 0 auto;
  }

  .desc {
    text-align: center;
    margin: 20px 0;
    h4 {
      font-size: 24px;
      color: #333;
      margin-bottom: 10px;
    }
    p {
      font-size: 14px;
      color: #777;
      line-height: 24px;
    }
  }
}
// 左侧导航栏
.menu-nav {
  li {
    a {
      display: inline-block;
      width: 100%;
      height: 32px;
      line-height: 32px;
      letter-spacing: 4px;
      text-align: center;
      color: #2c2c54;
      transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
      border-radius: 4px;
      margin-bottom: 6px;
    }
    a:hover {
      background-color: #e7e7e7;
      color: #2c2c54;
      transform: scale(1.02);
    }
    a.active {
      color: #eff3f5;
      background-color: #6e6666;
    }

    i::before {
      margin-right: 6px;
    }
  }
}
// 右侧内容
.content {
  .edit-info {
    /deep/.el-upload {
      border: 2px dashed transparent;
      line-height: 0;
      border-radius: 2px;
      width: 120px;
      height: 120px;
      img {
        width: 100%;
        height: 100%;
        box-shadow: 0px 1px 2px 1px rgba(0 0 0 / 0.2);
      }
      &:hover {
        border: 2px dashed #ff525278;
      }
      i {
        font-size: 20px;
      }
    }
  }

  .el-form-item {
    span {
      font-size: 16px;
      letter-spacing: 1px;
      i {
        margin-right: 1px;
      }
    }
  }
  // .edit-password
  // .borrow-records
  // .post-records
}
</style>
