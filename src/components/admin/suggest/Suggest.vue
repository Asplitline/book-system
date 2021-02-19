<template>
  <div class="suggest">
    <div class="split-line">
      <span> <i class="iconfont icon-edit"></i> 投诉管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>投诉管理</el-breadcrumb-item>
      <el-breadcrumb-item>投诉列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="query.keyword"
          class="input-with-select"
          clearable
          @clear="getBooks()"
          size="small"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 用户表单 -->
    <el-table :data="suggestList" stripe style="width: 100%" max-height="600">
      <el-table-column prop="username" label="投诉标题" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="投诉内容" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="投诉时间" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="投诉状态" min-width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <el-tooltip
          class="item"
          effect="dark"
          content="回复投诉"
          placement="top"
          :enterable="false"
        >
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            @click="showSuggestDialog"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="删除投诉"
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
          content="投诉详情"
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

    <!-- 投诉对话框 -->
    <el-dialog :visible.sync="isSuggestDialog" width="30%">
      <el-form
        :model="suggestForm"
        :rules="suggestRules"
        ref="suggestForm"
        size="mini"
      >
        <el-form-item label="投诉标题" prop="name">
          <el-input v-model="suggestForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="投诉内容" prop="name">
          <el-input
            v-model="suggestForm.name"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="投诉时间" prop="name">
          <el-input v-model="suggestForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="投诉状态" prop="name">
          <el-input v-model="suggestForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="投诉图片" prop="name">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false">
            <img
              v-if="suggestForm.imageUrl"
              :src="suggestForm.imageUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="回复" prop="name">
          <el-input
            v-model="suggestForm.name"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isSuggestDialog = false" size="mini"
          >取 消</el-button
        >
        <el-button type="primary" @click="isSuggestDialog = false" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      suggestList: [{}],
      query: {
        page: 1, // 当前页
        size: 10, // 最大页数
        keyword: null
      },
      total: 10,
      suggestForm: {},
      suggestRules: {},
      isSuggestDialog: false
    }
  },
  methods: {
    showSuggestDialog() {
      this.isSuggestDialog = true
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style lang="less" scoped>
.suggest {
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
}
</style>
