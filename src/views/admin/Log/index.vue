<template>
  <el-card class="log">
    <el-container>
      <el-header style="height:30px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'book' }">日志管理</el-breadcrumb-item>
          <el-breadcrumb-item>日志列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <!-- table -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="description" label="日志名" min-width="100">
          </el-table-column>
          <el-table-column prop="lx" label="类型" min-width="100">
            <template v-slot="{row}">
              {{['','操作日志','登录日志'][row.lx]}}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="100">
            <template v-slot="{row}">
              {{row.createTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column min-width="100">
            <template slot="header" slot-scope="scope">
              <el-input v-model="query.keyword" size="mini" placeholder="输入关键字搜索"
                :clearable="true" @clear="clearIpt(fetchData,scope)">
                <el-button slot="append" icon="el-icon-search" @click="fetchData">
                </el-button>
              </el-input>
            </template>
            <template slot-scope="{row}">
              <el-link type="danger" :underline="false"
                @click="deleteById($api.deleteLog,fetchData,row.id,'日志')">
                删除日志
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-pagination @size-change="handleSizeChange($event,fetchData)"
        @current-change="handleCurrentChange($event,fetchData)"
        :page-sizes="[1, 2, 5, 10]" layout="total,sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-container>
  </el-card>
</template>

<script>
import mixins from '@mixins'
export default {
  mixins: [mixins.admin],
  data() {
    return {}
  },
  methods: {
    async fetchData() {
      const { list, total } = await this.$api.getLogList(this.query)
      this.tableData = list
      this.total = total
    }
  },
  created() {
    this.fetchData()
  }
}
</script>
<style lang="less" scoped>
@import '~@css/aCommon.less';
</style>
