<template>
  <el-card class="User">
    <el-container>
      <el-header style="height:30px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'user' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="success" class="add-btn" size="mini" @click="showDialog(0)"
          plain>添加用户</el-button>
      </el-header>
      <el-main>
        <!-- table -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="username" label="账号" min-width="100">
          </el-table-column>
          <el-table-column prop="name" label="姓名" min-width="100">
          </el-table-column>
          <el-table-column prop="level" label="身份" min-width="100">
            <template v-slot="{row}">
              <el-tag :type="levelState[row.level].type" effect="dark">
                {{levelState[row.level].name}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="100">
            <template v-slot="{row}">
              {{row.createTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" min-width="100">
            <template v-slot="{row}">
              {{row.createTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column min-width="100">
            <template slot="header" slot-scope="scope">
              <el-input v-model="query.keyword" size="mini" placeholder="输入关键字搜索"
                :clearable="true" @clear="clearIpt(fetchData,scope)">
                <!-- tag 解决报错 -->
                <el-button slot="append" icon="el-icon-search" @click="fetchData">
                </el-button>
              </el-input>
            </template>
            <template slot-scope="scope">
              <el-link type="primary" :underline="false" @click="showDialog(1,scope.row)">
                修改用户
              </el-link>
              <el-link type="danger" :underline="false"
                @click="deleteById($api.deleteUser,fetchData,scope.row.id,'用户')">
                删除用户
              </el-link>
              <el-link type="warning" :underline="false"
                @click="resetPassword(scope.row.id)">重置密码
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-pagination @size-change="handleSizeChange($event,fetch)"
        @current-change="handleCurrentChange($event,fetch)" :page-sizes="[1, 2, 5, 10]"
        layout="total,sizes, prev, pager, next" :total="total">
      </el-pagination>
    </el-container>
    <!-- dialog -->
    <el-dialog :title="['添加用户','修改用户'][this.form.flag]" :visible.sync="dialogFormVisible"
      width="30%" @close="clearDialog('form')">
      <el-form :model="form" size="small" label-width="60px" ref="form" :rules="rules">
        <el-form-item label="头像" prop="imgUrl">
          <el-upload class="avatar-uploader" :action="bindIMG('util/uploadfile')"
            :show-file-list="false" :on-success="handleAvatarSuccess" name="files"
            :data="uploadInfo">
            <img v-if="form.imgUrl" :src="bindIMG(form.imgUrl)" class="avatar"
              ref="preview" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" autocomplete="off"
            :disabled="form.flag === 1"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="level">
          <el-radio :label="item.id" v-for="item in levelState" :key="item.id"
            v-model="form.level">{{item.name}}
          </el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitDialog('form')" size="small">
          {{['添加','修改'][this.form.flag]}}
        </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import mixins from '@mixins'
import { levelState, ADD, EDIT, DEFAULT_PWD } from '@static'
import { deepClone, bindIMG } from '@utils'
export default {
  data() {
    return {
      tableData: [],
      form: {},
      rules: {
        imgUrl: [{ required: true, message: '请选择头像', trigger: 'blur' }],
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, message: '电子邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        level: [{ required: true, message: '请选择身份', trigger: 'blur' }]
      },
      levelState,
      dialogFormVisible: false,
      visible: false,
      uploadInfo: {}
    }
  },
  mixins: [mixins.admin],
  methods: {
    bindIMG,
    async fetchData() {
      const { list, total } = await this.$api.getUserList(this.query)
      this.tableData = list
      this.total = total
    },
    showDialog(flag, data) {
      this.dialogFormVisible = true
      if (flag === ADD) {
        this.form.flag = flag
      } else if (flag === EDIT) {
        this.$nextTick(() => {
          this.form = deepClone(data)
          this.form.flag = flag
          this.uploadInfo = { id: this.form.id }
        })
      }
    },
    resetPassword(id) {
      this.$confirm('即将重置密码，是否继续 ~', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { success } = await this.$api.changePassword({
            id,
            password: DEFAULT_PWD
          })
          if (success) {
            this.$message.success('重置成功,密码为:123456')
          } else {
            this.$message.error('重置失败')
          }
        })
        .catch(() => {
          this.$message.warning('已取消重置')
        })
    },
    async handleAvatarSuccess(res, file) {
      this.$set(this.form, 'imgUrl', file.name)
      if (this.form.flag === ADD) {
        this.form.id = res
      }
      // console.log(file)
      // const data = {
      //   updateTime: Date.now(),
      //   filename: file.name,
      //   size: file.size
      // }
      // if (this.form.flag === ADD) {
      //   data.createTime = Date.now()
      //   data.userId = res
      //   const res = await this.$api.addFile(data)
      //   console.log(res)
      // } else if (this.form.flag === EDIT) {
      //   data.userId = this.form.id
      //   const res = await this.$api.editFile(data)
      //   console.log(res)
      // }
    },
    submitDialog(formName, flag) {
      // console.log(this.$refs, flag)
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        console.log(this.form.flag)
        console.log(this[formName])
      })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="less" scoped>
.el-link {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
.el-pagination {
  margin-top: 10px;
  margin-left: 20px;
}
.el-header {
  position: relative;
  .add-btn {
    position: absolute;
    top: 0;
    right: 20px;
  }
}
.avatar {
  width: 80px;
  height: 80px;
}

/deep/.el-upload {
  position: relative;
  line-height: 0;
  border-radius: 2px;
  border: 2px dashed rgba(0 0 0 / 0.2);
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
  }
}
</style>
