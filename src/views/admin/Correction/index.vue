<template>
  <el-card class="correction">
    <el-container>
      <el-header style="height:30px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'book' }">勘误管理</el-breadcrumb-item>
          <el-breadcrumb-item>勘误列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <!-- table -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="title" label="标题" min-width="80">
          </el-table-column>
          <el-table-column prop="description" label="内容" min-width="100">
          </el-table-column>
          <el-table-column prop="state" label="状态" min-width="80">
            <template v-slot="{row}">
              <el-tag :type="replyState[row.state].type" v-if="replyState[row.state]">
                {{replyState[row.state].name}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="100">
            <template v-slot="{row}">
              {{row.createTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" min-width="100">
            <template v-slot="{row}">
              {{row.updateTime | formatDate}}
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
            <template slot-scope="{row}">
              <el-link type="primary" :underline="false" @click="showDialog(1,row)">
                修改勘误
              </el-link>
              <el-link type="danger" :underline="false"
                @click="deleteById($api.deleteCorrection,fetchData,row.id,'勘误')">
                删除勘误
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
// todo delete correction
import mixins from '@mixins'
import { replyState } from '@static'
export default {
  mixins: [mixins.admin],
  data() {
    return {
      replyState
    }
  },
  methods: {
    async fetchData() {
      const { list, total } = await this.$api.getCorrectionList(this.query)
      this.tableData = list.map((item) => {
        // item.lxInfo = this.getCategoryById(item.lx)
        return item
      })
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
