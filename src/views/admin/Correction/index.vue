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
          <el-table-column prop="bookName" label="书籍" min-width="80">
          </el-table-column>
          <el-table-column prop="description" label="内容" min-width="100">
          </el-table-column>
          <el-table-column prop="state" label="状态" min-width="80">
            <template v-slot="{row}">
              <el-tag :type="errataState[row.state].type" v-if="errataState[row.state]">
                {{errataState[row.state].name}}
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
                <el-button slot="append" icon="el-icon-search" @click="fetchData">
                </el-button>
              </el-input>
            </template>
            <template slot-scope="{row}">
              <el-link type="warning" :underline="false" @click="handleErrata(row,2)"
                :disabled="row.state!==0">
                驳回勘误
              </el-link>
              <el-link type="success" :underline="false" @click="handleErrata(row,1)"
                :disabled="row.state!==0">
                通过勘误
              </el-link>
              <el-link type="danger" :underline="false"
                @click="deleteById($api.deleteErrata,fetchData,row.id,'勘误')"
                :disabled="row.state===0">
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
import mixins from '@mixins'
import { errataState } from '@static'
import { deepClone } from '@utils'
export default {
  mixins: [mixins.admin],
  data() {
    return {
      errataState
    }
  },
  methods: {
    async fetchData() {
      const { list, total } = await this.$api.getErrataList(this.query)
      this.tableData = list.map((item) => {
        // item.lxInfo = this.getCategoryById(item.lx)
        return item
      })
      this.total = total
    },
    async handleErrata(data, flag) {
      this.handleConfirm(
        `${flag === 1 ? '通过用户勘误' : '拒绝用户勘误'}`,
        async () => {
          const tData = deepClone(data)
          tData.state = flag
          const { success } = await this.$api.editErrata(tData)
          this.handleSuccess(
            success,
            `${flag === 1 ? '通过勘误' : '拒绝勘误'}`,
            this.fetchData
          )
        }
      )
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
