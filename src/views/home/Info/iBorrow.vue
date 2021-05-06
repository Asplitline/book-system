<template>
  <el-card class="i-borrow">
    <el-table :data="tableData" style="width: 100%" key="borrow">
      <el-table-column prop="bookName" label="书籍" min-width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="120">
        <template v-slot="{row}">{{row.createTime | formatDate}}</template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="120">
        <template v-slot="{row}">{{row.updateTime | formatDate}}</template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template v-slot="{row}">
          <el-tag :type="borrowState[row.state].type" v-if="borrowState[row.state]">
            {{borrowState[row.state].name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120px">
        <template v-slot="{row}">
          <el-link type="success" :underline="false" :disabled="row.state!==2"
            @click="returnBook(row)">
            归还图书
          </el-link>
          <el-link type="danger" :underline="false"
            @click="deleteById($api.deleteBorrow,fetchData,row.id,'勘误')"
            :disabled="row.state!==1 && row.state !== 4">
            删除记录
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import mixin from '@mixins'
import { borrowState } from '@static'
import { deepClone } from '@utils'
import { mapState } from 'vuex'
export default {
  mixins: [mixin.admin],
  data() {
    return {
      tableData: [],
      borrowState
    }
  },
  methods: {
    async fetchData() {
      this.query.keyword = this.user.id
      const { list, total } = await this.$api.getBorrowList(this.query)
      this.tableData = list.map((item) => {
        return item
      })
      this.total = total
    },
    returnBook(data) {
      const tData = deepClone(data)
      this.handleConfirm('归还图书', async () => {
        tData.state = 3
        const { success } = await this.$api.editBorrow(tData)
        if (success) {
          this.$message.success('归还请求提交中...等待管理员审核~')
          this.fetchData()
        } else {
          this.$message.error('归还失败...')
        }
      })
    }
  },
  computed: {
    ...mapState({ user: 'currentUser' })
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="less" scoped>
.el-link {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
