<template>
  <el-card class="book">
    <el-container>
      <el-header style="height:30px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'book' }">书籍管理</el-breadcrumb-item>
          <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="success" class="add-btn" size="mini" @click="showDialog(0)"
          plain>添加书籍</el-button>
      </el-header>
      <el-main>
        <!-- table -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="bm" label="编号" min-width="80">
          </el-table-column>
          <el-table-column prop="name" label="书名" min-width="100">
          </el-table-column>
          <el-table-column prop="author" label="作者" min-width="100">
          </el-table-column>
          <el-table-column prop="lxInfo.name" label="分类" min-width="80">
          </el-table-column>
          <el-table-column prop="number" label="库存" min-width="100">
          </el-table-column>
          <el-table-column min-width="100">
            <template slot="header" slot-scope="scope">
              <el-input v-model="query.keyword" size="mini" placeholder="输入关键字搜索"
                :clearable="true" @clear="clearIpt(fetchData,scope)">
                <!-- tag 解决报错 -->
                <el-button slot="append" icon="el-icon-search" @click="fetchData">
                </el-button>
              </el-input>
            </template>
            <template slot-scope="{row}">
              <!-- todo book detail -->
              <el-link type="primary" :underline="false" @click="goToBookDetail(1,row)">
                图书详情
              </el-link>
              <el-link type="success" :underline="false" @click="showDialog(1,row)">
                修改图书
              </el-link>
              <el-link type="danger" :underline="false"
                @click="deleteById($api.deleteBook,fetchData,row.id,'图书')">
                删除图书
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
    <!-- todo add|edit avatar -->
    <el-dialog :title="['添加图书','修改书籍'][this.form.flag]" :visible.sync="dialogFormVisible"
      width="30%" @close="resetForm('form')">
      <el-form :model="form" size="small" ref="form" :rules="rules" label-width="80px">
        <el-form-item label="封面" prop="imgUrl">
          <el-upload class="avatar-uploader" :action="bindIMG('util/uploadfile')"
            :show-file-list="false" :on-success="handleAvatarSuccess" name="files"
            :data="uploadInfo">
            <img v-if="form.imgUrl" :src="bindIMG(form.imgUrl)" class="avatar"
              ref="preview" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="编号" prop="bm">
          <el-input v-model="form.bm">
            <template slot="prepend">{{PREFIX_BOOK}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="书名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="lx">
          <el-select v-model="form.lx" autocomplete="off" style="width:100%
          ">
            <el-option :label="item.name" :value="item.id" v-for="item in allCategory"
              :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input-number v-model="form.number" :min="1" :max="99"></el-input-number>
        </el-form-item>
        <el-form-item label="简介" prop="description">
          <el-input v-model="form.description" autocomplete="off" type="textarea"
            :autosize="{minRows:2,maxRows:4}" resize="none">
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
import mixins from '@mixins'
import { mapActions, mapGetters, mapState } from 'vuex'
import { EDIT, ADD, PREFIX_BOOK } from '@static'
import { deepClone, bindIMG, checkBM } from '@utils'
export default {
  data() {
    return {
      rules: {
        imgUrl: [
          { required: true, message: '请选择书籍封面', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入书籍名称', trigger: 'blur' }],
        author: [
          { required: true, message: '请输入书籍作者', trigger: 'blur' }
        ],
        lx: [{ required: true, message: '请输入书籍类型', trigger: 'blur' }],
        bm: [
          { required: true, message: '请输入书籍编号', trigger: 'blur' },
          { validator: checkBM, trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请录入书籍数量', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入书籍简介', trigger: 'blur' }
        ]
      },
      uploadInfo: {},
      PREFIX_BOOK
    }
  },
  mixins: [mixins.admin],
  methods: {
    ...mapActions(['getAllCategory']),
    bindIMG,
    async fetchData() {
      const { list, total } = await this.$api.getBookList(this.query)
      this.tableData = list.map((item) => {
        item.lxInfo = this.getCategoryById(item.lx)
        return item
      })
      this.total = total
    },
    showDialog(flag, data) {
      this.dialogFormVisible = true
      if (flag === ADD) {
        this.form.flag = flag
      } else if (flag === EDIT) {
        this.$nextTick(async () => {
          this.form = deepClone(data)
          this.form.flag = flag
          this.form.bm = this.form.bm.split('BM-')[1]
          const file = await this.$api.getFileById({ id: this.form.id })
          if (file.length) {
            this.$set(this.form, 'imgUrl', file[0].filename)
            this.uploadInfo = { id: file[0].id }
          }
        })
      }
    },
    handleAvatarSuccess(res, file) {
      this.$set(this.form, 'imgUrl', file.name)
      if (this.form.flag === ADD) {
        this.form.id = res
      }
    },
    submitDialog(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        this[formName].updateTime = Date.now()
        this[formName].bm = PREFIX_BOOK + this[formName].bm
        if (this[formName].flag === ADD) {
          this[formName].createTime = Date.now()
          const { success } = await this.$api.addBook(this[formName])
          this.handleSuccess(success, '添加书籍', this.fetchData)
        } else if (this[formName].flag === EDIT) {
          const { success } = await this.$api.editBook(this[formName])
          this.handleSuccess(success, '修改书籍', this.fetchData)
        }
        this.dialogFormVisible = false
      })
    }
  },
  computed: {
    ...mapGetters(['getCategoryById']),
    ...mapState(['allCategory'])
  },
  created() {
    this.fetchData()
    this.getAllCategory(this)
  }
}
</script>

<style lang="less" scoped>
@import '~@css/aCommon.less';
/deep/.el-upload {
  width: 140px;
  height: 196px;
}
</style>
