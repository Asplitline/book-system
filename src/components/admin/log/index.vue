<template>
  <div class="logo">
    <div class="split-line">
      <span> <i class="iconfont icon-send"></i> 日志管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      <el-breadcrumb-item>日志列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入日志内容"
          v-model="query.keyword"
          class="input-with-select"
          clearable
          @clear="getLog()"
          size="small"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getLog()"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 日志表单 -->
    <el-table :data="logList" stripe style="width: 100%" max-height="500">
      <el-table-column prop="description" label="日志内容" min-width="100">
      </el-table-column>
      <el-table-column prop="lx" label="日志类型" min-width="100">
        <template v-slot="{ row }">
          {{ ['', '操作日志', '登录日志'][row.lx] }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="操作时间" min-width="100">
        <template v-slot="{ row }">
          {{ row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="所在IP" min-width="100">
      </el-table-column>
      <el-table-column label="操作" min-width="60">
        <template v-slot="{ row }">
          <el-tooltip
            class="item"
            effect="dark"
            content="删除日志"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deleteLog(row.id)"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      logList: [],
      query: {
        page: 1, // 当前页
        size: 10, // 最大页数
        keyword: null
      },
      total: 10
    }
  },
  methods: {
    // 获取日志
    async getLog() {
      const { data, status } = await this.$http.get('/logs/page', {
        params: this.query
      })
      if (status === 200) {
        const { list, total } = data
        this.total = total
        this.logList = list
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 选择最大页数
    handleSizeChange(size) {
      this.query.size = size
      this.query.page = 1
      this.getLog()
    },
    // 切换页数
    handleCurrentChange(currentIndex) {
      this.query.page = currentIndex
      this.getLog()
    },
    // 删除日志
    async deleteLog(id) {
      this.$confirm('此操作将永久删除日志, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { data, status } = await this.$http.delete('/logs/delete', {
            params: {
              id
            }
          })
          if (status === 200) {
            if (data.success) {
              this.getLog()
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
    this.getLog()
  }
}
</script>

<style>
</style>
