<template>
  <div class="suggest">
    <el-card shadow="always">
      <!-- 搜索框 -->
      <el-row class="topSearch">
        <el-col :span="8">
          <el-input
            placeholder="请输入标题"
            v-model="query.keyword"
            @clear="getSuggest()"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getSuggest()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button class="add-suggest" @click="showSuggestDialog"
            >添加投诉</el-button
          >
        </el-col>
        <el-col :span="8" :offset="4">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-col>
      </el-row>
      <!-- 列表表格 -->
      <el-row class="bottomTable">
        <el-table :data="suggestTable" style="width: 100%">
          <el-table-column prop="title" label="投诉标题" min-width="100">
          </el-table-column>
          <el-table-column prop="description" label="投诉内容" min-width="100">
          </el-table-column>
          <el-table-column prop="createTime" label="投诉时间" min-width="100">
            <template v-slot="{ row }">
              {{ row.createTime | formatDate }}
            </template>
          </el-table-column>
          <el-table-column prop="state" label="投诉状态" min-width="100">
            <template v-slot="{ row }">
              <el-tag v-if="row.state === 0" type="danger">未回复</el-tag>
              <el-tag v-else>已回复</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template v-slot="{ row }">
              <el-button
                type="primary"
                size="mini"
                @click="showSuggestDetail(row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <!-- 添加投诉对话框 -->
    <el-dialog
      title="新增投诉"
      :visible.sync="isSuggestDialog"
      width="25%"
      @close="clearDialog"
    >
      <el-form
        :model="suggestForm"
        :rules="suggestRules"
        ref="suggestForm"
        size="small"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="suggestForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="description">
          <el-input
            v-model="suggestForm.description"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片说明" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            :action="bindImg('util/uploadfile')"
            :show-file-list="false"
            :on-success="handleAddAvatarSuccess"
            name="files"
          >
            <img
              v-if="suggestForm.imageUrl"
              :src="suggestForm.imageUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isSuggestDialog = false" size="mini"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="submitSuggest('suggestForm')"
          size="mini"
          >新 增</el-button
        >
      </span>
    </el-dialog>
    <!-- 投诉详情对话框 -->
    <el-dialog :visible.sync="isSuggesDetailtDialog" width="30%">
      <div class="content">
        <p>
          投诉标题:<span>{{ suggestFormDetail.title }}</span>
        </p>
        <p>
          投诉内容:<span class="mark">{{ suggestFormDetail.description }}</span>
        </p>
        <p>
          投诉时间:<span>{{ suggestFormDetail.createTime | formatDate }}</span>
        </p>
        <p>
          投诉状态:<span>{{
            suggestFormDetail.state === 0 ? '未回复' : '已回复'
          }}</span>
        </p>
        <p class="breif">
          投诉图片:
          <span>
            <img
              :src="bindUrl(suggestFormDetail.imageUrl)"
              alt=""
              width="100"
              height="100"
            />
          </span>
        </p>
        <p>
          投诉回复:<span class="mark">{{
            suggestFormDetail.content || '暂未回复'
          }}</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="isSuggesDetailtDialog = false"
          size="mini"
          >关闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      query: {
        keyword: null,
        page: 1,
        size: 10
      },
      total: 10,
      suggestTable: [{}],
      isSuggestDialog: false,
      suggestForm: {},
      suggestRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入投诉内容', trigger: 'blur' }
        ],
        imageUrl: [
          { required: true, message: '请添加图片说明', trigger: 'blur' }
        ]
      },
      isSuggesDetailtDialog: false,
      suggestFormDetail: {}
    }
  },
  methods: {
    ...mapActions(['getFileById']),
    // 获取投诉建议
    async getSuggest() {
      const { data, status } = await this.$http.get('/addvice/pageAddvice', {
        params: this.query
      })
      if (status === 200) {
        const { total, list } = data
        this.total = total
        this.suggestTable = list
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 切换页码
    handleCurrentChange(currentIndex) {
      this.query.page = currentIndex
      this.getSuggest()
    },
    // 处理
    showSuggestDialog() {
      this.isSuggestDialog = true
    },
    // 图片上传后预览
    handleAddAvatarSuccess(res, file) {
      this.$set(this.suggestForm, 'imageUrl', URL.createObjectURL(file.raw))
      this.suggestForm.id = res
    },
    // 提交投诉
    submitSuggest(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return
        const current = this.isLoginAndGetCommonInfo()
        if (current === null) {
          return
        }
        const { data, status } = await this.$http.post(
          '/addvice/insert',
          current
        )
        if (status === 200) {
          if (data) {
            this.$message.success('投诉成功')
            this.getSuggest()
            this.isSuggestDialog = false
          } else {
            this.$message.error('投诉失败')
          }
        } else {
          this.$message.warning('请求失败')
        }
      })
    },
    // 判断登录状态
    isLoginAndGetCommonInfo() {
      const currentUr = this.$store.state.user
      const currentSg = this.suggestForm
      if (currentUr === null) {
        this.$message.error('请先登录')
        return null
      } else {
        return {
          userId: currentUr.id,
          username: currentUr.username,
          title: currentSg.title,
          description: currentSg.description,
          id: currentSg.id,
          state: 0
        }
      }
    },
    // 显示投诉详情
    async showSuggestDetail(formData) {
      this.isSuggesDetailtDialog = true
      this.suggestFormDetail = this.convertDeepCopy(formData)
      const file = await this.getFileById(this.suggestFormDetail.id)
      this.$set(this.suggestFormDetail, 'imageUrl', file.name)
    },
    // 清空添加投诉
    clearDialog() {
      this.suggestForm = {}
    }
  },
  created() {
    this.getSuggest()
  }
}
</script>

<style lang="less" scoped>
// 搜索框
.topSearch {
  // 自定义分页样式
  margin-bottom: 24px;
  .el-pagination {
    font-size: 18px;
    margin-top: 6px;
    /deep/ .btn-next .el-icon,
    /deep/ .btn-prev .el-icon {
      font-size: 18px;
    }

    /deep/ .el-pager li {
      font-size: 16px;
      font-weight: 550;
    }
  }
  .add-suggest {
    margin-left: 14px;
  }
}

// 表格
.bottomTable {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.2);
  /deep/.el-table__row td:nth-child(2) .cell {
    overflow: hidden;
    white-space: nowrap; /* 设置文本不换行，单行显示 */
    text-overflow: ellipsis; /* 超出的文本使用省略号代替 */
  }
}

.suggest {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  /deep/.el-upload {
    position: relative;
    border: 2px dashed rgba(0, 0, 0, 0.1);
    line-height: 0;
    border-radius: 2px;
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
      box-shadow: 0px 1px 2px 1px rgba(0 0 0 / 0.2);
    }
    &:hover {
      border: 2px dashed #ff525278;
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 20px;
    }
  }
  .content {
    letter-spacing: 2px;
    p {
      line-height: 26px;
      color: #000;
      margin-bottom: 4px;
      span {
        display: block;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 20px;
        box-sizing: border-box;
        color: #666;
      }
      span img {
        vertical-align: top;
      }
    }
    .mark {
      background-color: #f3f3f3;
    }
  }
}
</style>
