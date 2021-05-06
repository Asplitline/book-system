<template>
  <el-card class="chapter-list">
    <el-container>
      <el-header style="height:30px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'book' }">书籍管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{name:'book'}">章节列表</el-breadcrumb-item>
          <el-breadcrumb-item>{{book.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="success" class="add-btn" size="mini" @click="showDrawer(0)"
          plain>添加章节</el-button>
      </el-header>
      <el-main>
        <!-- table -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="indexs" label="章节数" min-width="80">
            <template v-slot="{row}">
              {{row.indexs | ch}}
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" min-width="100">
          </el-table-column>
          <el-table-column prop="words" label="字数" min-width="100">
          </el-table-column>
          <el-table-column min-width="100" label="操作">
            <template slot-scope="{row}">
              <!-- <el-link type="primary" :underline="false" @click="showDrawer(2,row)">
                查看章节
              </el-link> -->
              <el-link type="success" :underline="false" @click="showDrawer(1,row)">
                修改章节
              </el-link>
              <el-link type="danger" :underline="false"
                @click="deleteById($api.deleteChapter,fetchData,row.id,'章节')">
                删除章节
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-pagination @size-change="handleSizeChange($event,fetchData)"
        @current-change="handleCurrentChange($event,fetchData)"
        :page-sizes="[1, 2, 5, 10]" layout="total,sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-container>
    <!--  -->
    <el-drawer :title="['添加章节','修改章节','章节详情'][form.flag]" :visible.sync="drawer"
      direction="ltr" :close-on-press-escape="false" :wrapperClosable="false"
      @close="resetForm('form')">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="章节数" prop="indexs">
          <el-input-number v-model="form.indexs" controls-position="right" :min="1">
          </el-input-number>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" :autosize="{minRows:10,maxRows:14}" resize="none"
            v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="drawer=false">取 消</el-button>
        <el-button type="primary" @click="submit('form',form.flag)">
          {{ ['添加','修改','离开'][form.flag] }}</el-button>
      </div>
    </el-drawer>
  </el-card>
</template>

<script>
import mixin from '@mixins'
import { ADD, EDIT, SHOW } from '@static'
import { mapState } from 'vuex'
import { deepClone } from '@utils'
export default {
  data() {
    return {
      drawer: false,
      form: {},
      rules: {
        indexs: [{ required: true, message: '请选择章节号', trigger: 'blur' }],
        title: [{ required: true, message: '请输入章节标题', trigger: 'blur' }],
        content: [
          { required: true, message: '请输入章节内容', trigger: 'blur' }
        ]
      }
    }
  },
  mixins: [mixin.admin],
  methods: {
    showDrawer(flag, data) {
      if (flag === ADD) {
      } else if (flag === EDIT) {
        this.form = deepClone(data)
      } else if (flag === SHOW) {
      }
      this.form.flag = flag
      this.drawer = true
    },
    async fecthData() {
      this.tableData = await this.$api.getChapterById({
        bookId: this.book.id
      })
    },
    submit(formName, flag) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        if (flag === ADD) {
          this[formName].bookId = this.book.id
          this[formName].words = this[formName].content.length
          const { success } = await this.$api.addChapter(this[formName])
          this.handleSuccess(success, '添加章节', this.fecthData)
        } else if (flag === EDIT) {
          const { success } = await this.$api.editChapter(this[formName])
          this.handleSuccess(success, '修改章节', this.fecthData)
        } else if (flag === SHOW) {
        }
        this.drawer = false
      })
    }
  },
  computed: {
    ...mapState({ book: 'currentBook' })
  },
  created() {
    this.fecthData()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/aCommon.less';
/deep/.el-drawer__body {
  padding: 0 30px;
}
/deep/.el-drawer__header > :first-child {
  font-size: 26px;
  text-align: center;
  color: #000;
}
.demo-drawer__footer {
  .el-button {
    width: 49%;
  }
}

.el-input-number {
  width: 100%;
}
</style>
