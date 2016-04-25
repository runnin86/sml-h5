<template>
<div class="container" transition="fade">
  <!-- 轮播图 -->
  <slider :banner="banner" style="z-index:9999;"></slider>

  <!-- 快捷入口 -->
  <bar class="home-bar">
    <bar-item path="/rank" label="盈利排行" img="/img/专家方案/盈利排行.png" h=42></bar-item>
    <bar-item path="/user/tasks" label="充值" img="/img/专家方案/充值.png" h=42></bar-item>
    <bar-item path="/invite" label="帮助" img="/img/专家方案/帮助.png" h=42></bar-item>
  </bar>

  <!-- 盈利滚动展示 -->
  <card type="content" class-name="scrollText">
    <div>
      <marquee scrollamount="10" direction="left"
        scrolldelay="5" style="margin-top: 0.3rem;">最新动态：</marquee>
    </div>
  </card>

  <!-- 内容区 -->
  <v-tabs type="tab" class-name="article-tabs">
    <v-tab name="timer-tasks" title="低赔区"
      v-pull-to-refresh="refreshAll">
      <div style="margin-top:230px;">
        <v-layer></v-layer>
        <v-card-container>
          <card type="header">card1</card>
          <card type="content">
            <card type="content-inner">
            这里是第1个card，下拉刷新会出现第2个card
            </card>
          </card>
        </v-card-container>
      </div>
    </v-tab>
    <v-tab name="common-tasks" title="高赔区" status="active"
      v-pull-to-refresh="refreshMine" v-infinite-scroll="loadMore">
      <div style="margin-top:230px;height:100%;" class="list">
        <v-layer></v-layer>
        <v-card-container v-for="task in tasks | orderBy 'id' -1">
          <card type="header">
            <span>海苔  <font size="2">第220期方案</font></span>
            <span></span>
            <span>
              <a @click="addToCart()"><font size="2" color="orange">加入购物车</font></a>
            </span>
          </card>
          <div v-link="{ path: '/plan/planDetail', activeClass: 'active', replace: false}">
            <card type="content text-center" style="padding:0.1rem">
              预期盈利
            </card>
            <card type="content-inner" style="padding:0.2rem">
              <div class="progress">
                <span class="orange" style="width: 60%;"><span>60%</span></span>
              </div>
            </card>
            <card type="footer">
              <span>购买2080</span>
              <span>销售额2080182</span>
              <span>售价<font color="red">8.00</font></span>
            </card>
          </div>
        </v-card-container>
      </div>
    </v-tab>
  </v-tabs>
</div>
</template>

<script>
import Slider from '../../components/Slider'
import Bar from '../../components/Bar'
import BarItem from '../../components/BarItem'

import VButton from '../../components/Button'
import VIcon from '../../components/Iconfont'
import VTabs from '../../components/Tabs'
import VTab from '../../components/Tab'
import VLayer from '../../components/PullToRefreshLayer'
import VCardContainer from '../../components/Card'
import Card from '../../components/CardItem'
import {loader} from '../../util/util'
import $ from 'zepto'

export default {
  ready () {
    $.init()
  },
  data () {
    return {
      title: '任务列表',
      banner: [],
      loading: false,
      tasks: [
        {
          id: 1,
          title: 'card1',
          content: '这里是第1个card，下拉刷新会出现第2个card'
        }
      ]
    }
  },
  computed: {
    length () {
      return this.tasks.length
    }
  },
  methods: {
    addToCart () {
      console.log('进入添加购物车')
    },
    openPanel () {
      $.openPanel('#panel-demo')
    },
    refreshAll () {
      $.showIndicator()
      setTimeout(function () {
        console.log('refreshAll')
        var cardNumber = $(this.$el).find('.card').length
        var cardHTML = '<div class="card">' +
          '<div class="card-header">card' + cardNumber + '</div>' +
          '<div class="card-content">' +
          '<div class="card-content-inner">' +
          '这里是第' + cardNumber + '个card，下拉刷新会出现第' + (cardNumber + 1) + '个card。' +
          '</div>' +
          '</div>' +
          '</div>'
        $(this.$el).find('.allTasks').prepend(cardHTML)
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 1500)
    },
    refreshMine () {
      $.showIndicator()
      setTimeout(function () {
        console.log('refreshMine')
        let num = this.length + 1
        let title = `card${num}`
        let content = `这里是第${num}个card，下拉刷新会出现第${num + 1}个card。`
        this.tasks.push({
          id: num,
          title: title,
          content: content
        })
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 1500)
    },
    loadMore () {
      if (this.loading) {
        return
      }
      this.loading = true
      let scroller = $('.list')
      loader.show()
      setTimeout(() => {
        console.log('loadMore')
        let num = this.length + 1
        let title = `card${num}`
        let content = `这里是第${num}个card，下拉刷新会出现第${num + 1}个card。`
        this.tasks.push({
          id: num,
          title: title,
          content: content
        })
        let scrollTop = scroller[0].scrollHeight - scroller.height() - 20
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 1500)
    }
  },
  components: {
    Slider,
    Bar,
    BarItem,
    VButton,
    VIcon,
    VTabs,
    VTab,
    VLayer,
    VCardContainer,
    Card
  }
}
</script>

<style>
.article {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /*overflow: auto;*/
  -webkit-overflow-scrolling: touch;
}
.article-tabs .buttons-tab {
  z-index: 10;
  /*margin-top:0.4rem;*/
  /*background-color: #128182;*/
}
#common-tasks, #timer-tasks {
  top: 0.2rem;
}

.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.home-bar {
  background: #efeff4;
  height: 3.2rem;
  position: relative;
  box-shadow: 0 .01rem .05rem rgba(0,0,0,.3);
}
.home-bar .tab-item {
  height: 3.2rem;
  background-color: white;
}

.list-block {
  margin: .5rem 0;
}
.list {
  bottom: 2.5rem;
  padding-bottom: 1rem;
}
.scrollText{
  background-color:white;
  z-index:10;
}
.scrollText:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
  height: 1px;
  width: 100%;
  background-color: #e1e1e1;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
}
.scrollText:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: #e1e1e1;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
</style>
