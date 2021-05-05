<template>
  <el-card class="i-errata">
    <el-table :data="tableData" style="width: 100%" key="errata">
      <el-table-column prop="bookName" label="书籍" width="180">
      </el-table-column>
      <el-table-column prop="description" label="内容" width="180">
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template v-slot="{row}">
          <el-tag :type="errataState[row.state].type" v-if="errataState[row.state]">
            {{errataState[row.state].name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-link type="danger" :underline="false"
            @click="deleteById($api.deleteErrata,fetchData,row.id,'勘误')"
            :disabled="row.state===0">
            删除记录
          </el-link>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import mixin from '@mixins'
import { errataState } from '@static'
import { mapState } from 'vuex'
export default {
  mixins: [mixin.admin],
  data() {
    return {
      tableData: [],
      errataState
    }
  },
  methods: {
    async fetchData() {
      this.query.keyword = this.user.id
      const { list, total } = await this.$api.getErrataList(this.query)
      this.tableData = list.map((item) => {
        return item
      })
      this.total = total
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

<style>
</style>
