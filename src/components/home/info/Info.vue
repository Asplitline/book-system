<template>
  <div class="info">
    <el-row>
      <el-col :span="5" :offset="2">
        <!-- 用户信息 -->
        <el-card class="user-info">
          <img :src="bindUrl(currentUser.imgUrl)" alt="" />
          <div class="desc">
            <h4 class="username">{{ currentUser.name }}</h4>
            <p>{{ currentUser.description }}</p>
          </div>
        </el-card>
        <!-- 左侧导航栏 -->
        <el-card class="menu-nav">
          <ul>
            <li @click="setActive(1)">
              <a href="javascript:;" :class="{ active: activeIndex === 1 }"><i
                  class="iconfont icon-user">个人信息</i></a>
            </li>
            <li @click="setActive(2)">
              <a href="javascript:;" :class="{ active: activeIndex === 2 }"><i
                  class="iconfont icon-edit-square">更改密码</i></a>
            </li>
            <li @click="setActive(3)">
              <a href="javascript:;" :class="{ active: activeIndex === 3 }"><i
                  class="iconfont icon-unorderedlist">借阅记录</i></a>
            </li>
            <li @click="setActive(4)">
              <a href="javascript:;" :class="{ active: activeIndex === 4 }"><i
                  class="iconfont icon-solution">投诉记录</i></a>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="14" :offset="1">
        <el-card class="content">
          <!-- 用户信息 -->
          <div class="edit-info" v-if="activeIndex === 1">
            <el-form :model="userInfoForm" :rules="userInfoRules" ref="userInfoForm"
              label-width="100px" size="small" :hide-required-asterisk="true">
              <el-form-item prop="name">
                <span slot="label"><i class="icon-contacts iconfont"></i>账号</span>
                <el-input v-model="userInfoForm.username" disabled></el-input>
              </el-form-item>

              <el-form-item prop="name">
                <span slot="label"><i class="icon-user iconfont"></i>昵称</span>
                <el-input v-model="userInfoForm.name"></el-input>
              </el-form-item>

              <el-form-item prop="name">
                <span slot="label"><i class="icon-mobile iconfont"></i>手机号码</span>
                <el-input v-model="userInfoForm.phone"></el-input>
              </el-form-item>
              <el-form-item prop="name">
                <span slot="label"><i class="icon-mail iconfont"></i>邮箱</span>
                <el-input v-model="userInfoForm.email"></el-input>
              </el-form-item>
              <el-form-item prop="name">
                <span slot="label"><i class="icon-camera1 iconfont"></i>头像</span>
                <el-upload class="avatar-uploader" :action="bindImg('util/uploadfile')"
                  :show-file-list="false" :on-success="handleEditAvatarSuccess"
                  name="files" :data="{ id: userInfoForm.fileId }">
                  <img v-if="userInfoForm.imgUrl" :src="bindUrl(userInfoForm.imgUrl)"
                    class="avatar" ref="preview" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item prop="name">
                <span slot="label"><i class="icon-bulb iconfont"></i>自我描述</span>
                <el-input v-model="userInfoForm.description" type="textarea"
                  :autosize="{ minRows: 3, maxRows: 6 }" resize="none"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="submitUserInfo()">修改</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 修改密码 -->
          <div class="edit-password" v-else-if="activeIndex === 2">
            <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm"
              size="small" label-width="100px" :hide-required-asterisk="true">
              <el-form-item prop="oldPassword">
                <span slot="label"><i class="icon-lock iconfont"></i>旧密码</span>
                <el-input v-model="passwordForm.oldPassword" type="password"></el-input>
              </el-form-item>
              <el-form-item prop="newPassword">
                <span slot="label"><i class="icon-lock iconfont"></i>新密码</span>
                <el-input v-model="passwordForm.newPassword" type="password"></el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <span slot="label"><i class="icon-lock iconfont"></i>确认密码</span>
                <el-input v-model="passwordForm.confirmPassword" type="password">
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="submitChangePassword('passwordForm')">修改
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 借阅记录 -->
          <div class="borrow-records" v-else-if="activeIndex === 3">
            <el-table :data="borrowTable" style="width: 100%" key="borrowTable">
              <el-table-column prop="bookId" label="书籍ID" min-width="180">
              </el-table-column>
              <el-table-column prop="bookName" label="书籍名称" min-width="60">
              </el-table-column>
              <!-- <el-table-column prop="address" label="书籍分类" min-width="80">
              </el-table-column> -->
              <el-table-column prop="state" label="借阅状态" min-width="60">
                <template v-slot="{ row }">
                  <el-tag v-if="row.state === 0" type="warning">审核中</el-tag>
                  <el-tag v-if="row.state === 1" type="danger">不通过</el-tag>
                  <el-tag v-if="row.state === 3">借阅中</el-tag>
                  <el-tag v-if="row.state === 4" type="info">归还中</el-tag>
                  <el-tag v-if="row.state === 5" type="success">已归还</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="操作" min-width="60">
                <template v-slot="{ row }">
                  <el-button type="primary" size="mini" @click="returnBook(row)"
                    :disabled="row.state !== 3">归还</el-button>
                </template>
                <!-- <el-button type="danger" size="mini" disabled>归还</el-button> -->
              </el-table-column>
            </el-table>
          </div>
          <!-- 投诉记录 -->
          <div class="suggest-records" v-else-if="activeIndex === 4">
            <el-table :data="suggestTable" style="width: 100%" key="suggestTable">
              <el-table-column prop="title" label="投诉标题" min-width="80">
              </el-table-column>
              <el-table-column prop="description" label="投诉内容" min-width="80">
              </el-table-column>
              <el-table-column prop="createTime" label="投诉时间" min-width="100">
                <template v-slot="{ row }">
                  {{ row.createTime | formatDate }}
                </template>
              </el-table-column>
              <el-table-column prop="state" label="投诉进度" min-width="60">
                <template v-slot="{ row }">
                  <el-tag v-if="row.state === 0">未回复</el-tag>
                  <el-tag v-else-if="row.state === 1" type="success">已回复</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="60">
                <template v-slot="{ row }">
                  <el-button type="primary" size="mini" @click="showSuggestDetail(row)">详情
                  </el-button>
                </template>
                <!-- <el-button type="danger" size="mini" disabled>归还</el-button> -->
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 投诉详情对话框 -->
    <el-dialog :visible.sync="isSuggesDetailtDialog" width="30%" class="suggest-detail">
      <div class="content">
        <p>
          投诉标题:<span>{{ currentSuggest.title }}</span>
        </p>
        <p>
          投诉内容:<span class="mark">{{ currentSuggest.description }}</span>
        </p>
        <p>
          投诉时间:<span>{{ currentSuggest.createTime | formatDate }}</span>
        </p>
        <p>
          投诉状态:<span>{{
            currentSuggest.state === 0 ? '未回复' : '已回复'
          }}</span>
        </p>
        <p class="breif">
          投诉图片:
          <span>
            <img :src="bindUrl(currentSuggest.imgUrl)" alt="" width="100" height="100" />
          </span>
        </p>
        <p>
          投诉回复:<span class="mark">{{
            currentSuggest.content || '暂未回复'
          }}</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isSuggesDetailtDialog = false" size="mini">关闭
        </el-button>
      </span>
    </el-dialog>
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
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
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
      passwordRules: {
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
      },
      // 3
      borrowTable: [],
      // 4
      suggestTable: [],
      currentSuggest: {},
      isSuggesDetailtDialog: false,
      query: {
        page: 1,
        size: 10
      },
      total: 10,
      allBorrow: []
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
    initData() {
      this.userInfoForm = {}
      this.passwordForm = {}
      this.borrowTable = {}
      this.suggestTable = {}
    },
    // 1----
    async handleUserInfo() {
      // this.initData()
      this.userInfoForm = this.convertDeepCopy(this.$store.state.user)
      // console.log(this.userInfoForm)
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
      // this.initData()
    },
    submitChangePassword(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        const { data, status } = await this.$http.get('/user/changePassword', {
          params: {
            id: this.currentUser.id,
            password: this.passwordForm.newPassword
          }
        })
        if (status === 200) {
          if (data.success) {
            this.passwordForm = {}
            this.$message.success('修改成功')
          } else {
            this.$message.error('修改失败')
          }
        } else {
          this.$message.waring('请求失败')
        }
      })
    },
    // 3----
    async handleBorrowRecords() {
      await this.getAllBorrow()
      this.borrowTable = this.allBorrow.filter((item) => {
        return item.userId === this.currentUser.id
      })
    },
    async returnBook(formData) {
      const form = this.convertDeepCopy(formData)
      form.state = 4
      const { data, status } = await this.$http.put(
        '/borrow/updateIgnoreNull',
        form
      )
      if (status === 200) {
        if (data.success) {
          this.$message.success('归还中,等待审核')
          this.handleBorrowRecords()
        } else {
          this.$message.error('归还失败')
        }
      } else {
        this.$message.waring('请求失败')
      }
    },
    // 4----
    async handleSuggestRecords() {
      // this.initData()
      const { data, status } = await this.$http.get(
        '/addvice/getListByUserId',
        {
          params: {
            id: this.currentUser.id
          }
        }
      )
      if (status === 200) {
        this.suggestTable = data
      } else {
        this.$message.error('请求失败')
      }
    },
    // 显示投诉详情
    async showSuggestDetail(formData) {
      this.currentSuggest = formData
      this.isSuggesDetailtDialog = true
      const file = await this.getFileById(this.currentSuggest.id)
      this.$set(this.currentSuggest, 'imgUrl', file.name)
    },
    async getAllBorrow() {
      const { data, status } = await this.$http.get('/borrow/list')
      if (status === 200) {
        this.allBorrow = data
      } else {
        this.$message.waring('请求失败')
      }
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
  async created() {
    this.handleActive()
    this.currentUser = this.$store.state.user
    const file = await this.getFileById(this.currentUser.id)
    this.$set(this.currentUser, 'imgUrl', file.name)
  }
}
</script>

<style lang="less" scoped>
.info {
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
    // .suggest-records
  }
  .suggest-detail {
    .content {
      letter-spacing: 2px;
      p {
        line-height: 26px;
        color: #000;
        margin-bottom: 4px;
        span {
          display: block;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 4px 20px;
          box-sizing: border-box;
          color: #666;
        }
        span img {
          vertical-align: top;
        }
      }
      .mark {
        background-color: #f3f3f3;
      }
    }
  }
}
</style>
