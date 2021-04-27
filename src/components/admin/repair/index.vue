<template>
  <div class="repair">
    <div class="split-line">
      <span> <i class="iconfont icon-setting"></i> 报修管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报修管理</el-breadcrumb-item>
      <el-breadcrumb-item>报修列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="query.keyword"
          class="input-with-select"
          clearable
          @clear="getRepair()"
          size="small"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getRepair()"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 报修表单 -->
    <el-table :data="repairList" stripe style="width: 100%" max-height="500">
      <el-table-column prop="bookName" label="报修书籍" min-width="100">
      </el-table-column>
      <el-table-column prop="username" label="报修用户" min-width="100">
      </el-table-column>
      <el-table-column prop="description" label="报修描述" min-width="120">
      </el-table-column>
      <el-table-column prop="state" label="报修状态" min-width="120">
        <template v-slot="{ row }">
          <el-tag v-if="row.state === 0" type="waring">审批中</el-tag>
          <el-tag v-else-if="row.state === 1" type="info">无故障</el-tag>
          <el-tag v-else-if="row.state === 2" type="danger">修复中</el-tag>
          <el-tag v-else type="success">已修复</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="报修时间" min-width="120">
        <template v-slot="{ row }">
          {{ row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template v-slot="{ row }">
          <el-tooltip
            class="item"
            effect="dark"
            content="处理报修"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showRepair(row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除报修"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deleteRepairById(row.id)"
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
    <!-- 报修对话框 -->
    <el-dialog :visible.sync="isRepairDialog" width="30%">
      <div class="content">
        <p>
          报修编号:<span>{{ repairForm.id }}</span>
        </p>
        <p>
          报修内容:<span class="mark">{{ repairForm.description }}</span>
        </p>
        <p>
          报修时间:<span>{{ repairForm.createTime | formatDate }}</span>
        </p>
        <p>
          报修状态:<span>{{
            ['审批中', '无故障', '修复中', '已修复'][repairForm.state]
          }}</span>
        </p>
        <p class="breif">
          报修图片:
          <span>
            <img
              :src="bindUrl(repairForm.imgUrl)"
              alt=""
              width="100"
              height="100"
            />
          </span>
        </p>
        <p>
          修改进度：
          <span>
            <el-radio
              v-model="repairForm.state"
              :label="0"
              :disabled="repairForm.state > 0"
              >审批中</el-radio
            >
            <el-radio
              v-model="repairForm.state"
              :label="1"
              :disabled="repairForm.state > 1"
              >无故障</el-radio
            >
            <el-radio
              v-model="repairForm.state"
              :label="2"
              :disabled="repairForm.state > 2"
              >修复中</el-radio
            >
            <el-radio
              v-model="repairForm.state"
              :label="3"
              :disabled="repairForm.state === 3"
              >已修复</el-radio
            >
          </span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isRepairDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitRepair()" size="mini"
          >更 新</el-button
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
      repairList: [],
      query: {
        page: 1, // 当前页
        size: 10, // 最大页数
        keyword: null
      },
      total: 10,
      repairForm: {},
      isRepairDialog: false
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
        this.repairList = list
        this.total = total
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 显示报修对话框
    async showRepair(formData) {
      this.isRepairDialog = true
      this.repairForm = this.convertDeepCopy(formData)
      const file = await this.getFileById(this.repairForm.id)
      console.log(file)
      this.$set(this.repairForm, 'imgUrl', file.name)
    },
    // 提交进度
    async submitRepair() {
      const { data, status } = await this.$http.put(
        '/repair/updateIgnoreNull',
        this.repairForm
      )
      if (status === 200) {
        if (data) {
          this.$message.success('更新成功')
          this.isRepairDialog = false
          this.getRepair()
        } else {
          this.$message.error('更新失败')
        }
      } else {
        this.$message.warning('请求失败')
      }
      console.log(this.repairForm)
    },
    // 当前页
    handleSizeChange(size) {
      this.query.size = size
      this.query.page = 1
      this.getRepair()
    },
    // 最大页
    handleCurrentChange(currentIndex) {
      this.query.page = currentIndex
      this.getRepair()
    },
    // 通过id删除报修
    deleteRepairById(id) {
      this.$confirm('此操作将永久删除报修, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { data, status } = await this.$http.delete('/repair/delete', {
            params: {
              id
            }
          })
          if (status === 200) {
            if (data) {
              this.$message.success('删除成功')
              this.getRepair()
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
    this.getRepair()
  }
}
</script>

<style lang="less" scoped>
.repair {
  /deep/.el-upload {
    position: relative;
    border: 2px dashed rgba(0, 0, 0, 0.1);
    line-height: 0;
    border-radius: 2px;
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
      box-shadow: 0px 1px 2px 1px rgba(0 0 0 / 0.2);
    }
    &:hover {
      border: 2px dashed #ff525278;
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
    }
  }
  /deep/.el-form-item__label {
    text-align-last: left;
    width: 100%;
  }
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
