<template>
  <div class="user">
    <div class="split-line">
      <span> <i class="icon-user iconfont"></i> 用户列表</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="query.keyword"
          class="input-with-select"
          clearable
          @clear="getUsers()"
          size="small"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" size="small" @click="showUserDialog" plain>
          添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- 用户表单 -->
    <el-table :data="userList" stripe style="width: 100%" max-height="600">
      <el-table-column prop="name" label="用户名" min-width="100">
      </el-table-column>
      <el-table-column prop="username" label="学号" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="班级" min-width="120">
      </el-table-column>
      <el-table-column prop="qq" label="联系方式" min-width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <el-tooltip
          class="item"
          effect="dark"
          content="修改用户"
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
          content="删除用户"
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
          content="重置密码"
          placement="top"
          :enterable="false"
        >
          <el-button
            type="warning"
            icon="el-icon-refresh-left"
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

    <!-- 添加用户 -->
    <el-dialog
      :visible.sync="isUserDialog"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form
        :model="userInfoForm"
        :rules="userInfoRules"
        ref="userInfoForm"
        label-width="100px"
        size="small"
        class="user-form"
      >
        <el-form-item prop="name">
          <span slot="label"><i class="icon-user iconfont"></i>账号</span>
          <el-input v-model="userInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <span slot="label"><i class="icon-contacts iconfont"></i>姓名</span>
          <el-input v-model="userInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <span slot="label"><i class="icon-lock iconfont"></i>密码</span>
          <el-input v-model="userInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <span slot="label"><i class="icon-idcard iconfont"></i>身份</span>
          <el-radio v-model="userInfoForm.radio" label="0">普通</el-radio>
          <el-radio v-model="userInfoForm.radio" label="1">管理员</el-radio>
        </el-form-item>
        <el-form-item prop="name">
          <span slot="label"><i class="icon-tubiao215 iconfont"></i>QQ</span>

          <el-input v-model="userInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <span slot="label"><i class="icon-mobile iconfont"></i>手机号码</span>

          <el-input v-model="userInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <span slot="label"><i class="icon-mail iconfont"></i>邮箱</span>

          <el-input v-model="userInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <span slot="label"><i class="icon-camera1 iconfont"></i>头像</span>

          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img :src="bindUrl('T_2014_363.jpg')" class="avatar" />
          </el-upload>
        </el-form-item>
        <el-form-item prop="name">
          <span slot="label"><i class="icon-bulb iconfont"></i>自我描述</span>
          <el-input
            v-model="userInfoForm.name"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            resize="none"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUserDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="isUserDialog = false" size="small"
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
      userList: [{}],
      query: {
        page: 1, // 当前页
        size: 10, // 最大页数
        keyword: null
      },
      total: 10,
      userInfoForm: {},
      userInfoRules: {},
      isUserDialog: false
    }
  },
  methods: {
    // 显示用户对话框
    showUserDialog() {
      this.isUserDialog = true
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    getUsers() {}
  }
}
</script>

<style lang="less" scoped>
.user-form {
  /deep/.el-upload {
    border: 2px dashed transparent;
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
  }
  .iconfont {
    margin-right: 2px;
    vertical-align: bottom;
  }
}
.user {
  /deep/.el-dialog__body {
    padding: 20px;
  }
}
</style>
