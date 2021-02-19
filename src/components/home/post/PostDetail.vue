<template>
  <div class="post-detail">
    <el-card>
      <div class="post-hd">
        <el-button
          class="btn-back"
          type="danger"
          icon="el-icon-refresh-left"
          size="mini"
          >返回</el-button
        >
      </div>
      <el-divider></el-divider>
      <div class="post-bd">
        <p>
          不知不觉在网易已有三年半，占了一半时间都在与移动端打交道，整个阶段都是遇坑填坑的学习过程。移动端开发在前端里像神一样地存在，不是说它多难而是说它坑位实在太多了，怎样填都填不完。<code>Android</code>和<code>iOS</code>各显神通，<code>Android</code>的系统版本和屏幕分辨率多得难以一招兼容，<code>iOS</code>的顽固标准和未知特性多得难以快速掌握。
        </p>
        <p>
          三年半沉淀通过本文记录下所遇到的坑位，或许有些坑位还未遇到，但本文记录的<strong>40条坑位</strong>绝对能让同学们少走很多弯路，特别是前端小白。为了减少废话提高本文质量，对以下内容做一些约定。
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.post-detail {
  .post-hd {
    overflow: hidden;
    .btn-back {
      float: right;
    }
  }
}
</style>
