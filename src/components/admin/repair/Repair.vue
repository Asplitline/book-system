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
          size="small"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 报修表单 -->
    <el-table :data="repairList" stripe style="width: 100%" max-height="600">
      <el-table-column prop="name" label="报修编号" min-width="100">
      </el-table-column>
      <el-table-column prop="username" label="报修描述" min-width="120">
      </el-table-column>
      <el-table-column prop="username" label="报修状态" min-width="120">
      </el-table-column>
      <el-table-column prop="username" label="报修时间" min-width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
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
            @click="showRepair"
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
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="报修详情"
          placement="top"
          :enterable="false"
        >
          <el-button
            type="warning"
            icon="el-icon-tickets"
            size="small"
          ></el-button>
        </el-tooltip>
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
      <el-form
        :model="repairForm"
        :rules="repairRules"
        ref="repairForm"
        size="mini"
      >
        <el-form-item label="报修编号" prop="name">
          <el-input v-model="repairForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="报修内容" prop="name">
          <el-input
            v-model="repairForm.name"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="报修状态" prop="name">
          <el-input v-model="repairForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="报修时间" prop="name">
          <el-input v-model="repairForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="报修图片" prop="name">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false">
            <img
              v-if="repairForm.imageUrl"
              :src="repairForm.imageUrl"
              class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i
          ></el-upload>
        </el-form-item>
        <el-form-item label="报修状态" prop="name">
          <el-radio-group v-model="repairForm.radio">
            <el-radio :label="3">审批中</el-radio>
            <el-radio :label="6">无故障</el-radio>
            <el-radio :label="9">维修中</el-radio>
            <el-radio :label="9">维修完成</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isRepairDialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="isRepairDialog = false" size="mini"
          >更 新</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repairList: [{}],
      query: {
        page: 1, // 当前页
        size: 10, // 最大页数
        keyword: null
      },
      total: 10,
      repairForm: {},
      repairRules: {},
      isRepairDialog: false
    }
  },
  methods: {
    showRepair() {
      this.isRepairDialog = true
    },
    handleSizeChange() {},
    handleCurrentChange() {}
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
}
</style>
