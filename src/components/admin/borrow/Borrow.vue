<template>
  <div class="borrow">
    <div class="split-line">
      <span> <i class="iconfont icon-upload"></i> 借还管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借还管理</el-breadcrumb-item>
      <el-breadcrumb-item>借还列表</el-breadcrumb-item>
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
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 报修表单 -->
    <el-table :data="borrowList" stripe style="width: 100%" max-height="600">
      <el-table-column prop="name" label="编号" min-width="100">
      </el-table-column>
      <el-table-column prop="username" label="书名" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="书籍类型" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="借取状态" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="归还状态" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="处理结果" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="发起时间" min-width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <el-tooltip
          class="item"
          effect="dark"
          content="借阅详情"
          placement="top"
          :enterable="false"
        >
          <el-button
            type="warning"
            icon="el-icon-tickets"
            size="small"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="借阅审核"
          placement="top"
          :enterable="false"
        >
          <el-button
            type="primary"
            icon="el-icon-edit-outline"
            size="small"
            @click="showBorrow"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="确认归还"
          placement="top"
          :enterable="false"
        >
          <el-button
            type="success"
            icon="el-icon-finished"
            size="small"
          ></el-button>
        </el-tooltip>
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
        <li>书籍编号 :<span>002</span></li>
        <li>书籍名称 :<span>东方快车谋杀案 </span></li>
        <li>书籍类型 :<span>文学</span></li>
        <li>借去状态 :<span>审批中</span></li>
        <li>处理状态 :<span>审批中</span></li>
        <li>发起时间 :<span>2021-1-5</span></li>
        <li>
          处理操作 :<span>
            <el-radio v-model="borrowStatus" label="0">同意</el-radio>
            <el-radio v-model="borrowStatus" label="1">拒绝</el-radio></span
          >
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isBorrowDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="isBorrowDialog = false" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borrowList: [{}],
      query: {
        page: 1, // 当前页
        size: 10, // 最大页数
        keyword: null
      },
      total: 10,
      borrowForm: {},
      borrowRules: {},
      isBorrowDialog: false,
      borrowStatus: 0
    }
  },
  methods: {
    // async getBorrow(){
    //   await this.
    // },
    showBorrow() {
      this.isBorrowDialog = true
    },
    handleSizeChange() {},
    handleCurrentChange() {}
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
