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
              @click="getBooks"
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
          <el-table-column prop="bm" label="书籍编号" min-width="100">
          </el-table-column>
          <el-table-column prop="name" label="书籍名称" min-width="160">
          </el-table-column>
          <el-table-column prop="lx" label="书籍类型" min-width="100">
          </el-table-column>
          <el-table-column prop="number" label="书籍数量" min-width="80">
          </el-table-column>
          <el-table-column prop="description" label="书籍描述" min-width="200">
          </el-table-column>
          <el-table-column label="操作" min-width="200">
            <el-button type="primary" size="mini" @click="showBookDetail"
              >详情</el-button
            >
            <el-button type="success" size="mini">借取</el-button>
            <el-button type="warning" size="mini" @click="showBookRepair"
              >报修</el-button
            >
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!-- 对话框 -->
    <!-- 书籍详情 -->
    <el-dialog :visible.sync="isBookDetailDialog" width="30%" center>
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
            <p><i class="icon-slack iconfont"></i>编号:<span>1</span></p>
            <p>
              <i class="icon-tag-fill iconfont"></i>名称:<span
                >凯尔特人之梦</span
              >
            </p>
            <p><i class="el-icon-s-flag"></i>类型:<span>文学</span></p>
            <p>
              <i class="el-icon-s-custom"></i>作者:<span
                >[秘鲁]马里奥·巴尔加斯·略萨</span
              >
            </p>
            <p class="breif">
              <i class="el-icon-s-promotion"></i>简介<br />
              <span
                >全书由十二封信的形式组成。除作为“附言”的末信外，第一二封信谈的都是些“大道理”，第三至第十一封信则具体探讨（长篇）小说的语言、风格、空间、时间、视角等等叙事形式和技巧问题。从纯粹实用的角度来看，写作者主要关心的恐怕都会是后者涉及的那些具体问题
              </span>
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
        <el-form-item label="图片说明" class="upload">
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
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
      fileList: []
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
    showBookDetail() {
      this.isBookDetailDialog = true
    },
    // 显示图书维修
    showBookRepair() {
      this.isBookRepairDialog = true
    },
    // 清空对话框
    handleDialogClose(formName) {
      this.$refs[formName].resetFields()
      this.$refs.upload.clearFiles()
    },
    // 显示报修图片
    handlePictureCardPreview(file) {
      this.repairImageUrl = file.url
      this.isRepairImgDialog = true
    },
    // 移除报修图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 提交信息
    submitRepairInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        // this.$refs.upload.submit()
        console.log(this.bookRepairForm)
      })
    }
  },
  created() {
    this.getBooks()
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
  overflow: hidden;
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.2);
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
  .upload {
    /deep/.el-form-item__label {
      text-align: left;
      width: 100%;
    }
    /deep/.el-upload-list--picture-card {
      .el-upload-list__item-actions,
      .el-upload-list__item-thumbnail,
      .el-upload-list__item {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>
