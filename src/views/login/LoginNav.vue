<template>
  <div class="login-nav">
    <a :class="{'active':isLogin}" href="javascript:;"
      @click="changeNav('loginScreen')">登录</a> ·
    <a :class="{'active':!isLogin}" href="javascript:;"
      @click="changeNav('registerScreen')">注册</a>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: String,
      default: 'loginScreen'
    }
  },
  methods: {
    changeNav(index) {
      this.$emit('change-nav', index)
    }
  },
  computed: {
    isLogin() {
      return this.index === 'loginScreen'
    }
  }
}
</script>

<style lang="less" scoped>
.login-nav {
  font-size: 18px;
  text-align: center;
  a {
    display: inline-block;
    padding: 10px;
    border-bottom: 2px solid transparent;
    color: #969696;
    &.active {
      color: #0066ff;
      border-color: #0066ff;
      font-weight: 700;
    }
    &:hover {
      border-color: #0066ff;
    }
  }
}
</style>
