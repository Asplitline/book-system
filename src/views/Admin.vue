<template>
  <div class="admin">
    <el-container style="height:100vh">
      <el-aside width="200px">
        <el-menu router :default-active="active">
          <el-menu-item :index="item.index" v-for="item in aMenu" :key="item.index">
            {{item.name}}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="title">图书管理系统</span>
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :src="bindIMG(user.avatar.filename)" v-if="user.avatar">
              </el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="goIndex">跳转前台</el-dropdown-item>
              <el-dropdown-item command="logOut">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { aMenu } from '@static'
import { mapState } from 'vuex'
import mixins from '@mixins'
import { bindIMG } from '@utils'
export default {
  data() {
    return {
      aMenu
    }
  },
  computed: {
    ...mapState({ active: 'currentAMenu', user: 'currentUser' })
  },
  methods: {
    bindIMG,
    handleCommand(callback) {
      this[callback] && this[callback]()
    },
    goIndex() {
      this.$router.push({ name: 'home' })
    },
    async getUser() {
      const [avatar] = await this.$api.getFileById({ id: this.user.id })
      this.$set(this.user, 'avatar', avatar)
    }
  },
  mixins: [mixins.admin],
  created() {
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
/deep/.el-menu {
  height: 100%;
  .el-menu-item {
    font-size: 18px;
    text-align: center;
    letter-spacing: 0.1em;
  }
}
.el-header {
  line-height: 60px;
  .title {
    font-size: 24px;
    letter-spacing: 0.1em b;
  }
}
.el-main {
  background-color: #f8f8f8;
}
.el-dropdown {
  float: right;
  height: 60px;
  margin-right: 10px;
  .el-avatar {
    vertical-align: middle;
  }
}
</style>
