<template>
  <el-container class="book-center">
    <el-aside width="140px">
      <bookNav :data="allCategory" @nav-change="getNav" />
    </el-aside>
    <el-main>
      <bookList :data="books" :nav="currentNav" />
    </el-main>
  </el-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import bookNav from './BookNav'
import bookList from './BookList'
import mixins from '@mixins'
export default {
  mixins: [mixins.home],
  components: {
    bookNav,
    bookList
  },
  data() {
    return {
      books: [],
      currentNav: ''
    }
  },
  methods: {
    ...mapActions(['getAllCategory', 'getAllFile']),
    async fetchBook() {
      const { list } = await this.$api.getBookList(this.query)
      list.forEach((item) => {
        item.lxInfo = this.getCategoryById(item.lx)
      })
      this.books = list
    },
    getNav(val) {
      this.currentNav = val
    }
  },
  computed: {
    ...mapState(['allCategory']),
    ...mapGetters(['getCategoryById'])
  },
  created() {
    this.getAllCategory(this)
    this.getAllFile(this)
    this.fetchBook()
  }
}
</script>

<style lang="less" scoped>
.el-main {
  padding-top: 0;
}
</style>
