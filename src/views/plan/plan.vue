<template>
<div class="container">
  <div class="content home" distance="55" v-pull-to-refresh="refresh">
    <v-layer></v-layer>
    <!-- 轮播图 -->
    <slider :banner="banner" :vertical="false" style="z-index:9999;"></slider>

    <!-- 快捷入口 -->
    <bar class="home-bar">
      <bar-item path="/latestAnnounced" label="盈利排行" img="/img/专家方案/盈利排行.png" h=42 i=38></bar-item>
      <bar-item label="充值" img="/img/专家方案/充值.png" h=42 i=38 @click="recharge()"></bar-item>
      <bar-item path="/happyPurchase/help" label="帮助" img="/img/专家方案/帮助.png" h=42 i=38></bar-item>
    </bar>

    <!-- 盈利滚动展示 -->
    <card type="content" class-name="scrollPlan">
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
    <div style="margin-bottom:4rem;">
      <v-card-container v-for="item in itemList | orderBy 'id' -1"
        style="margin: 0.18rem;background-color:#f9f9f9;">
        <card type="header" style="font-size:0.68rem;background-color:#ffffff;">
          <div style="width:180%;">
            <span class="icon-histogram" style="font-size:1rem;color:red;">
              <font style="font-size:0.68rem;color:black;">
                0%~10%收益区
              </font>
            </span>
            <span class="pull-right icon-piechart" style="font-size:1rem;color:red;">
              <font style="font-size:0.68rem;color:black;">
                限购剩余 36870.00元
              </font>
            </span>
          </div>
        </card>
        <card type="content">
          <div class="list-block infinite-list">
            <ul>
              <li class="item-content"
                v-link="{name: 'planDetail', params: { id: 3 }, query:{ number: 1 }, activeClass: 'active', replace: false}">
                <div class="item-media">
                  <img src="/img/个人中心/默认头像.png" class="img-responsive"
                    style="margin-left:-0.48rem;border:solid 1px #e13;border-radius: 50px;overflow:hidden;"
                    width="42" height="42">
                </div>
                <div class="item-inner" style="font-size:0.68rem;margin-left:0.36rem;">
                  <div>
                    <div>海苔</div>
                    <div>
                      <img src="/img/专家方案/信心.png" width="12" height="12">
                      <img src="/img/专家方案/信心.png" width="12" height="12"
                        style="margin-left:-0.1rem;">
                      <img src="/img/专家方案/信心.png" width="12" height="12"
                        style="margin-left:-0.1rem;">
                      <img src="/img/专家方案/信心.png" width="12" height="12"
                        style="margin-left:-0.1rem;">
                      <img src="/img/专家方案/信心.png" width="12" height="12"
                        style="margin-left:-0.1rem;">
                    </div>
                  </div>
                  <div class="icon-golds" style="font-size:1rem;">
                    <font style="font-size:0.5rem;margin-left:-0.22rem;">
                      12.00 元
                    </font>
                  </div>
                  <div class="icon-clock2" style="font-size:1rem;">
                    <font style="font-size:0.5rem;margin-left:-0.22rem;">
                      180 分钟
                    </font>
                  </div>
                  <div>
                    <img src="/img/专家方案/购物车-选中.png"
                      width="26" height="26" @click="addToCart(item, $event)">
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </card>
      </v-card-container>
    </div>
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
import VLayer from '../../components/PullToRefreshLayer'
import VCardContainer from '../../components/Card'
import Card from '../../components/CardItem'
import {hpApi} from '../../util/service'
import $ from 'zepto'

export default {
  ready () {
    $.init()
    this.getBanner()
    this.getItemList()
    $.refreshScroller()
  },
  data () {
    return {
      banner: [],
      scrollmsg: [{
        content: '<div style="font-size:0.72em;line-height:2rem;color:#FFFFFF;">欢迎参与活动,参与多多,奖品多多,就怕你不来............</div>'
      }, {
        content: '<div style="font-size:0.72em;line-height:2rem;color:#FFFFFF;">2016年04月30日海魔希特拉被勇士133****9281干掉了!</div>'
      }, {
        content: '<div style="font-size:0.72em;line-height:2rem;color:#FFFFFF;">恭喜133****3322获得了大奖</div>'
      }],
      loading: false,
      showImg: window.localStorage.getItem('imageSwitch') === 'true',
      itemList: []
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
          console.error('获取商品列表失败:' + msg)
        }
      }).catch(()=>{
        $.alert('服务器连接中断...')
        console.error('无法连接服务器-获取商品列表')
      })
    },
    addToCart (item, e) {
      e.stopPropagation()
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
          else if (code === 0) {
            // 未登录
            $.toast('会话失效,请重新登录...')
          }
          else {
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
        this.getBanner()
        this.getItemList()
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 1345)
    },
    recharge () {
      $.alert('充值提示')
    }
  },
  components: {
    Slider,
    Bar,
    BarItem,
    VButton,
    VPayButton,
    VIcon,
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
.scrollPlan{
  background-color:#cb4a4a;
  /*height:1.6rem;*/
  z-index:10;
}
.scrollPlan:after {
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
.scrollPlan:before {
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
