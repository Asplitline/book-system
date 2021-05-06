<template>
  <div class="book-list">
    <!-- {{this.books}} -->
    <ul v-if="books.length">
      <li class="b-item" v-for="item in books" :key="item.id">
        <div class="cover">
          <a href="javascript:;" @click="goToDetail(item)">
            <img :src=" bindIMG(item.book.filename)" alt="">
          </a>
        </div>
        <div class="info">
          <h4 class="title">
            <a href="javascript:;" @click="goToDetail(item)">{{item.name}}</a>
          </h4>
          <div class="author">{{item.author}}</div>
          <div class="description">{{item.description}}</div>
          <div class="tags" v-if="item.lxInfo"><span>{{item.lxInfo.name}}</span></div>
        </div>
      </li>
    </ul>
    <div class="not-found" v-else>暂无图书信息</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { bindIMG } from '@utils'
export default {
  props: {
    data: Array,
    nav: String
  },
  data() {
    return {}
  },
  methods: {
    bindIMG,
    ...mapMutations(['setCurrentBook']),
    goToDetail(book) {
      this.setCurrentBook(book)
      this.$router.push({ name: 'bookDetail', params: { id: book.id } })
    }
  },
  computed: {
    ...mapGetters(['getFileById', 'getCategoryById']),
    books() {
      const res = this.data.filter((item) => {
        item.book = this.getFileById(item.id)
        item.lxInfo = this.getCategoryById(item.id)
        return item
      })
      if (this.nav === '') {
        return res
      } else {
        return res && res.filter((item) => item.lx === this.nav)
      }
    }
  },
  created() {}
}
</script>
<style lang="less" scoped>
.book-list {
  background-color: #fff;
  min-height: 400px;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
}
.b-item {
  box-sizing: border-box;
  width: 50%;
  padding: 20px;
  // background-color: #e0e0e0;
  display: flex;
  .cover {
    margin-right: 10px;
    a {
      position: relative;
      display: block;
      background-color: #666;
      box-shadow: 1px 1px 3px rgb(0 0 0 / 20%);
      img {
        display: block;
        width: 110px;
      }
      &:hover {
        &::after {
          opacity: 0.2;
        }
      }
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #000;
        content: '';
        opacity: 0;
        transition: opacity 0.2s ease-in;
      }
    }
  }
  .title {
    font-size: 20px;
  }
  .description {
    position: relative;
    font-size: 14px;
    padding: 4px 15px;
    margin: 10px 0;
    line-height: 1.5;
    display: -webkit-box; /*弹性伸缩盒子模型*/
    -webkit-box-orient: vertical; /*伸缩盒子子排列方式*/
    -webkit-line-clamp: 3; /*设置显示文本行数*/
    text-overflow: ellipsis;
    overflow: hidden;
    &::before,
    &::after {
      position: absolute;
      content: '';
      width: 8px;
      height: 12px;
    }
    &::before {
      top: 0;
      left: 0;
      border-left: 1px solid #333;
      border-top: 1px solid #333;
    }
    &::after {
      bottom: 0;
      right: 0;
      border-right: 1px solid #333;
      border-bottom: 1px solid #333;
    }
  }
  .author {
    margin-top: 4px;
    font-size: 12px;
    color: #777;
  }
  .tags {
    span {
      display: inline-block;
      padding: 2px 6px;
      background-color: #7565b5;
      color: #fff;
      border-radius: 2px;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background-color: #54468b;
      }
    }
  }
}
</style>
