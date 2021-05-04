<template>
  <div class="errata">
    <div class="e-header">
      <!-- <el-input type="text" placeholder="请输入...."></el-input>
      <a href="javascript:;"></a> -->
      <a href="javascript:;" @click="anchor('submit')">我要勘误</a>
    </div>
    <ul class="e-list">
      <li class="e-item" v-for="item in list" :key="item.id">
        <div class="e-avatar">
          <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            alt="">
        </div>
        <div class="e-info">
          <div class="title">{{item.bookName}}<el-tag :type="errataState[item.state].type"
              effect="plain">
              {{errataState[item.state].name}}
            </el-tag>
          </div>
          <div class="info">
            <span class="author">{{item.username}}</span>
            <span class="date">{{item.createTime | formatDate}}</span>
          </div>
          <div class="content">
            {{item.description}}
            <!-- <a href="javascript:;">查看详情>></a> -->
          </div>
        </div>
      </li>
    </ul>
    <div class="e-submit">
      <h4 id="submit">填写勘误信息
      </h4>
      <el-form :model="form" :rules="rules">
        <el-form-item label="书籍名称">
          <el-select v-model="form.name" filterable>
            <el-option v-for="item in miniBook()" :key="item.id" :value="item.id"
              :label="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="勘误内容">
          <el-input type="textarea" :autoSize="{minRow:3,maxRows:6}" resize="none"
            v-model="form.content">
          </el-input>
        </el-form-item>
      </el-form>
      <a href="javascript:;" class="submit">提交勘误</a>
    </div>
  </div>
</template>

<script>
import mixin from '@mixins'
import { errataState } from '@static'
import { mapActions, mapGetters } from 'vuex'
export default {
  mixins: [mixin.home],
  data() {
    return { errataState, form: {}, rules: {} }
  },
  methods: {
    ...mapActions(['getAllBook']),
    async fetchErrata() {
      const { list, total } = await this.$api.getErrataList(this.query)
      this.list = list
      this.total = total
    },
    // done anchor
    anchor(name) {
      const anchorElm = document.getElementById(name)
      if (anchorElm) {
        anchorElm.scrollIntoView()
      }
    }
  },
  computed: {
    ...mapGetters({ miniBook: 'getMiniBook' })
  },
  created() {
    this.fetchErrata()
    this.getAllBook(this)
    console.log(this.miniBook())
  }
}
</script>

<style lang="less" scoped>
.errata {
  padding: 20px 40px;
  border: 1px solid #d7d7d7;
  background-color: #fff;
  h4 {
    font-size: 24px;
    padding-left: 10px;
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #d7d7d7;
    a {
      font-size: 16px;
      font-weight: 400;
      color: #cc2929;
    }
  }
}
.e-header {
  position: relative;
  a {
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    background-color: #cc2929;
    padding: 8px 16px;
  }
}
.e-item {
  display: flex;
  border-bottom: 1px dashed #e9e9e9;
  padding: 18px 0;
}

.e-avatar {
  img {
    width: 50px;
    height: 50px;
  }
}

.e-info {
  padding-left: 10px;
  .title {
    font-size: 18px;
    color: #333;
    font-weight: 700;
  }
  .info {
    margin: 6px 0 10px;
    span {
      color: #999;
      font-size: 15px;
    }
    .author {
      margin-right: 14px;
    }
  }
  .el-tag {
    margin-left: 10px;
  }
  .content {
    color: #333;
    a {
      color: #cc2929;
    }
  }
}
.el-form {
  margin-top: 14px;
  .el-select {
    width: 100%;
  }
}
.e-submit {
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  .submit {
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #cc2929;
    border-radius: 4px;
    color: #fff;
  }
}
</style>
