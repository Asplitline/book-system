<template>
  <el-container class="book-center">
    <el-aside width="200px">
      <bookNav :data="allCategory" />
    </el-aside>
    <el-main>
      <bookList :data="books" />
    </el-main>
  </el-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
      books: []
    }
  },
  methods: {
    ...mapActions(['getAllCategory', 'getAllFile']),
    async fetchBook() {
      const { list } = await this.$api.getBookList(this.query)
      this.books = list
    }
  },
  computed: {
    ...mapState(['allCategory'])
  },
  created() {
    this.getAllCategory(this)
    this.getAllFile(this)
    this.fetchBook()
  }
}
</script>

<style lang="less" scoped>
</style>
