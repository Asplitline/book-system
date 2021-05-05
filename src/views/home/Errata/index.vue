<template>
  <div class="errata">
    <div class="e-header">
      <!-- <el-input type="text" placeholder="请输入...."></el-input>
      <a href="javascript:;"></a> -->
      <!-- <el-tag v-for="item in errataState" :key="item.id" :type="item.type" effect="plain"
        class="nav-tag" @click="handleTag(item)">{{item.name}}
      </el-tag> -->
      <a href="javascript:;" @click="anchor('submit')">我要勘误</a>
    </div>
    <ul class="e-list" v-if="list.length">
      <li class="e-item" v-for="item in list" :key="item.id">
        <div class="e-avatar">
          <img :src="bindIMG(item.file.filename)" alt="">
        </div>
        <div class="e-info">
          <div class="title">{{item.title}}
            <small class="el-icon-notebook-2">{{item.bookName}}</small>
            <el-tag :type="errataState[item.state].type" effect="plain">
              {{errataState[item.state].name}}
            </el-tag>
          </div>
          <div class="info">
            <span class="el-icon-user-solid author">{{item.username}}</span>
            <span class="el-icon-date date">{{item.createTime | formatDate}}</span>
          </div>
          <div class="description">
            {{item.description}}
            <!-- <a href="javascript:;">查看详情>></a> -->
          </div>
        </div>
      </li>
    </ul>
    <div class="not-found" style="height:200px" v-else>
      暂无勘误记录
    </div>
    <div class="e-submit">
      <h4 id="submit">填写勘误信息
      </h4>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="书籍名称" prop="bookId">
          <el-select v-model="form.bookId" filterable>
            <el-option v-for="item in miniBook()" :key="item.id" :value="item.id"
              :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="勘误标题" prop="title">
          <el-input v-model="form.title">
          </el-input>
        </el-form-item>
        <el-form-item label="勘误内容" prop="description">
          <el-input type="textarea" :autoSize="{minRow:3,maxRows:6}" resize="none"
            v-model="form.description">
          </el-input>
        </el-form-item>
      </el-form>
      <a href="javascript:;" class="submit" @click="submit('form')">提交勘误</a>
    </div>
  </div>
</template>

<script>
import mixin from '@mixins'
import { errataState } from '@static'
import { mapActions, mapGetters, mapState } from 'vuex'
import { bindIMG } from '@utils'
export default {
  mixins: [mixin.home],
  data() {
    return {
      errataState,
      form: {},
      rules: {
        bookId: [
          { required: true, message: '请选择需要勘误的书籍', trigger: 'blur' }
        ],
        title: [{ required: true, message: '请输入勘误标题', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入勘误内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['getAllBook', 'getAllFile']),
    bindIMG,
    async fetchErrata() {
      const { list, total } = await this.$api.getErrataList(this.query)
      list.forEach((item) => {
        item.file = this.getFileById(item.userId)
      })
      this.list = list
      this.total = total
    },
    // done anchor
    anchor(name) {
      const anchorElm = document.getElementById(name)
      if (anchorElm) {
        anchorElm.scrollIntoView()
      }
    },
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        const book = this.miniBook().filter(
          (item) => item.id === this[formName].bookId
        )
        Object.assign(this[formName], {
          userId: this.user.id,
          username: this.user.name,
          createTime: Date.now(),
          updateTime: Date.now(),
          state: 0,
          bookName: book[0].name
        })
        const { success } = await this.$api.addErrata(this[formName])
        this.handleSuccess(success, '勘误提交', () => {
          this.fetchErrata()
          this.resetForm(formName)
        })
      })
    },
    handleTag(val) {
      console.log(val)
    }
  },
  computed: {
    ...mapGetters({ miniBook: 'getMiniBook', getFileById: 'getFileById' }),
    ...mapState({ user: 'currentUser' })
  },
  created() {
    this.fetchErrata()
    this.getAllBook(this)
    this.getAllFile(this)
  }
}
</script>

<style lang="less" scoped>
.errata {
  padding: 20px 40px;
  border: 1px solid #d7d7d7;
  background-color: #fff;
  h4 {
    font-size: 24px;
    padding-left: 10px;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #d7d7d7;
    a {
      font-size: 16px;
      font-weight: 400;
      color: #cc2929;
    }
  }
}
.e-header {
  position: relative;
  padding-top: 50px;
  a {
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    background-color: #cc2929;
    padding: 8px 16px;
  }
  .nav-tag {
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      background-color: #fafafa;
    }
    &.active {
    }
  }
}
.e-item {
  display: flex;
  border-bottom: 1px dashed #e9e9e9;
  padding: 18px 0;
}

.e-avatar {
  img {
    width: 50px;
    height: 50px;
  }
}

.e-info {
  padding-left: 10px;
  .title {
    font-size: 18px;
    color: #333;
    font-weight: 700;
    small {
      color: #666;
    }
  }
  .info {
    margin: 6px 0 10px;
    span {
      color: #888;
      font-size: 15px;
    }
    .author {
      margin-right: 14px;
    }
  }
  .el-tag {
    margin-left: 10px;
  }
  .description {
    color: #333;
    a {
      color: #cc2929;
    }
  }
}
.el-form {
  margin-top: 14px;
  .el-select {
    width: 100%;
  }
}
.e-submit {
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  .submit {
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #cc2929;
    border-radius: 4px;
    color: #fff;
  }
}

[class^='el-icon'] {
  &::before,
  &:before {
    margin-right: 4px;
  }
}
</style>
