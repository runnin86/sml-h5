<template>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh">
    <v-layer></v-layer>
    <!-- 轮播图 -->
    <slider :banner="banner" style="z-index:9999;"></slider>

    <!-- 快捷入口 -->
    <bar class="home-bar">
      <bar-item path="/latestAnnounced" label="最新揭晓" img="/img/乐夺宝/最新揭晓.png" h=42 i=38></bar-item>
      <!-- <bar-item path="/user/tasks" label="充值" img="/img/专家方案/充值.png" h=42 i=38></bar-item> -->
      <bar-item path="/user/help" label="帮助" img="/img/专家方案/帮助.png" h=42 i=38></bar-item>
    </bar>

    <!-- 中奖滚动展示 -->
    <card type="content" class-name="scrollHP">
      <div class="row">
        <div class="col-10" style="line-height:2rem;">
          <img src="/img/专家方案/喇叭.png" style="height:1rem;margin-left:0.2rem;margin-bottom:-0.2rem;">
        </div>
        <div class="col-90">
          <slider :banner="scrollmsg" :vertical="true" :animate-time=800 style="z-index:9999;height:2rem;"></slider>
        </div>
      </div>
    </card>

    <!-- 内容区 -->
    <v-tabs type="tab" class-name="article-tabs">
      <v-tab name="all-items" title="全部商品" status="active">
        <div style="margin-bottom:4rem;">
          <v-card-container v-for="item in itemList | orderBy 'id' -1" style="margin: 0.18rem;">
            <div class="row">
              <div v-if="showImg" class="col-25" style="margin-left:4%;"
                v-link="{name: 'itemDetail', params: { id: item.id }, query:{ number: item.number }, activeClass: 'active', replace: false}">
                <img :src="item.images| split ','| getArray 0" style="margin-top:1rem;width: 130%;height:130%;">
              </div>
              <div v-else class="col-25" style="margin-left:4%;"
                v-link="{name: 'itemDetail', params: { id: item.id }, query:{ number: item.number }, activeClass: 'active', replace: false}">
                <img src="/img/乐夺宝/产品图片默认.png" style="margin-top:1rem;width: 130%;height:130%;">
              </div>
              <div class="col-66">
                <div style="width: 114%;"
                  v-link="{name: 'itemDetail', params: { id: item.id }, query:{ number: item.number }, activeClass: 'active', replace: false}">
                  <card type="content-inner" style="padding-bottom:0.2rem;">
                    <div style="font-size:.8rem;" class="text-sml">第{{item.number}}期 {{item.name}}</div>
                    <div style="font-size:.6rem;" class="text-sml">{{item.content}}</div>
                  </card>
                </div>
                <div class="row" style="width: 110%;margin-left:0.1rem;">
                  <div class="col-75"
                    v-link="{name: 'itemDetail', params: { id: item.id }, query:{ number: item.number }, activeClass: 'active', replace: false}">
                    <card type="content-inner" style="padding:0.1rem">
                      <div class="progress" style="height:10px;">
                        <span v-if="parseFloat((item.totalCount-item.codeCount)/item.totalCount) > 0"
                          class="blue"
                          :style="{ height: '8px', width: parseFloat((item.totalCount-item.codeCount)/item.totalCount)*100 + '%' }"></span>
                      </div>
                    </card>
                    <card type="header" style="padding-top:0.2rem;padding-bottom:1rem;">
                      <span style="font-size:.6rem;">
                        <div>{{item.totalCount}}</div><div>总需</div>
                      </span>
                      <span style="font-size:.6rem;">
                        <div>{{item.codeCount}}</div><div>剩余</div>
                      </span>
                    </card>
                  </div>
                  <div class="col-26"
                    style="margin-top:0.6rem;float:right;margin-right:0.6rem;">
                    <img src="/img/购物车/icon_addcar_big_black.png"
                      width="40" height="40" @click="addToCart(item)"
                      style="border:solid 0px #02DF82;border-radius: 50px;overflow:hidden;">
                  </div>
                </div>
              </div>
            </div>
          </v-card-container>
        </div>
      </v-tab>
      <v-tab name="ten-items" title="十元专区">
        <div style="margin-bottom:4rem;" class="list">
          <v-card-container v-for="item in itemList10 | orderBy 'id' -1" style="margin: 0.18rem;">
            <div class="row">
              <div v-if="showImg" class="col-25" style="margin-left:4%;"
                v-link="{name: 'itemDetail', params: { id: item.id }, query:{ number: item.number }, activeClass: 'active', replace: false}">
                <img :src="item.images| split ','| getArray 0" style="margin-top:1rem;width: 130%;height:130%;">
              </div>
              <div v-else class="col-25" style="margin-left:4%;"
                v-link="{name: 'itemDetail', params: { id: item.id }, query:{ number: item.number }, activeClass: 'active', replace: false}">
                <img src="/img/乐夺宝/产品图片默认.png" style="margin-top:1rem;width: 130%;height:130%;">
              </div>
              <div class="col-66">
                <div style="width: 114%;"
                  v-link="{name: 'itemDetail', params: { id: item.id }, query:{ number: item.number }, activeClass: 'active', replace: false}">
                  <card type="content-inner">
                    <div style="font-size:.8rem;" class="text-sml">{{item.name}}</div>
                    <div style="font-size:.6rem;" class="text-sml">{{item.content}}</div>
                  </card>
                </div>
                <div class="row" style="width: 110%;margin-left:0.1rem;">
                  <div class="col-75"
                    v-link="{name: 'itemDetail', params: { id: item.id }, query:{ number: item.number }, activeClass: 'active', replace: false}">
                    <card type="content-inner" style="padding:0.1rem">
                      <div class="progress" style="height:10px;">
                        <span v-if="parseFloat((item.totalCount-item.codeCount)/item.totalCount) > 0"
                          class="blue"
                          :style="{ height: '8px', width: parseFloat((item.totalCount-item.codeCount)/item.totalCount)*100 + '%' }"></span>
                      </div>
                    </card>
                    <card type="header">
                      <span style="font-size:.6rem;">
                        <div>{{item.totalCount}}</div><div>总需</div>
                      </span>
                      <span style="font-size:.6rem;">
                        <div>{{item.codeCount}}</div><div>剩余</div>
                      </span>
                    </card>
                  </div>
                  <div class="col-26"
                    style="margin-top:1rem;float:right;margin-right:0.6rem;">
                    <img src="/img/购物车/icon_addcar_big_black.png"
                      width="40" height="40" @click="addToCart(item)"
                      style="border:solid 0px #02DF82;border-radius: 50px;overflow:hidden;">
                  </div>
                </div>
              </div>
            </div>
          </v-card-container>
        </div>
      </v-tab>
    </v-tabs>
 </div>
</div>
</template>

<script>
import Slider from '../../components/Slider'
import Bar from '../../components/Bar'
import BarItem from '../../components/BarItem'

import VButton from '../../components/Button'
import VPayButton from '../../components/PayButton'
import VIcon from '../../components/Iconfont'
import VTabs from '../../components/Tabs'
import VTab from '../../components/Tab'
import VLayer from '../../components/PullToRefreshLayer'
import VCardContainer from '../../components/Card'
import Card from '../../components/CardItem'
import {hpApi} from '../../util/service'
import $ from 'zepto'

export default {
  ready () {
    $.init()
    document.title = '一元夺宝'
    this.getBanner()
    this.getLatestTop10()
    this.refresh()
    $.refreshScroller()
  },
  data () {
    return {
      // title: '任务列表',
      banner: [],
      loading: false,
      showImg: window.localStorage.getItem('imageSwitch') === 'true',
      itemList: [],
      itemList10: [],
      scrollmsg: [{
        content: '<div class="scrollMsgText">一元夺宝，精彩无限!</div>'
      }]
    }
  },
  computed: {
    length () {
      return this.itemList.length
    }
  },
  methods: {
    getBanner () {
      // 获取banner的图片数据
      this.$http.get(hpApi.banner)
      .then(({data: {code, msg, info}})=>{
        if (code === 1) {
          if (info.length > 0 && this.showImg) {
            let img = []
            for (var i = 0; i < info.length; i++) {
              img.push({
                content: info[i].img
              })
            }
            this.$set('banner', img)
          }
        }
        else {
          console.error('获取banner失败:' + msg)
        }
      }).catch(()=>{
        console.error('无法连接服务器获取banner')
      })
    },
    getItemList () {
      // 获取商品列表
      this.$http.get(hpApi.home)
      .then(({data: {code, msg, results, count, pagenum}})=>{
        if (code === 1) {
          this.$set('itemList', results.list)
        }
        else {
          $.toast(msg)
          console.error('获取商品列表失败:' + msg)
        }
      }).catch(()=>{
        $.alert('服务器连接中断...')
        console.error('无法连接服务器-获取商品列表')
      })
    },
    getItemList10 () {
      // 获取商品列表
      this.$http.get(hpApi.home + '?price=10')
      .then(({data: {code, msg, results, count, pagenum}})=>{
        if (code === 1) {
          this.$set('itemList10', results.list)
        }
        else {
          $.toast(msg)
          console.error('获取十元专区商品列表失败:' + msg)
        }
      }).catch((e)=>{
        console.error('无法连接服务器-获取十元专区商品列表:' + e)
      })
    },
    addToCart (item) {
      if (window.localStorage.getItem('user')) {
        // 添加至购物车
        this.$http.post(hpApi.redisCart,
          {
            'projectId': item.id,
            'number': item.number,
            'amount': item.price < 10 ? 10 : item.price
          },
          {
            headers: {
              'x-token': window.localStorage.getItem('token')
            },
            emulateJSON: true
          })
        .then(({data: {code, msg}})=>{
          if (code === 1) {
            $.toast('已加入购物车')
            // 设置购物车图标
            this.$root.setCardBadge()
          }
          else {
            $.toast(msg)
            console.error('加入购物车失败:' + msg)
          }
        }).catch((e)=>{
          console.error('无法加入购物车:' + e)
        })
      }
      else {
        $.toast('你尚未登录')
        this.$route.router.go({path: '/login?from=happyPurchase', replace: false})
      }
    },
    refresh () {
      $.showIndicator()
      setTimeout(function () {
        this.itemList = []
        this.itemList10 = []
        this.getItemList()
        this.getItemList10()
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 1345)
    },
    getLatestTop10 () {
      this.$http.get(hpApi.oneBuyNewPublic + '?pagenum=' + 0)
      .then(({data: {code, msg, results}})=>{
        if (code === 1) {
          if (results.list.length >= 0) {
            this.scrollmsg = []
            for (var i = 0; i < results.list.length; i++) {
              let info = results.list[i]
              // 速来挑战!->即刻来秒!->想中戳我!
              // info.payCount
              if (info.user_name) {
                let name = info.user_name
                // 首字*
                // let first = name.substr(0, 1)
                // let finalName = name.replace(first, '*')
                // 首字之外全部*
                let unFirst = name.substr(name.length > 2 ? 2 : 1, name.length)
                let rv = ''
                for (let i = 0; i < name.length - 1; i++) {
                  rv += '*'
                }
                let finalName = name.replace(unFirst, rv)
                let msg = '恭喜 ' + finalName + ' ' + info.price + '元夺得' + info.name
                this.scrollmsg.push({
                  content: '<div class="scrollMsgText">' + msg + '</div>'
                })
              }
            }
          }
        }
        else {
          console.error('乐夺宝首页获取最新揭晓失败!')
        }
      }).catch((e)=>{
        console.error('获取最新揭晓失败:' + e)
      })
    }
  },
  components: {
    Slider,
    Bar,
    BarItem,
    VButton,
    VPayButton,
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
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.article-tabs .buttons-tab {
  z-index: 10;
  /*margin-top:0.4rem;*/
  /*background-color: #128182;*/
}
#ten-items, #all-items {
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
  height: auto;
  position: relative;
  box-shadow: 0 .01rem .05rem rgba(0,0,0,.3);
}
.home-bar .tab-item {
  height: auto;
  padding-top: 0.1rem;
  padding-bottom: 0.2rem;
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
  /*height:1.6rem;*/
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
.text-sml{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.scrollHP{
  background-color:#66CC66;
  /*height:1.6rem;*/
  z-index:10;
}
.scrollHP:after {
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
.scrollHP:before {
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
.scrollMsgText {
  font-size:0.72em;
  line-height:2rem;
}
</style>
