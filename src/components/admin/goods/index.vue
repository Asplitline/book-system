<template>
  <div class="goods">
    <div class="split-line">
      <span> <i class="iconfont icon-unorderedlist"></i> 书籍管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="query.keyword"
          class="input-with-select"
          clearable
          @clear="getBooks()"
          size="small"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getBooks()"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button
          type="success"
          size="small"
          @click="showAddBookDialog()"
          plain
        >
          添加书籍</el-button
        >
      </el-col>
    </el-row>
    <!-- 用户表单 -->
    <el-table :data="bookList" stripe style="width: 100%" max-height="500">
      <el-table-column prop="bm" label="书籍编号" min-width="150">
      </el-table-column>
      <el-table-column prop="name" label="书名" min-width="150">
      </el-table-column>
      <el-table-column prop="lx" label="书籍类型" min-width="150">
      </el-table-column>
      <el-table-column prop="author" label="作者" min-width="150">
      </el-table-column>
      <el-table-column prop="number" label="数量" min-width="50">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template v-slot="{ row }">
          <el-tooltip
            class="item"
            effect="dark"
            content="修改书籍"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showEditBookDialog(row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除书籍"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deleteBookById(row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="书籍详情"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="warning"
              icon="el-icon-tickets"
              size="small"
              @click="showBookDetail(row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加书籍对话框 -->
    <el-dialog
      :visible.sync="isAddBookDialog"
      width="30%"
      class="book-dialog"
      @close="clearDialog('addBookForm')"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addBookForm"
        :rules="bookRules"
        ref="addBookForm"
        size="mini"
        :hide-required-asterisk="true"
      >
        <el-form-item label="书名" prop="name">
          <el-input v-model="addBookForm.name"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="bm">
          <el-input v-model="addBookForm.bm"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="addBookForm.author"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input v-model="addBookForm.number" type="number"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="lx">
          <el-select v-model="addBookForm.lx" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="description">
          <el-input
            v-model="addBookForm.description"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            :action="bindImg('util/uploadfile')"
            :show-file-list="false"
            :on-success="handleAddAvatarSuccess"
            name="files"
          >
            <img
              v-if="addBookForm.imageUrl"
              :src="bindUrl(addBookForm.imageUrl)"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddBookDialog = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="submitBookForm('addBookForm')"
          size="small"
          >添 加</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改书籍对话框 -->
    <el-dialog
      :visible.sync="isEditBookDialog"
      width="30%"
      class="book-dialog"
      @close="clearDialog('editBookForm')"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editBookForm"
        :rules="bookRules"
        ref="editBookForm"
        size="mini"
        :hide-required-asterisk="true"
      >
        <el-form-item label="书名" prop="name">
          <el-input v-model="editBookForm.name"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="bm">
          <el-input v-model="editBookForm.bm"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="editBookForm.author"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="numebr">
          <el-input v-model="editBookForm.number" type="number"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="lx">
          <el-select v-model="editBookForm.lx" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="description">
          <el-input
            v-model="editBookForm.description"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            :action="bindImg('util/uploadfile')"
            :show-file-list="false"
            :on-success="handleEditAvatarSuccess"
            name="files"
            :data="{ id: editBookForm.fileId }"
          >
            <img
              v-if="editBookForm.imageUrl"
              :src="bindUrl(editBookForm.imageUrl)"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEditBookDialog = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="submitBookForm('editBookForm')"
          size="small"
          >修 改</el-button
        >
      </span>
    </el-dialog>
    <!-- 书籍详情 -->
    <el-dialog :visible.sync="isBookDetailDialog" width="28%" center>
      <div class="detail-container">
        <div class="info">
          <img :src="bindUrl(currentBook.imageUrl)" alt="" class="cover" />
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const ADD = 0
const EDIT = 1
export default {
  data() {
    return {
      bookList: [],
      query: {
        page: 1, // 当前页
        size: 10, // 最大页数
        keyword: null
      },
      total: 10,
      addBookForm: {},
      editBookForm: {},
      bookRules: {
        bm: [{ required: true, message: '输入书籍编号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入书名', trigger: 'blur' }],
        lx: [{ required: true, message: '请选择书籍分类', trigger: 'blur' }],
        author: [
          { required: true, message: '请输入书籍作者', trigger: 'blur' }
        ],
        number: [
          {
            required: true,
            message: '请输入书籍数量',
            trigger: 'blur'
          }
        ],
        imageUrl: [
          { required: true, message: '请选择书籍封面', trigger: 'blur' }
        ]
      },
      isAddBookDialog: false,
      isEditBookDialog: false,
      isBookDetailDialog: false,
      // example
      options: [
        '文学',
        '历史地理',
        '哲学宗教',
        '艺术',
        '科教文体',
        '综合性图书',
        '政治法律',
        '漫画绘本',
        '生物科学',
        '心理',
        '语言文字',
        '建筑',
        '工具书',
        '医药卫生',
        '天文与地球科学',
        '工业技术',
        '环境科学',
        '经济',
        '社会科学',
        '数理及化学',
        '马列毛邓',
        '军事'
      ],
      currentBook: {}
    }
  },
  methods: {
    ...mapActions(['getFileById']),
    // 获取图书列表
    async getBooks() {
      const { data, status } = await this.$http.get('/book/pageBook', {
        params: this.query
      })
      if (status === 200) {
        const { list, total } = data
        this.total = total
        this.bookList = list
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 显示添加对话框
    showAddBookDialog() {
      this.isAddBookDialog = true
    },
    // 显示修改对话框
    async showEditBookDialog(formData) {
      this.isEditBookDialog = true
      this.editBookForm = this.convertDeepCopy(formData)
      const file = await this.getFileById(this.editBookForm.id)
      this.$set(this.editBookForm, 'imageUrl', file.name)
      this.editBookForm.fileId = file.id
    },
    // 书籍详情
    async showBookDetail(formData) {
      this.currentBook = this.convertDeepCopy(formData)
      const file = await this.getFileById(this.currentBook.id)
      this.$set(
        this.currentBook,
        'imageUrl',
        file.name === 'default_pic.png' ? 'book-default.gif' : file.name
      )
      this.isBookDetailDialog = true
    },
    // 最大页
    handleSizeChange(size) {
      this.query.size = size
      this.query.page = 1
      this.getBooks()
    },
    // 当前页
    handleCurrentChange(currentIndex) {
      this.query.page = currentIndex
      this.getBooks()
    },
    // 添加图片上传成功
    handleAddAvatarSuccess(res, file) {
      this.$set(this.addBookForm, 'imageUrl', file.name)
      this.addBookForm.id = res
    },
    // 修改图片上传成功
    handleEditAvatarSuccess(res, file) {
      this.$set(this.editBookForm, 'imageUrl', file.name)
    },
    // 清空对话框
    clearDialog(formName) {
      this.$refs[formName].resetFields()
    },
    // 提交图书表单
    submitBookForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        if (formName === 'addBookForm') {
          this.handleBookForm(this.addBookForm, '/book/insert', ADD)
        } else if (formName === 'editBookForm') {
          this.handleBookForm(this.editBookForm, '/book/updateIgnoreNull', EDIT)
        }
      })
    },
    // 处理图书表单
    async handleBookForm(formData, url, flag) {
      if (flag === ADD) {
        const { status, data } = await this.$http.post(url, formData)
        if (status === 200) {
          if (data.success) {
            this.isAddBookDialog = false
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
          }
        } else {
          this.$message.warning('请求失败')
        }
      } else if (flag === EDIT) {
        const { status, data } = await this.$http.put(url, formData)
        if (status === 200) {
          if (data.success) {
            this.isEditBookDialog = false
            this.$message.success('修改成功')
          } else {
            this.$message.error('修改失败')
          }
        } else {
          this.$message.warning('请求失败')
        }
      }
      this.getBooks()
    },
    // 删除图书
    deleteBookById(id) {
      this.$confirm('此操作将永久删除书籍, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { data, status } = await this.$http.delete('/book/delete', {
            params: {
              id
            }
          })
          if (status === 200) {
            if (data.success) {
              this.getBooks()
              this.$message.success('删除成功')
            } else {
              this.$message.error('删除失败')
            }
          } else {
            this.$message.warning('请求失败')
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  },
  created() {
    this.getBooks()
  }
}
</script>

<style lang="less" scoped>
.book-dialog {
  overflow: hidden;
  /deep/.el-dialog__body {
    padding: 20px;
  }
  .el-select {
    width: 100%;
  }
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
  // /deep/.el-dialog {
  //   .el-dialog__body {
  //     //border-top: 1px solid #dcdfe6;
  //     //border-bottom: 1px solid #dcdfe6;
  //     max-height: 500px !important;
  //     min-height: 100px;
  //     overflow-y: auto;
  //   }
  // }
  // 书籍详情
}
.detail-container {
  .info {
    display: flex;
    img {
      width: 35%;
      height: 52%;
    }
    .content {
      box-sizing: border-box;
      padding-left: 4%;
      flex: 1;
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
</style>
