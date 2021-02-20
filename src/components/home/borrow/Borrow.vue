<template>
  <div class="borrow">
    <el-card shadow="always">
      <!-- 搜索框 -->
      <el-row class="topSearch">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="query.keyword"
            @clear="getBooks"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getBooks()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" :offset="8">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-col>
      </el-row>
      <!-- 列表表格 -->
      <el-row class="bottomTable">
        <el-table :data="borrowList" style="width: 100%">
          <el-table-column prop="bm" label="书籍编号" min-width="80">
          </el-table-column>
          <el-table-column prop="name" label="书籍名称" min-width="160">
          </el-table-column>
          <el-table-column prop="lx" label="书籍类型" min-width="100">
          </el-table-column>
          <el-table-column prop="number" label="书籍数量" min-width="80">
          </el-table-column>
          <el-table-column
            prop="description"
            label="书籍描述"
            min-width="240"
            class="desc"
          >
            <template v-slot="{ row }">
              {{ row.description === 'string' ? '暂无描述' : row.description }}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="200">
            <template v-slot="{ row }">
              <el-button type="primary" size="mini" @click="showBookDetail(row)"
                >详情</el-button
              >
              <el-button
                type="success"
                size="mini"
                @click="requestBorrow(row)"
                :disabled="getStateById(row.id) >= 0"
                >借取</el-button
              >

              <el-button type="warning" size="mini" @click="showBookRepair(row)"
                >报修</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!-- 对话框 -->
    <!-- 书籍详情 -->
    <el-dialog :visible.sync="isBookDetailDialog" width="36%" center>
      <div class="detail-container">
        <div class="info">
          <img
            :src="bindUrl('s1426466.jpg')"
            alt=""
            width="40%"
            height="64%"
            class="cover"
          />
          <div class="content">
            <p>
              <i class="icon-slack iconfont"></i>编号:<span>{{
                currentBook.bm
              }}</span>
            </p>
            <p>
              <i class="icon-tag-fill iconfont"></i>名称:<span>{{
                currentBook.name
              }}</span>
            </p>
            <p>
              <i class="el-icon-s-flag"></i>类型:<span>{{
                currentBook.lx
              }}</span>
            </p>
            <p>
              <i class="el-icon-s-custom"></i>作者:<span>{{
                currentBook.author
              }}</span>
            </p>
            <p class="breif">
              <i class="el-icon-s-promotion"></i>简介<br />
              <span>{{
                currentBook.description === 'string'
                  ? '暂无简介'
                  : currentBook.description
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 书籍报修 -->
    <el-dialog
      title="新增报修"
      :visible.sync="isBookRepairDialog"
      width="30%"
      @close="handleDialogClose('bookRepairForm')"
      class="book-repair-dialog"
      :close-on-click-modal="false"
    >
      <el-form
        :model="bookRepairForm"
        :rules="bookRepairRules"
        ref="bookRepairForm"
      >
        <el-form-item label="报修原因" prop="description">
          <el-input
            v-model="bookRepairForm.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6 }"
            resize="none"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片说明" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            :action="bindImg('util/uploadfile')"
            :show-file-list="false"
            :on-success="handleAddAvatarSuccess"
            name="files"
          >
            <img
              v-if="bookRepairForm.imageUrl"
              :src="bookRepairForm.imageUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isBookRepairDialog = false" size="mini"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="submitRepairInfo('bookRepairForm')"
          size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 报修图片对话框 -->
    <el-dialog :visible.sync="isRepairImgDialog" width="30%">
      <img width="100%" :src="repairImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        keyword: null,
        page: 1,
        size: 10
      },
      total: 0,
      borrowList: [],
      isBookDetailDialog: false,
      isBookRepairDialog: false,
      bookRepairForm: {},
      bookRepairRules: {
        description: [
          { required: true, message: '请输入报修信息', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ]
      },
      isRepairImgDialog: false,
      repairImageUrl: '',
      fileList: [],
      currentBook: {},
      borrowInfo: {},
      borrowStatus: {}
    }
  },
  methods: {
    // 获取书籍列表
    async getBooks() {
      const { data, status } = await this.$http.get('/book/pageBook', {
        params: this.query
      })
      if (status === 200) {
        const { list, total } = data
        this.borrowList = list
        this.total = total
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 处理当前页
    handleCurrentChange(currentPage) {
      this.query.page = currentPage
      this.getBooks()
    },
    // 显示图书详情
    showBookDetail(data) {
      this.isBookDetailDialog = true
      this.currentBook = data
    },
    // 显示图书报修
    showBookRepair(data) {
      this.isBookRepairDialog = true
      this.currentBook = data
    },
    // 清空对话框
    handleDialogClose(formName) {
      this.$refs[formName].resetFields()
    },
    // 提交信息
    submitRepairInfo(formName) {
      const current = this.isLoginAndGetCommonInfo()
      if (current === null) {
        return
      }
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        // this.$refs.upload.submit()
        Object.assign(this.bookRepairForm, current)
        const { status, data } = await this.$http.post(
          '/repair/insert',
          this.bookRepairForm
        )
        if (status === 200) {
          if (data.success) {
            this.$message.success('报修成功，等待审核')
            this.isBookRepairDialog = false
          } else {
            this.$message.warning('报修失败')
          }
        } else {
          this.$message.warning('请求失败')
        }
      })
    },
    // 获取借阅列表
    async handleBorrowStatus() {
      const { data } = await this.$http.get('/borrow/list')
      this.borrowStatus = data
    },
    // 处理借阅表单
    getStateById(bid) {
      const item = this.borrowStatus.find((item) => item.bookId === bid)
      return item && item.state
    },
    // 申请借阅
    async requestBorrow(formData) {
      this.currentBook = formData
      const current = this.isLoginAndGetCommonInfo()
      if (current === null) {
        return
      }
      const { data, status } = await this.$http.post('/borrow/insert', current)
      if (status === 200) {
        if (data.success) {
          this.handleBorrowStatus()
          this.$message.success('申请借阅成功，等待审核')
        } else {
          this.$message.error('申请借阅失败')
        }
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 图片上传后回显
    handleAddAvatarSuccess(res, file) {
      this.$set(this.bookRepairForm, 'imageUrl', URL.createObjectURL(file.raw))
    },
    // 登录判断并获取公共信息
    isLoginAndGetCommonInfo() {
      const currentUr = this.$store.state.user
      const currentBk = this.currentBook
      if (currentUr === null) {
        this.$message.error('请先登录')
        return null
      } else {
        return {
          userId: currentUr.id,
          username: currentUr.username,
          bookId: currentBk.id,
          bookName: currentBk.name,
          id: '',
          state: 0
        }
      }
    }
  },
  created() {
    this.getBooks()
    this.handleBorrowStatus()
  }
}
</script>

<style lang="less" scoped>
// 搜索框
.topSearch {
  // 自定义分页样式
  margin-bottom: 24px;
  .el-pagination {
    font-size: 18px;
    margin-top: 6px;

    /deep/ .btn-next .el-icon,
    /deep/ .btn-prev .el-icon {
      font-size: 18px;
    }

    /deep/ .el-pager li {
      font-size: 16px;
      font-weight: 550;
    }
  }
}
// 表格
.bottomTable {
  border-radius: 6px;
  // overflow: hidden;
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.2);
  /deep/.el-table__row td:nth-child(5) .cell {
    overflow: hidden;
    white-space: nowrap; /* 设置文本不换行，单行显示 */
    text-overflow: ellipsis; /* 超出的文本使用省略号代替 */
  }
}
// 书籍详情
.detail-container {
  .info {
    display: flex;
    .content {
      box-sizing: border-box;
      padding-left: 4%;
      p {
        color: #000;
        letter-spacing: 2px;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        .iconfont {
          vertical-align: bottom;
        }
        span {
          color: #888;
        }
      }

      p:first-child {
        padding-top: 0;
      }

      .breif {
        border-bottom: none;
        i {
          margin-bottom: 6px;
        }
      }
    }
  }
}
// 书籍报修
.book-repair-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  /deep/.el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 97px;
    i {
      font-size: 16px;
    }
  }
}
.borrow {
  /deep/.el-upload {
    position: relative;
    border: 2px dashed rgba(0, 0, 0, 0.1);
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
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
    }
  }
}
</style>
