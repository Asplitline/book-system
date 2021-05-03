<template>
  <ul>
    <li v-for="item in categories" :key="item.id" class="nav-item"><a
        href="javascript:;">{{item.name}}</a></li>
  </ul>
</template>

<script>
export default {
  props: {
    data: Array
  },
  computed: {
    categories() {
      return this.data.filter(({ id, name }) => ({ id, name }))
    }
  }
}
</script>
<style lang="less" scoped>
.nav-title {
  font-size: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  color: #0e72fe;
  padding-left: 10px;
}
.nav-item {
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #eee;
  a {
    display: inherit;
    width: 100%;
    height: 100%;
    color: #000;
    &:hover {
      background-color: #eff2f3;
    }
  }
}
</style>
