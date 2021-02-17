<template>
  <div class="post">
    <el-card>
      <!-- 导航 -->
      <div class="top-nav">
        <ul class="nav-item">
          <li><a href="javascript:;" class="active">全部</a></li>
          <li><a href="javascript:;">移动开发</a></li>
          <li><a href="javascript:;">Web前端</a></li>
          <li><a href="javascript:;">企业架构</a></li>
          <li><a href="javascript:;">编程语言</a></li>
          <li><a href="javascript:;">互联网</a></li>
          <li><a href="javascript:;">开源软件</a></li>
          <li><a href="javascript:;">操作系统</a></li>
          <li><a href="javascript:;">数据库</a></li>
          <li><a href="javascript:;">研发管理</a></li>
          <li><a href="javascript:;">行业应用</a></li>
          <li><a href="javascript:;">非技术</a></li>
        </ul>
      </div>
      <el-divider></el-divider>
      <!-- 文章列表 -->
      <div class="bottom-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="精华帖" name="1">
            <div class="content-star">
              <div class="item">
                <h4><a href="#/post/1">新年快乐</a></h4>
                <p>
                  <span class="author">myqz</span>于<span class="date"
                    >2018-6-23 12:00:00</span
                  >发表
                </p>
                <div class="other">
                  <i class="iconfont icon-eye">5</i>
                  <i class="iconfont icon-like">7</i>
                  <i class="iconfont icon-comment">1</i>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="最新发表" name="2">最新发表</el-tab-pane>
          <el-tab-pane label="最高热度" name="3">最高热度</el-tab-pane>
          <el-tab-pane label="最新回复" name="4">最新回复</el-tab-pane>
        </el-tabs>
        <el-button
          class="add-post"
          size="small"
          type="danger"
          @click="showAddPost"
          ><i class="icon-edit iconfont">我要发帖</i></el-button
        >
      </div>
    </el-card>
    <!-- 添加文章 -->
    <el-dialog
      title="添加文章"
      :visible.sync="isAddPostDialog"
      width="50%"
      :close-on-click-modal="false"
      class="add-post"
    >
      <!-- 富文本 -->
      <div>
        <div class="warning">
          <el-alert
            title="注意"
            type="warning"
            description="请注意帖子的言语措辞，如果出现恶意中伤别人，诽谤别人，帖子将被删除，发帖人将会被惩罚"
            show-icon
            :closable="false"
          >
          </el-alert>
        </div>
        <el-form
          :model="addPostForm"
          :rules="addPostRules"
          ref="addPostForm"
          size="mini"
        >
          <el-form-item label="标题" prop="name" class="title">
            <el-input v-model="addPostForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <quillEditor class="editor"></quillEditor>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="isAddPostDialog = false" size="mini"
          >取 消</el-button
        >
        <el-button type="success" @click="isAddPostDialog = false" size="mini"
          >发 布</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
      activeName: '1',
      isAddPostDialog: false,
      addPostForm: {},
      addPostRules: {}
    }
  },
  methods: {
    // 显示添加文字对话框
    showAddPost() {
      this.isAddPostDialog = true
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="less" scoped>
// 帖子导航
.nav-item {
  li {
    display: flex;
    flex-wrap: wrap;
    display: inline-block;
    width: 12.5%;
    padding: 0 10px;
    box-sizing: border-box;
    a {
      position: relative;
      text-align: center;
      letter-spacing: 4px;
      display: inline-block;
      width: 100%;
      line-height: 32px;
      margin-right: 10px;
      color: #666;
      transition: all cubic-bezier(0.55, 0.085, 0.68, 0.53) 0.2s;
      border: 1px solid transparent;
      border-radius: 6px;
      &:hover {
        color: #0984e3ee;
        font-weight: 600;
        transform: scale(1.02);
        border-color: #0984e355;
      }
    }
    a.active {
      background-color: #0984e3;
      color: #fff;
      font-weight: 600;
      &::before {
        content: '';
      }
    }
  }
}
// 帖子列表

.bottom-content {
  position: relative;
  .add-post {
    position: absolute;
    right: 0;
    top: -10px;
    i::before {
      margin-right: 4px;
    }
  }
}

.content-star {
  .item {
    position: relative;
    h4 a {
      color: #e74c3c;
      font-size: 20px;
      font-weight: normal;
      line-height: 30px;
      &:hover {
        color: #3498db;
      }
    }
    p {
      font-size: 14px;
      color: #777;
    }
    .other {
      bottom: 0;
      right: 0;
      position: absolute;
      i {
        font-size: 16px;
        margin-right: 4px;
      }
    }
  }
}

// 文章列表

// 添加文章
.add-post {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  /deep/.el-alert__title {
    font-size: 18px;
  }
  /deep/ .el-alert .el-alert__description {
    font-size: 14px;
  }
  .title {
    margin: 10px 0 20px 0;
  }
  /deep/.ql-editor {
    min-height: 400px;
  }
}
</style>
