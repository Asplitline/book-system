<template>
  <div class="borrow">
    <el-card shadow="always">
      <el-row class="topSearch">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="keyWord" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" :offset="8">
          <el-pagination layout="prev, pager, next" :total="50">
          </el-pagination>
        </el-col>
      </el-row>

      <el-row class="bottomTable">
        <el-table :data="borrowTable" style="width: 100%">
          <el-table-column prop="id" label="书籍编号" min-width="100">
          </el-table-column>
          <el-table-column prop="name" label="书籍名称" width="180">
          </el-table-column>
          <el-table-column prop="lx" label="书籍类型"> </el-table-column>
          <el-table-column prop="number" label="书籍数量" width="180">
          </el-table-column>
          <el-table-column prop="description" label="书籍描述" width="180">
          </el-table-column>
          <el-table-column label="操作" min-width="140">
            <el-button type="primary" size="mini">详情</el-button>
            <el-button type="success" size="mini">借取</el-button>
            <el-button type="info" size="mini">保修</el-button>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyWord: null,
      query: {
        keyWord: null,
        page: 0,
        size: 10
      },
      borrowTable: [{}]
    }
  },
  methods: {
    // 获取书籍列表
    async getBooks() {
      const res = await this.$http.get('/book/pageBook', this.query)
      console.log(res)
    }
  },
  created() {
    this.getBooks()
  }
}
</script>

<style lang="less" scoped>
.borrow {
}

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

.bottomTable {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.2);
}
</style>
