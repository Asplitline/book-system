<template>
  <el-card class="book-chapter">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'bookCenter'}">图书中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'bookDetail',params:{id:book.id}}">{{book.name}}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{chapter.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="c-title">
      <h4>{{chapter.indexs | ch }} {{chapter.title}}</h4>
      <div class="tag">
        <span class="book">{{book.name}}</span>
        <span class="author">{{book.author}}</span>
        <span class="word">{{chapter.words}}字</span>
      </div>
    </div>
    <div class="c-content">
      <p v-for="(item,index) in content" :key="index"><a href="javascript:;"
          @dblclick="showDrawer(index)">{{item.text}}</a>
        <span class="number" v-show="item.number">{{item.number}}</span>
      </p>
    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false"
      @close="resetForm('form')">
      <div class="comment-header">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item prop="content">
            <el-input type="textarea" :autosize="{minRows:4,maxRows:6}" resize="none"
              v-model="form.content">
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="danger" size="mini" @click="submitComment('form')">发表</el-button>
      </div>
      <div class="comment-body">
        <template v-if="currentList.length">
          <h4>共{{currentList.length}}条信息</h4>
          <ul class="comment-list">
            <li class="comment-item" v-for="item in currentList" :key="item.id">
              <div class="avatar">
                <img :src="bindIMG(item.file.filename)" alt="">
              </div>
              <div class="info">
                <div class="author">{{item.user.name}}</div>
                <div class="date">{{item.createTime | formatDate}}</div>
                <div class="content">{{item.content}}</div>
              </div>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="not-found" style="border:1px solid #ffdada;">
            暂无批注
          </div>
        </template>
      </div>
    </el-drawer>
  </el-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import mixin from '@mixins'
import { bindIMG } from '@utils'
export default {
  props: ['id', 'cid'],
  mixins: [mixin.home],
  data() {
    return {
      form: {
        content: ''
      },
      list: {},
      drawer: false,
      rules: {
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      tag: 0
    }
  },
  methods: {
    bindIMG,
    ...mapActions(['getAllFile', 'getAllUser']),
    async showDrawer(index) {
      this.drawer = true
      this.tag = index
      Object.assign(this.form, {
        bookId: this.id,
        chapterId: this.cid,
        startindex: index,
        userId: this.user.id
      })
      await this.fetchComment()
    },
    async submitComment(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        this[formName].createTime = Date.now()
        const { success } = await this.$api.addComment(this[formName])
        this.handleSuccess(success, '批注', this.fetchComment)
        this.resetForm(formName)
      })
    },
    async fetchComment() {
      const list = await this.$api.getComment({
        bookId: this.id,
        chapterId: this.cid
      })
      list.forEach((item) => {
        item.file = this.getFileById(item.userId)
        item.user = this.getUserById(item.userId)
      })
      this.list = list
    },
    computeNumber(index) {
      console.log(index)
      return (
        Object.keys(this.list).length &&
        this.list.filter((item) => item.startindex === index).length
      )
    }
  },
  computed: {
    ...mapState({
      chapter: 'currentChapter',
      book: 'currentBook',
      user: 'currentUser'
    }),
    ...mapGetters(['getUserById', 'getFileById']),
    content() {
      const arr = this.chapter.content.replace(/(\s)\1+/g, '$1').split('\n')
      const res = []
      for (const k in arr) {
        const number = this.computeNumber(k)
        res.push({ text: arr[k], number })
      }
      return res
    },
    currentList() {
      // note Object is null
      return (
        Object.keys(this.list).length &&
        this.list.filter((item) => {
          return Number(item.startindex) === this.tag
        })
      )
    }
  },
  created() {
    this.fetchComment()
    this.getAllFile(this)
    this.getAllUser(this)
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  font-size: 14px;
  margin: 0 0 20px;
  /deep/.el-breadcrumb__item {
    span {
      font-weight: 400;
    }
  }
}
.book-chapter {
  position: relative;
  padding: 10px;
  border: 1px solid #d8d8d8;
  background-color: #f8f3e9;
  min-height: 400px;
  .c-title {
    color: #262626;
    h4 {
      font-size: 24px;
      font-weight: 400;
    }
    .tag {
      padding-left: 12px;
      margin: 10px 0;
      span {
        color: rgba(0, 0, 0, 0.5);
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }
  .c-content {
    line-height: 1.8;
    font-size: 18px;
    color: #262626;
    text-indent: 2em;
    p {
      margin: 10px 0;
    }
    .number {
      border: 1px solid #999;
      color: #999;
      padding: 2px 8px;
      font-size: 12px;
      vertical-align: middle;
    }
  }
  .aside-comment {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #000;
  }
}
/deep/.el-drawer {
  background-color: #f8f3e9;
  padding: 40px;
  .el-button {
    margin-top: 10px;
    float: right;
  }
}
.comment-header {
  padding-bottom: 40px;
}

.comment-body {
  margin-top: 20px;
  h4 {
    color: #a6a6a6;
    font-size: 20px;
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #c0c0c0;
  }
  .comment-item {
    padding: 20px 10px;
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    .avatar {
      margin-right: 10px;
      img {
        width: 44px;
        height: 44px;
      }
    }
    .author {
      color: #3f5a93;
    }
    .date {
      color: #a6a6a6;
      font-size: 14px;
    }
    .content {
      color: #262626;
      font-size: 14px;
      line-height: 22px;
      padding: 10px 6px;
    }
  }
}
</style>
