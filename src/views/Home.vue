<template>
  <el-container class="home">
    <el-header style="height:61px">
      <el-menu :default-active="'/'+currentHMenu" mode="horizontal" class="w"
        active-text-color="#cc2929" router>
        <el-menu-item :index="'/'+item.index" v-for="item in hMenu" :key="item.index">
          {{item.name}}</el-menu-item>
        <el-menu-item class="h-info">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :src="bindIMG(user.avatar.filename)" alt="" v-if="user.avatar">
              </el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="goToInfo">个人信息</el-dropdown-item>
              <el-dropdown-item command="logOut">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="w">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { hMenu } from '@static'
import { mapState } from 'vuex'
import { bindIMG } from '@utils'
import mixin from '@mixins'
export default {
  mixins: [mixin.home],
  data() {
    return {
      hMenu
    }
  },
  computed: {
    ...mapState(['currentHMenu', 'currentUser']),
    user() {
      return this.currentUser
    }
  },
  methods: {
    bindIMG,
    async getUser() {
      const [avatar] = await this.$api.getFileById({ id: this.user.id })
      this.$set(this.user, 'avatar', avatar)
    },
    handleCommand(callback) {
      this[callback] && this[callback]()
    },
    goToInfo() {
      this.$router.push({ name: 'info' })
    }
  },
  created() {
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
.el-container.home {
  height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  padding: 0;
}
.el-header {
  padding: 0;
  background-color: #fff;
  border-bottom: solid 1px #e6e6e6;
}
// done scrollbar
.w {
  width: 980px;
  margin: 0 auto;
}
.w::-webkit-scrollbar {
  width: 4px; //滚动条的宽度
}

.w::-webkit-scrollbar-thumb {
  background-color: #cc2929; //滚动条的颜色
  border-radius: 3px; //滚动条的边框倒角
}

.el-main {
  flex: 1;
  // background-color: #fff;
  padding: 10px 0;
}

.h-info {
  float: right;
}
</style>
