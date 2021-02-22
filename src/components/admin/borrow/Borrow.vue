<template>
  <div class="borrow">
    <div class="split-line">
      <span> <i class="iconfont icon-upload"></i> 借阅管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借阅管理</el-breadcrumb-item>
      <el-breadcrumb-item>借阅列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="query.keyword"
          class="input-with-select"
          clearable
          size="small"
          @clear="getBorrow()"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getBorrow()"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 报修表单 -->
    <el-table :data="borrowList" stripe style="width: 100%" max-height="500">
      <el-table-column prop="bookName" label="书名" min-width="120">
      </el-table-column>
      <el-table-column prop="userName" label="借阅人" min-width="120">
      </el-table-column>
      <!-- 0审核中，1审核不同意，3借取中，4归还中，5借取完成 -->
      <el-table-column prop="state" label="借阅状态" min-width="120">
        <template v-slot="{ row }">
          <el-tag v-if="row.state === 0" type="warning">审核中</el-tag>
          <el-tag v-if="row.state === 1" type="danger">不通过</el-tag>
          <el-tag v-if="row.state === 3">借阅中</el-tag>
          <el-tag v-if="row.state === 4" type="info">归还中</el-tag>
          <el-tag v-if="row.state === 5" type="success">已归还</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="发起时间" min-width="120">
        <template v-slot="{ row }">
          {{ row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template v-slot="{ row }">
          <el-tooltip
            class="item"
            effect="dark"
            content="借阅审核"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showBorrow(row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除借阅"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deleteBorrowById(row.id)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="确认归还"
            placement="top"
            :enterable="false"
            v-show="row.state === 4"
          >
            <el-button
              type="success"
              icon="el-icon-finished"
              size="small"
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
    <!-- 借阅对话框 -->
    <el-dialog :visible.sync="isBorrowDialog" width="30%" class="borrow-dialog">
      <ul>
        <li>
          书籍名称 :<span>{{ borrowForm.bookName }} </span>
        </li>
        <li>
          书籍作者 :<span>{{ currentBook.author }} </span>
        </li>
        <li>
          书籍类型 :<span>{{ currentBook.lx }}</span>
        </li>
        <li>
          借阅状态 :<span>{{
            ['审核中', '不通过', '', '借阅中', '归还中', '已归还'][
              borrowForm.state
            ]
          }}</span>
        </li>
        <li>
          申请时间 :<span>{{ borrowForm.createTime | formatDate }}</span>
        </li>
        <li>
          处理操作 :<span>
            <el-radio
              v-model="borrowForm.state"
              :label="3"
              :disabled="borrowForm.state > 0"
              >同意</el-radio
            >
            <el-radio
              v-model="borrowForm.state"
              :label="1"
              :disabled="borrowForm.state > 0"
              >拒绝</el-radio
            ></span
          >
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isBorrowDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitBorrow()" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      borrowList: [],
      query: {
        page: 1, // 当前页
        size: 10, // 最大页数
        keyword: null
      },
      total: 10,
      borrowForm: {},
      isBorrowDialog: false,
      currentBook: {}
    }
  },
  methods: {
    ...mapActions(['getBookById']),
    // 获取借阅列表
    async getBorrow() {
      const { data, status } = await this.$http.get('/borrow/pageBorrow', {
        params: this.query
      })
      if (status === 200) {
        const { total, list } = data
        this.total = total
        this.borrowList = list
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 借阅对话框
    async showBorrow(formData) {
      this.isBorrowDialog = true
      this.borrowForm = this.convertDeepCopy(formData)
      this.currentBook = await this.getBookById(this.borrowForm.bookId)
    },
    // 最大页
    handleSizeChange(size) {
      this.query.size = size
      this.query.page = 1
      this.getBorrow()
    },
    // 当前页
    handleCurrentChange(currentIndex) {
      this.query.page = currentIndex
    },
    // 提交借阅
    async submitBorrow() {
      if (this.borrowForm.state !== 1 && this.borrowForm.state !== 3) {
        this.$message.error('请选择 同意 or 拒绝')
        return
      }
      const { data, status } = await this.$http.put(
        '/borrow/updateIgnoreNull',
        this.borrowForm
      )

      if (status === 200) {
        if (data) {
          this.$message.success('提交成功')
          this.getBorrow()
          this.isBorrowDialog = false
        } else {
          this.$message.error('提交失败')
        }
      } else {
        this.$message.error('请求失败')
      }
    },
    // 通过id删除借阅
    async deleteBorrowById(id) {
      this.$confirm('此操作删除借阅记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { data, status } = await this.$http.delete('/borrow/delete', {
            params: {
              id
            }
          })
          if (status === 200) {
            if (data.success) {
              this.getBorrow()
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
    this.getBorrow()
  }
}
</script>

<style lang="less" scoped>
.borrow {
  /deep/ .el-dialog__body {
    padding: 20px;
  }
  .borrow-dialog {
    li {
      line-height: 30px;
      letter-spacing: 2px;
      span {
        margin-left: 10px;
      }
      .el-radio {
        margin-right: 12px;
      }
    }
  }
}
</style>
