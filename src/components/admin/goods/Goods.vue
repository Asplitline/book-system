<template>
  <div class="goods">
    <div class="split-line">
      <span> <i class="iconfont icon-unorderedlist"></i> 书籍管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍管理</el-breadcrumb-item>
      <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
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
      <el-col :span="4">
        <el-button type="success" size="small" @click="showBookDialog" plain>
          添加书籍</el-button
        >
      </el-col>
    </el-row>
    <!-- 用户表单 -->
    <el-table :data="bookList" stripe style="width: 100%" max-height="600">
      <el-table-column prop="name" label="书籍编号" min-width="100">
      </el-table-column>
      <el-table-column prop="username" label="书名" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="书籍类型" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="数量" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="简介" min-width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <el-tooltip
          class="item"
          effect="dark"
          content="修改书籍"
          placement="top"
          :enterable="false"
        >
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="删除书籍"
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
          content="书籍详情"
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
    <!-- 书籍对话框 -->
    <el-dialog :visible.sync="isBookDialog" width="25%" class="book-dialog">
      <el-form :model="bookForm" :rules="bookRules" ref="bookForm" size="mini">
        <el-form-item label="书名" prop="name">
          <el-input v-model="bookForm.name"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="name">
          <el-input v-model="bookForm.name"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="name">
          <el-input v-model="bookForm.name" type="number"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="name">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="name">
          <el-input
            v-model="bookForm.name"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 6 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="name">
          <el-upload class="avatar-uploader" action="#" :show-file-list="false">
            <img
              v-if="bookForm.imageUrl"
              :src="bookForm.imageUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isBookDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="isBookDialog = false" size="small"
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
      bookList: [{}],
      query: {
        page: 1, // 当前页
        size: 10, // 最大页数
        keyword: null
      },
      total: 10,
      bookForm: {},
      bookRules: {},
      isBookDialog: false,
      // example
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  methods: {
    getBooks() {},
    showBookDialog() {
      this.isBookDialog = true
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style lang="less" scoped>
.book-dialog {
  overflow: hidden;
  /deep/.el-dialog__body {
    padding: 20px;
  }
  .el-select {
    width: 100%;
  }
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
