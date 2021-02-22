<template>
  <div class="repair">
    <el-card shadow="always">
      <!-- 搜索框 -->
      <el-row class="topSearch">
        <el-col :span="8">
          <el-input
            placeholder="请输入书籍名称"
            v-model="query.keyword"
            @clear="getRepair()"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getRepair()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" :offset="8">
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
        <el-table :data="repairTable" style="width: 100%">
          <el-table-column prop="id" label="报修编码" min-width="200">
          </el-table-column>
          <el-table-column prop="bookName" label="报修书籍" min-width="100">
          </el-table-column>
          <el-table-column prop="description" label="报修内容" min-width="100">
          </el-table-column>
          <!-- 0审批中，1无故障，2修复中，3已修复 -->
          <el-table-column prop="state" label="报修状态" min-width="60">
            <template v-slot="{ row }">
              <el-tag v-if="row.state === 0" type="waring">审批中</el-tag>
              <el-tag v-else-if="row.state === 1" type="info">无故障</el-tag>
              <el-tag v-else-if="row.state === 2" type="danger">修复中</el-tag>
              <el-tag v-else type="success">已修复</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="报修时间" min-width="100">
            <template v-slot="{ row }">
              {{ row.createTime | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="80">
            <template v-slot="{ row }">
              <el-button
                type="primary"
                size="mini"
                @click="showRepairtDetailDialog(row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!-- 报修详情对话框 -->
    <el-dialog :visible.sync="isRepairDetailtDialog" width="30%">
      <div class="content">
        <p>
          报修编码:<span>{{ repairFormDetail.id }}</span>
        </p>
        <p>
          报修书籍:<span class="mark">{{ repairFormDetail.bookName }}</span>
        </p>
        <p>
          报修用户:<span>{{ repairFormDetail.username }}</span>
        </p>
        <p>
          报修内容:<span class="mark">{{ repairFormDetail.description }}</span>
        </p>
        <p>
          报修时间:<span>{{ repairFormDetail.createTime | formatDate }}</span>
        </p>
        <p>
          当前进度:<span class="mark">{{
            ['审批中', '无故障', '修复中', '已修复'][repairFormDetail.state]
          }}</span>
        </p>
        <p class="breif">
          图片说明:
          <span>
            <img
              :src="bindUrl(repairFormDetail.imageUrl)"
              alt=""
              width="100"
              height="100"
            />
          </span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="isRepairDetailtDialog = false"
          size="mini"
          >关闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      query: {
        keyword: null,
        page: 1,
        size: 10
      },
      total: 10,
      isRepairDialog: false,
      repairTable: [],
      repairFormDetail: {},
      isRepairDetailtDialog: false
    }
  },
  methods: {
    ...mapActions(['getFileById']),
    // 获取报修列表
    async getRepair() {
      const { data, status } = await this.$http.get('/repair/pageRepair', {
        params: this.query
      })
      if (status === 200) {
        const { list, total } = data
        this.repairTable = list
        this.total = total
      } else {
        this.$message.error('请求失败')
      }
    },
    // 当前页
    handleCurrentChange(currentIndex) {
      this.query.page = currentIndex
      this.getRepair()
    },
    // 显示报修详情
    async showRepairtDetailDialog(formData) {
      this.isRepairDetailtDialog = true
      this.repairFormDetail = formData
      const file = await this.getFileById(this.repairFormDetail.id)
      this.$set(this.repairFormDetail, 'imageUrl', file.name)
    }
  },
  created() {
    this.getRepair()
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

.repair {
  .content {
    letter-spacing: 2px;
    p {
      line-height: 26px;
      color: #000;
      margin-bottom: 4px;
      span {
        display: block;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 20px;
        box-sizing: border-box;
        color: #666;
      }
      span img {
        vertical-align: top;
      }
    }
    .mark {
      background-color: #f3f3f3;
    }
  }
}
</style>
