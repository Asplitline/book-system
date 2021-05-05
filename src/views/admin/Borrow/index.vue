<template>
  <el-card class="borrow">
    <el-container>
      <el-header style="height:30px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'book' }">借阅管理</el-breadcrumb-item>
          <el-breadcrumb-item>借阅列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <!-- table -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="bookName" label="借阅书籍" min-width="100">
          </el-table-column>
          <el-table-column prop="user.name" label="借阅人" min-width="100">
          </el-table-column>
          <el-table-column prop="state" label="当前状态" min-width="100">
            <template v-slot="{row}">
              <el-tag :type="borrowState[row.state].type" v-if="borrowState[row.state]">
                {{borrowState[row.state].name}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="借阅时间" min-width="100">
            <template v-slot="{row}">
              {{row.createTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="更新时间" min-width="100">
            <template v-slot="{row}">
              {{row.createTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column min-width="140">
            <template slot="header" slot-scope="scope">
              <el-input v-model="query.keyword" size="mini" placeholder="输入关键字搜索"
                :clearable="true" @clear="clearIpt(fetchData,scope)">
                <el-button slot="append" icon="el-icon-search" @click="fetchData">
                </el-button>
              </el-input>
            </template>
            <template slot-scope="{row}">
              <el-link type="warning" :underline="false" :disabled="row.state!==0"
                @click="handleBorrow(1,row)">
                拒绝借阅
              </el-link>
              <el-link type="success" :underline="false" :disabled="row.state!==0"
                @click="handleBorrow(2,row)">
                同意借阅
              </el-link>
              <el-link type="primary" :underline="false" :disabled="row.state!==3"
                @click="handleBorrow(4,row)">
                同意归还
              </el-link>
              <el-link type="danger" :underline="false"
                @click="deleteById($api.deleteBorrow,fetchData,row.id,'借阅')"
                :disabled="row.state!==1&&row.state!==4">
                删除借阅
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
import { borrowState } from '@static'
import { mapActions, mapGetters } from 'vuex'
import { deepClone } from '@utils'
export default {
  mixins: [mixins.admin],
  data() {
    return {
      rules: {},
      borrowState
    }
  },
  methods: {
    ...mapActions(['getAllUser']),
    async fetchData() {
      const { list, total } = await this.$api.getBorrowList(this.query)
      list.forEach((item) => {
        item.user = this.getUserById(item.userId)
      })
      this.tableData = list
      this.total = total
    },
    handleBorrow(flag, data) {
      const fInfo = ['', '拒绝借阅', '同意借阅', '', '同意归还'][flag]
      this.handleConfirm(fInfo, async () => {
        const tData = deepClone(data)
        tData.state = flag
        const { success } = await this.$api.editBorrow(tData)
        this.handleSuccess(success, fInfo, this.fetchData)
      })
    }
  },
  computed: {
    ...mapGetters(['getUserById'])
  },
  created() {
    this.fetchData()
    this.getAllUser(this)
  }
}
</script>

<style lang="less" scoped>
@import '~@css/aCommon.less';
</style>
