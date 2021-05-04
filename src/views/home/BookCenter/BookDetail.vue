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
          <a href="javascript:;" class="borrow">借阅书籍</a>
          <a href="javascript:;" class="read">在线阅读</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { bindIMG } from '@utils'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({ book: 'currentBook' })
  },
  methods: {
    bindIMG
  },
  created() {}
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
</style>
