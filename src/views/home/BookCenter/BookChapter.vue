<template>
  <el-card class="book-chapter">
    <div class="c-title">
      <h4>第一章：正经人谁唱歌啊</h4>
      <div class="tag">
        <span class="book">斗破苍穹</span>
        <span class="author">天蚕土豆</span>
        <span class="word">3111字</span>
      </div>
    </div>
    <div class="c-content">
      <p><a href="javascript:;"
          @click="selectText('娱乐圈泥石流，流行界的万恶之源——李铁柱，出道于一档国民音乐选秀节目。')">娱乐圈泥石流，流行界的万恶之源——李铁柱，出道于一档国民音乐选秀节目。</a>
      </p>
      <p><a href="javascript:;">…..….</a></p>
      <p><a href="javascript:;">2016年，7月16日，周六。10</a></p>
      <p><a href="javascript:;">盛夏的阳光，炽热地拥抱着这个世界，仿佛要融化一切。1</a></p>
      <p><a href="javascript:;">
          被誉为巨星摇篮的全民选秀节目——《超级好声音》第六季，西部赛区海选现场，偌大的候选区坐满了前来参加海选的少男少女，足足有四五百人。17"麻烦让让，让让......快来不及了，谢谢!”2
        </a></p>
      <p><a href="javascript:;">
          一个背吉他的锅盖头小胖子，拽着一个吃着冰棍的少年，艰难且粗鲁地穿过人群，惹得附近选手们阵阵抱怨和鄙夷。7小胖子来到登台口附近，抬头看了一眼墙壁上的大屏幕，目前竞演的是797号，而他的编号是801号。3
        </a></p>
      <p><a href="javascript:;">“呼——好险，总算赶上了! “</a></p>
      <p><a href="javascript:;">"秦涛，说好的我陪你海选，你家养猪场扩建的活儿就我干，不准耍赖。”29</a></p>
      <p><a href="javascript:;">
          吃冰棍的少年，十七八岁模样，穿着一件破旧白色背心，一条短裤，脚上蹬了一双破了洞的绿色胶鞋，一副标准的民工打扮。他身材瘦高，小麦色皮肤，简单的圆寸头，脸庞棱角分明，浓眉大眼却目光略显呆滞，看起来有些憨直。39
        </a></p>
      <p><a href="javascript:;">
          "知道了，李铁柱，你，你.……赶河紧把歌词再背一遍，马上就该我们上场了。我感觉状态特别好，我.....快要裂开了。”25小胖子秦涛忐忑地擦了擦额头的汗，声音因为紧张而剧烈颤抖着。4
        </a></p>
      <p><a
          href="javascript:;">大热的天气，他却穿着一身带铆钉的黑色皮夹克，崩得快要裂开的紧身皮裤，以及同样带铆钉的高帮皮靴，没有中暑已经是奇迹了。2“裂开是因为你裤子穿太紧，勒着沟子了。”65
        </a></p>
      <p><a
          href="javascript:;">李铁柱大大咧咧坐在地板上，继续舔冰棍。要不是为了拿下养猪场的活儿，他才不会冒着被工头扣工时的风险，偷溜出来陪秦涛胡闹呢。5当明星?
        </a></p>
      <p><a href="javascript:;">不存在的。</a></p>
      <p><a href="javascript:;">两人是死党，今年都是十七岁，暑假过后就上高三了。2</a></p>
      <p><a
          href="javascript:;">秦涛家是开养猪场的，可谓富甲一镇，但叛逆的秦涛却羞于与猪为伍，一心只想当歌星。4李铁柱是农村人，家里一贫如洗，父子二人相依为命。10
        </a></p>

    </div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <div class="comment-header">
        <el-input type="textarea" :autosize="{minRows:4,maxRows:6}" resize="none">
        </el-input>
        <el-button type="danger" size="mini">发表</el-button>
      </div>
      <div class="comment-body">
        <template v-if="false">
          <h4>共12条信息</h4>
          <ul class="comment-list">
            <li class="comment-item">
              <div class="avatar">
                <img
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  alt="">
              </div>
              <div class="info">
                <div class="author">卟葯冭随意</div>
                <div class="date">11楼·01-11 11:30:16</div>
                <div class="content">中国比惨大会正式开始</div>
              </div>
            </li>
          </ul>
        </template>

        <template v-else>
          <div class="not-found">
            暂无信息
          </div>
        </template>
      </div>

    </el-drawer>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      comment: {},
      drawer: false
    }
  },
  methods: {
    selectText(val) {
      this.drawer = true
      this.$set(this.comment, 'val', val)
    }
  }
}
</script>

<style lang="less" scoped>
.book-chapter {
  position: relative;
  padding: 10px;
  border: 1px solid #d8d8d8;
  background-color: #f8f3e9;
  min-height: 400px;
  .c-title {
    color: #262626;
    h4 {
      font-size: 24px;
      font-weight: 400;
    }
    .tag {
      padding-left: 12px;
      margin: 10px 0;
      span {
        color: rgba(0, 0, 0, 0.4);
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }
  .c-content {
    line-height: 1.8;
    font-size: 18px;
    color: #262626;
    text-indent: 2em;
    p {
      margin: 10px 0;
    }
  }
  .aside-comment {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #000;
  }
}
/deep/.el-drawer {
  background-color: #f8f3e9;
  padding: 40px;
  .el-button {
    margin-top: 10px;
    float: right;
  }
}
.comment-header {
  padding-bottom: 40px;
}

.comment-body {
  margin-top: 20px;
  h4 {
    color: #a6a6a6;
    font-size: 20px;
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #c0c0c0;
  }
  .comment-item {
    padding: 20px 10px;
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    .avatar {
      margin-right: 10px;
      img {
        width: 44px;
        height: 44px;
      }
    }
    .author {
      color: #3f5a93;
    }
    .date {
      color: #a6a6a6;
      font-size: 14px;
    }
    .content {
      color: #262626;
      font-size: 14px;
      line-height: 22px;
      padding: 10px 6px;
    }
  }
}
</style>
