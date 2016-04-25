<template>
<div class="rank" transition="bounce">
  <v-nav :path="path" :title="title"></v-nav>
  <div v-pull-to-refresh="refresh">
    <v-layer></v-layer>
    <v-list type="media" class-name="inset">
      <li class="item-content" v-for="rank in ranks">
        <div v-if="showImg" class="item-media">
          <img :src="rank.images| split ','| getArray 0" style="width: 2.8rem;">
        </div>
        <div v-else class="item-media">
          <img src="/img/乐夺宝/产品图片默认.png" style="width: 2.8rem;">
        </div>
        <div class="item-inner">
          <div style="font-size:.8rem;" class="text-sml">
            {{rank.name}}
          </div>
          <div v-if="rank.status==0 && this.isShowTime(rank.publicTime).show" class="row">
            <span style="margin-top: -2rem;">
              <div style="margin-left:0.6rem;font-size:.6rem;">揭晓倒计时</div>
              <v-count-down :countTime="this.isShowTime(rank.publicTime).time"></v-count-down>
              <div>
              </div>
            </span>
          </div>
          <div v-if="rank.status==0 && !this.isShowTime(rank.publicTime).show"
            class="row" style="background-color: #EEEEEE;margin-top: 0.2rem;font-size:.4rem;">
            <div style="margin:0.2rem 0.2rem 0.2rem 0.8rem;">
              <span id="knowResult">
                <div>
                  中奖号码: <font color="red"> {{rank.luckCode}}</font>
                </div>
                <div>
                  <span>获奖者: {{rank.user_name}}<span>
                  <span class="pull-right" style="margin-right: 0.6rem;">
                    <font color="blue">已揭晓 </font>
                  <span>
                </div>
                <div>
                  人次: <font color="red"> {{rank.payCount}}</font>
                </div>
                <div>
                  日期: {{rank.publicTime}}
                </div>
              </span>
            </div>
          </div>
        </div>
      </li>
    </v-list>
  </div>
</div>
</template>

<script>
import $ from 'zepto'
import VNav from '../../components/Nav'
import VList from '../../components/List'
import VLayer from '../../components/PullToRefreshLayer'
import VCountDown from '../../components/Countdown'
import {hpApi} from '../../util/service'
import {loader} from '../../util/util'

export default {
  ready () {
    $.init()
    this.getLatest()
  },
  data () {
    return {
      title: '最新揭晓',
      path: '/happyPurchase',
      showImg: window.localStorage.getItem('imageSwitch') === 'true',
      loading: false,
      ranks: []
    }
  },
  methods: {
    refresh () {
      $.showIndicator()
      setTimeout(function () {
        // 获取最新揭晓记录
        this.getLatest()
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 1000)
    },
    loadMore () {
      if (this.loading) {
        return
      }
      this.loading = true
      let scroller = $('.inset')
      loader.show()
      setTimeout(() => {
        console.log('loadMore')
        let num = this.length + 1
        let content = `这里是第${num}个card，下拉刷新会出现第${num + 1}个card。`
        this.ranks.push({
          avatar: 'http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg',
          nickname: content,
          countTime: new Date()
        })
        let scrollTop = scroller[0].scrollHeight - scroller.height() - 20
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 1500)
    },
    getLatest () {
      this.$http.get(hpApi.oneBuyNewPublic)
      .then(({data: {code, msg, results}})=>{
        if (code === 1) {
          this.ranks = results.list
        }
      }).catch((e)=>{
        console.error('获取最新揭晓失败:' + e)
      })
    },
    /*
     * 是否展示倒计时
     */
    isShowTime (time) {
      let pubTime = new Date(Date.parse(time.replace(/-/g, '/')))
      let now = new Date()
      // now.setMinutes(now.getMinutes() + 15)
      if (now < pubTime) {
        // 展示倒计时
        return {show: true, time: pubTime}
      }
      else {
        // 展示结果
        return {show: false, time: pubTime}
      }
    }
  },
  components: {
    VNav,
    VList,
    VLayer,
    VCountDown
  }
}
</script>

<style>
.rank {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.rank .inset {
  margin-left: .35rem;
  margin-right: .35rem;
  margin-top: .35rem;
}
.rank .rank-num {
  float: right;
  min-width: 1.2rem;
  line-height: 1.2rem;
  border-radius: 50%;
  padding-left: .35rem;
  color: white;
  margin-top: -.7rem;
  vertical-align: top;
  display: inline-block;
  font-size: .8rem;
}
#knowResult{
  font-size: 0.48rem;
}
</style>
