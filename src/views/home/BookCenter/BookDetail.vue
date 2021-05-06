<template>
  <div class="book-detail">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'bookCenter'}">图书中心</el-breadcrumb-item>
      <el-breadcrumb-item>{{book.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="b-title">
      <div class="cover">
        <a href="javascript:;">
          <img :src="bindIMG(book.book.filename)" alt="">
        </a>
      </div>
      <div class="info">
        <div class="title">
          {{book.name}}
          <small class="author">{{book.author}}</small>
        </div>
        <div class="description">
          {{book.description}}
        </div>
        <div class="btns">
          <!-- done <a> state -->
          <a href="javascript:;" class="borrow" :class="{'ban':currentState!==4}"
            @click="borrowBook">{{borrowState[currentState].value}}</a>
          <a href="javascript:;" class="read"
            :class="{'ban':(currentState!==2&&currentState!==3)||chapters.length===0}"
            @click="readBook(1)">在线阅读</a>
        </div>
      </div>
    </div>
    <div class="b-chapters">
      <template v-if="chapters.length">
        <h4>章节列表 <small>共{{chapters.length}}章</small></h4>
        <ul class="c-list" :class="{'mask':currentState!==2&&currentState!==3}">
          <li class="c-item" v-for="item in chapters" :key="item.id">
            <a href="javascript:;" @click="readBook(item)"> {{item.indexs | ch }}
              {{item.title}}</a>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="not-found" style="background-color:#fff7f7;margin-top:20px;">
          暂无内容,联系管理员添加...
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { bindIMG } from '@utils'
import mixin from '@mixins'
import { borrowState } from '@static'
export default {
  mixins: [mixin.home],
  props: ['id'],
  data() {
    return {
      list: [],
      borrowState,
      chapters: [],
      defaultChapter: ''
    }
  },
  computed: {
    ...mapState({ book: 'currentBook', user: 'currentUser' }),
    currentBorrow() {
      return this.list.filter((item) => item.bookId === this.id)
    },
    currentState() {
      const res = this.currentBorrow[0] || { state: 4 }
      return res.state
    }
  },
  methods: {
    ...mapMutations(['setCurrentChapter']),
    bindIMG,
    async fetchChapter() {
      this.chapters = await this.$api.getChapterById({ bookId: this.id })
      this.chapters.sort((a, b) => {
        return a.indexs - b.indexs
      })
      console.log(this.chapters)
      this.defaultChapter = this.chapters[0].id || ''
    },
    borrowBook() {
      this.handleConfirm('借阅图书', async () => {
        const { success } = await this.$api.addBorrow({
          bookId: this.book.id,
          bookName: this.book.name,
          createTime: Date.now(),
          updateTime: Date.now(),
          state: 0,
          userId: this.user.id,
          userName: this.user.name
        })
        if (success) {
          this.$message.success('成功提交...等待管理员审核~')
          this.validateBorrow()
        } else {
          this.$message.error('提交失败...')
        }
      })
    },
    async validateBorrow() {
      this.query.keyword = this.user.id
      const { list } = await this.$api.getBorrowList(this.query)
      this.list = list
    },
    readBook(data) {
      this.setCurrentChapter(data)
      this.$router.push({
        name: 'bookChapter',
        params: { id: this.id, cid: data.id }
      })
    }
  },
  created() {
    this.validateBorrow()
    this.fetchChapter()
  }
}
</script>

<style lang="less" scoped>
.book-detail {
  background-color: #fff;
  padding: 10px 20px;
}
/deep/.el-breadcrumb__item {
  span {
    font-size: 14px;
    line-height: 18px;
    font-weight: normal;
  }
}

.b-title {
  display: flex;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 100px;
}

.cover {
  a > img {
    width: 200px;
  }
}
.info {
  padding-left: 20px;
  position: relative;
  .title {
    font-size: 20px;
    font-weight: 700;
    .author {
      font-weight: 400;
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 1.5;
  }
  .btns {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    a {
      display: inline-block;
      padding: 6px 10px;
      margin-right: 10px;
      border: 2px solid #000;
      border-radius: 3px;
      transition: all 0.3s ease-out;
    }
    .borrow {
      border-color: #67c23a;
      color: #67c23a;
      &:hover {
        background-color: #67c23a;
        color: #fff;
      }
    }
    .read {
      border-color: tomato;
      background-color: tomato;
      color: #fff;
      &:hover {
        background-color: red;
      }
    }
  }
}

.b-chapters {
  h4 {
    font-size: 20px;
    padding-left: 10px;
    border-left: 3px solid #cc2929;
    margin: 40px 0 20px;
  }
  .c-list {
    display: flex;
    border: 1px solid #e0e0e0;
    padding: 40px;
    .c-item {
      width: 33.33%;
      // text-align: center;
      padding-bottom: 10px;
      border-bottom: 1px solid #f0f0f0;
      a {
        &:hover {
          color: #cc2929;
        }
      }
    }
    &.mask {
      position: relative;
      background-color: #ffecec;
      &::before {
        position: absolute;
        content: '解锁后可看...';
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #cc2929;
        font-size: 20px;
        font-weight: 700;
      }
      a {
        pointer-events: none;
        color: #999;
      }
    }
  }
}

// done ban click
.ban {
  cursor: default;
  pointer-events: none;
  opacity: 0.8;
}
</style>
