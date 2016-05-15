<template>
<div class="rank" transition="bounce">
  <v-nav :path="path" :title="title" class="headerColor"></v-nav>
  <v-tab name="rankTable" title="盈利排行" status="active"
    distance="55" v-pull-to-refresh="refreshRank">
    <v-layer></v-layer>
    <div class="topTips">
      <div class="list-block">
        <ul>
          <li class="topLi">
            <div class="item-title">您上周的盈利金额为3019.11 未上榜</div>
          </li>
        </ul>
      </div>
    </div>
    <v-content type="block-title">
      <span style="float:left;margin-left: .2rem;">方案收益</span>
      <span style="float:right;margin-right: .2rem;">排名</span>
    </v-content>
    <v-list type="media" class-name="inset">
      <li class="item-content" v-for="rank in ranks" track-by="$index">
        <div class="item-media">
          <img src="/img/个人中心/默认头像.png" style='width: 2.2rem;'>
        </div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title" v-text="rank.bs_userId"></div>
          </div>
          <div class="rank-num" :style="$index+1 | color">{{ $index+1 }}</div>
          <div class="item-subtitle" style="font-size:0.68rem;max-width:90%;">
            <span style="width:42%;display:inline-block;">方案数:{{rank.planCount}}</span>
            <span style="width:40%;">收益:{{rank.winbonus}}</span>
          </div>
        </div>
      </li>
    </v-list>
    <div style="width:100%;height:100%;text-align:center;margin-top:2rem;">
      <div>
        <img src="/img/专家方案/温馨提示.png" height="24" width="152">
      </div>
      <div v-cloak v-if="showWarning"  style="font-size:0.38rem;color:#A9A9A9;">
        暂时没有排行信息
      </div>
      <div v-cloak v-else style="font-size:0.38rem;color:#A9A9A9;">
        本排行榜为周排行,每周一凌晨更新上周的排名信息
      </div>
    </div>
  </v-tab>
</div>
</template>

<script>
import Vue from 'vue'
import $ from 'zepto'
import VNav from '../../components/Nav'
import VContent from '../../components/Content'
import VList from '../../components/List'
import VTab from '../../components/Tab'
import VLayer from '../../components/PullToRefreshLayer'
import {planApi} from '../../util/service'

Vue.filter('color', function (val) {
  let col = '#95CACA'
  switch (val)
  {
    case 1:
      col = 'red'
      break
    case 2:
      col = 'blue'
      break
    case 3:
      col = 'purple'
      break
    default:
      break
  }
  return {background: col}
})

export default {
  ready () {
    $.init()
    // 获取方案
    this.$http.get(planApi.rank, {}, {
      headers: {
        'x-token': window.localStorage.getItem('token')
      },
      emulateJSON: true
    })
    .then(({data: {code, msg, result}})=>{
      // console.log(data)
      // bs_userId
      // winbonus
      if (result.length > 0) {
        this.$set('showWarning', false)
        this.$set('ranks', result)
      }
      else {
        this.$set('showWarning', true)
      }
    }).catch(()=>{
      console.error('无法连接服务器-获取盈利排行')
    })
  },
  data () {
    return {
      title: '盈利排行',
      path: '/plan',
      showWarning: false,
      ranks: [
        // {
        //   photo: '/img/个人中心/默认头像.png',
        //   nickname: 'A',
        //   planCount: 550,
        //   rate: 193819,
        //   color: 'background: red;'
        // },
        // {
        //   photo: '/img/个人中心/默认头像.png',
        //   nickname: 'B',
        //   planCount: 310,
        //   rate: 128901,
        //   color: 'background: blue;'
        // },
        // {
        //   photo: '/img/个人中心/默认头像.png',
        //   nickname: 'C',
        //   planCount: 420,
        //   rate: 8888,
        //   color: 'background: purple;'
        // },
        // {
        //   photo: '/img/个人中心/默认头像.png',
        //   nickname: 'D',
        //   planCount: 39,
        //   rate: 6666,
        //   color: 'background: gray;'
        // }
      ]
    }
  },
  methods: {
    refreshRank () {
      $.showIndicator()
      setTimeout(function () {
        console.log('refresh')
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }, 1500)
    }
  },
  components: {
    VNav,
    VContent,
    VList,
    VTab,
    VLayer
  }
}
</script>

<style scoped>
.rank {
  font-family: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.rank .content-block-title {
  margin: 1.25rem .75rem -1rem;
}
.rank .list-block.inset {
  margin-left: .35rem;
  margin-right: .35rem;
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
#rankTable  {
  top: .42rem;
}
.headerColor {
  background-color: #ed8e07;
}
.topTips {
  position:absolute;
  top: 0.36rem;
  width:100%;
}
.topLi {
  background-color: #616268;
  color: #FFFFF0;
  font-size: 0.58rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align:center;
}
.list-block {
  margin: 1.4rem 0;
}
</style>
