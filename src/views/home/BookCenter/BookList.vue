<template>
  <div class="book-list">
    {{this.books}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    data: Array
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getFileById']),
    books() {
      return this.data.filter((item) => {
        item.book = this.getFileById(item.id)
        return item
      })
    }
  },
  created() {}
}
</script>
<style lang="less" scoped>
</style>
