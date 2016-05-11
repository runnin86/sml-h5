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
      <bar-item path="/happyPurchase/help" label="帮助" img="/img/专家方案/帮助.png" h=42 i=38></bar-item>
    </bar>

    <!-- 盈利滚动展示 -->
    <card type="content" class-name="scrollText">
      <!-- <div>
        <marquee scrollamount="10" direction="left"
          scrolldelay="5" style="margin-top:0.2rem;">最新动态：</marquee>
      </div> -->
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
                  <card type="content-inner">
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
      itemList10: []
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
          if (info.length > 0) {
            let img = []
            for (var i = 0; i < info.length; i++) {
              if (this.showImg) {
                img.push({
                  content: info[i].img
                })
              }
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
        this.$route.router.go({path: '/login?from=happyPurchase', replace: true})
      }
    },
    refresh () {
      $.showIndicator()
      setTimeout(function () {
        this.itemList = []
        this.itemList10 = []
        this.getBanner()
        this.getItemList()
        this.getItemList10()
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 1345)
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
</style>
