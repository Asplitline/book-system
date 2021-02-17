<template>
  <div class="suggest">
    <el-card shadow="always">
      <!-- 搜索框 -->
      <el-row class="topSearch">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="query.keyword"
            @clear="a = 1"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="a = 2"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button class="add-suggest" @click="showSuggestDialog"
            >添加投诉</el-button
          >
        </el-col>
        <el-col :span="8" :offset="4">
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
        <el-table :data="suggestTable" style="width: 100%">
          <el-table-column prop="bm" label="投诉标题" min-width="100">
          </el-table-column>
          <el-table-column prop="bm" label="投诉时间" min-width="100">
          </el-table-column>
          <el-table-column prop="bm" label="投诉状态" min-width="100">
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <el-button type="primary" size="mini">详情</el-button>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!-- 添加投诉对话框 -->
    <el-dialog title="提示" :visible.sync="isSuggestDialog" width="40%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isSuggestDialog = false" size="mini"
          >取 消</el-button
        >
        <el-button type="primary" @click="isSuggestDialog = false" size="mini"
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
      query: {
        keyword: null,
        page: 1,
        size: 10
      },
      total: 10,
      suggestTable: [{}],
      isSuggestDialog: false
    }
  },
  methods: {
    //
    handleCurrentChange(currentIndex) {
      this.query.page = currentIndex
      console.log(this.query)
    },
    // 处理
    showSuggestDialog() {
      this.isSuggestDialog = true
    }
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
  .add-suggest {
    margin-left: 14px;
  }
}

// 表格
.bottomTable {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.2);
}
</style>
