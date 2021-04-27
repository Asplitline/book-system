<template>
  <div class="suggest">
    <div class="split-line">
      <span> <i class="iconfont icon-edit"></i> 投诉管理</span>
    </div>
    <!-- 面包导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>投诉管理</el-breadcrumb-item>
      <el-breadcrumb-item>投诉列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="mixInp" :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="query.keyword"
          class="input-with-select"
          clearable
          @clear="getSuggest()"
          size="small"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getSuggest()"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 用户表单 -->
    <el-table :data="suggestList" stripe style="width: 100%" max-height="500">
      <el-table-column prop="title" label="投诉标题" min-width="120">
      </el-table-column>
      <el-table-column prop="description" label="投诉内容" min-width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="投诉时间" min-width="120">
        <template v-slot="{ row }">
          {{ row.createTime | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="投诉状态" min-width="120">
        <template v-slot="{ row }">
          <el-tag v-if="row.state === 0" type="danger">未回复</el-tag>
          <el-tag v-else>已回复</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template v-slot="{ row }">
          <el-tooltip
            class="item"
            effect="dark"
            content="回复投诉"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              :disabled="row.state === 1"
              @click="showSuggestDialog(row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除投诉"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="deleteSuggestById(row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="投诉详情"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="warning"
              icon="el-icon-tickets"
              size="small"
              @click="showSuggestDetailDialog()"
              :disabled="row.state === 0"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="query.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 投诉对话框 -->
    <el-dialog :visible.sync="isSuggestDialog" width="30%">
      <div class="content">
        <p>
          投诉标题:<span>{{ suggestForm.title }}</span>
        </p>
        <p>
          投诉内容:<span class="mark">{{ suggestForm.description }}</span>
        </p>
        <p>
          投诉时间:<span>{{ suggestForm.createTime | formatDate }}</span>
        </p>
        <p>
          投诉状态:<span>{{
            suggestForm.state === 0 ? '未回复' : '已回复'
          }}</span>
        </p>
        <p class="breif">
          投诉图片:
          <span>
            <img
              :src="bindUrl(suggestForm.imageUrl)"
              alt=""
              width="100"
              height="100"
            />
          </span>
        </p>
        <p>
          回复投诉：
          <el-input
            v-model="suggestForm.content"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isSuggestDialog = false" size="mini"
          >取 消</el-button
        >
        <el-button type="primary" @click="replySuggest()" size="mini"
          >回 复</el-button
        >
      </span>
    </el-dialog>

    <!-- 投诉详情 -->
    <el-dialog :visible.sync="isSuggestDetailDialog" width="30%">
      <div class="content">
        <p>
          投诉标题:<span>{{ suggestForm.title }}</span>
        </p>
        <p>
          投诉内容:<span class="mark">{{ suggestForm.description }}</span>
        </p>
        <p>
          投诉时间:<span>{{ suggestForm.createTime | formatDate }}</span>
        </p>
        <p>
          投诉状态:<span>{{
            suggestForm.state === 0 ? '未回复' : '已回复'
          }}</span>
        </p>
        <p class="breif">
          投诉图片:
          <span>
            <img
              :src="bindUrl(suggestForm.imageUrl)"
              alt=""
              width="100"
              height="100"
            />
          </span>
        </p>
        <p>
          投诉回复:<span class="mark">{{
            suggestForm.content || '暂未回复'
          }}</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="isSuggestDetailDialog = false"
          size="mini"
          >关 闭</el-button
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
      suggestList: [{}],
      query: {
        page: 1, // 当前页
        size: 10, // 最大页数
        keyword: null
      },
      total: 10,
      suggestForm: {},
      suggestRules: {},
      isSuggestDialog: false,
      isSuggestDetailDialog: false
    }
  },
  methods: {
    ...mapActions(['getFileById']),
    // 获取投诉列表
    async getSuggest() {
      const { data, status } = await this.$http.get('/addvice/pageAddvice', {
        params: this.query
      })
      if (status === 200) {
        const { total, list } = data
        this.total = total
        this.suggestList = list
      } else {
        this.$messger.warning('请求失败')
      }
    },
    // 显示投诉对话框
    async showSuggestDialog(data) {
      this.isSuggestDialog = true
      this.suggestForm = this.convertDeepCopy(data)
      const file = await this.getFileById(this.suggestForm.id)
      this.$set(this.suggestForm, 'imageUrl', file.name)
    },
    // 显示投诉详情
    showSuggestDetailDialog() {
      this.isSuggestDetailDialog = true
    },
    // 最大页
    handleSizeChange(size) {
      this.query.size = size
      this.query.page = 1
      this.getSuggest()
    },
    // 当前页
    handleCurrentChange(currentIndex) {
      this.query.page = currentIndex
      this.getSuggest()
    },
    // 回复投诉
    async replySuggest() {
      if (this.suggestForm.content.trim() === 0) {
        this.$message.warning('回复不能为空')
        return
      }
      this.suggestForm.state = 1
      const { data, status } = await this.$http.put(
        '/addvice/updateIgnoreNull',
        this.suggestForm
      )
      if (status === 200) {
        if (data) {
          this.$message.success('回复成功')
          this.isSuggestDialog = false
          this.getSuggest()
        } else {
          this.$message.error('回复失败')
        }
      } else {
        this.$message.warning('请求失败')
      }
    },
    // 删除回复
    deleteSuggestById(id) {
      this.$confirm('此操作将永久删除投诉, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          const { data, status } = await this.$http.delete('/addvice/delete', {
            data: {
              id
            }
          })
          if (status === 200) {
            if (data) {
              this.getSuggest()
              this.$message.success('删除成功')
            } else {
              this.$message.error('删除失败')
            }
          } else {
            this.$message.warning('请求失败')
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  },
  created() {
    this.getSuggest()
  }
}
</script>

<style lang="less" scoped>
.suggest {
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
