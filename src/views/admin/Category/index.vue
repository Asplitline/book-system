<template>
  <el-card class="category">
    <el-container>
      <el-header style="height:30px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'book' }">分类管理</el-breadcrumb-item>
          <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="success" class="add-btn" size="mini" @click="showDialog(0)"
          plain>添加分类</el-button>
      </el-header>
      <el-main>
        <!-- table -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="分类名" min-width="100">
          </el-table-column>
          <el-table-column prop="description" label="描述" min-width="100">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" min-width="100">
            <template v-slot="{row}">
              {{row.createTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" min-width="100">
            <template v-slot="{row}">
              {{row.createTime | formatDate}}
            </template>
          </el-table-column>
          <el-table-column min-width="100">
            <template slot="header" slot-scope="scope">
              <el-input v-model="query.keyword" size="mini" placeholder="输入关键字搜索"
                :clearable="true" @clear="clearIpt(fetchData,scope)">
                <el-button slot="append" icon="el-icon-search" @click="fetchData">
                </el-button>
              </el-input>
            </template>
            <template slot-scope="{row}">
              <el-link type="primary" :underline="false" @click="showDialog(1,row)">
                修改分类
              </el-link>
              <el-link type="danger" :underline="false"
                @click="deleteById($api.deleteCategory,fetchData,row.id,'分类')">
                删除分类
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
    <!-- dialog -->
    <el-dialog :title="['添加分类','修改分类'][this.form.flag]" :visible.sync="dialogFormVisible"
      width="30%" @close="resetForm('form')">
      <el-form :model="form" size="small" ref="form" :rules="rules">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类说明" prop="description">
          <el-input v-model="form.description" autocomplete="off" maxlength="20"
            show-word-limit>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitDialog('form')" size="small">
          {{['添加','修改'][this.form.flag]}}
        </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// todo search category
import mixins from '@mixins'
import { ADD, EDIT } from '@static'
import { deepClone } from '@utils'
export default {
  data() {
    return {
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入分类描述', trigger: 'blur' }
        ]
      }
    }
  },
  mixins: [mixins.admin],
  methods: {
    async fetchData() {
      const { list, total } = await this.$api.getCategoryList(this.query)
      this.tableData = list
      this.total = total
    },
    showDialog(flag, data) {
      this.dialogFormVisible = true
      if (flag === ADD) {
        this.form.flag = flag
      } else if (flag === EDIT) {
        this.$nextTick(() => {
          this.form = deepClone(data)
          this.form.flag = flag
        })
      }
    },
    submitDialog(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        this[formName].updateTime = Date.now()
        if (this[formName].flag === ADD) {
          this[formName].createTime = Date.now()
          const { success } = await this.$api.addCategory(this[formName])
          this.handleSuccess(success, '添加分类', this.fetchData)
        } else if (this[formName].flag === EDIT) {
          const { success } = await this.$api.editCategory(this[formName])
          this.handleSuccess(success, '修改分类', this.fetchData)
        }
        this.dialogFormVisible = false
      })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>
<style lang="less" scoped>
@import '~@css/aCommon.less';
</style>
