<template>
  <ul class="nav-list">
    <li class="nav-item" :class="{'active':active===''}"><a href="javascript:;"
        @click="clickNav()">全部</a>
    </li>
    <li v-for="item in categories" :key="item.id" class="nav-item"
      :class="{'active':active===item.id}"><a href="javascript:;"
        @click="clickNav(item)">{{item.name}}</a></li>
  </ul>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      active: ''
    }
  },
  computed: {
    categories() {
      return this.data.filter(({ id, name }) => ({ id, name }))
    }
  },
  methods: {
    clickNav(current) {
      if (current == null) {
        this.active = ''
      } else {
        this.active = current.id
      }
      this.$emit('nav-change', this.active)
    }
  }
}
</script>
<style lang="less" scoped>
.nav-list {
  background-color: #fff;
}
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
    border-radius: 4px;
    font-size: 14px;
    &:hover {
      background-color: #eff2f3;
    }
  }
  &.active {
    a {
      color: #fff;
      background-color: #cc2929;
    }
  }
}
</style>
