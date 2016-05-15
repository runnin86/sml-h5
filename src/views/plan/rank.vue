<template>
<div class="rank" transition="bounce">
  <v-nav :path="path" :title="title" class="headerColor"></v-nav>
  <v-tab name="point" title="盈利排行" status="active"
    distance="55" v-pull-to-refresh="refreshPoint">
    <v-layer></v-layer>
    <v-content type="block-title">
      <span style="float:left;margin-left: .2rem;">方案收益</span>
      <span style="float:right;margin-right: .2rem;">排名</span>
    </v-content>
    <v-list type="media" class-name="inset">
      <li class="item-content" v-for="rank in ranks">
        <div class="item-media">
          <img :src="rank.photo" style='width: 2.2rem;'>
        </div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title" v-text="rank.nickname"></div>
          </div>
          <div class="rank-num" :style="rank.color">{{ $index+1 }}</div>
          <div class="item-subtitle" style="font-size:0.68rem;max-width:90%;">
            <span style="width:42%;display:inline-block;">方案数:{{rank.planCount}}</span>
            <span style="width:40%;">收益:{{rank.rate}}</span>
          </div>
        </div>
      </li>
    </v-list>
  </v-tab>
</div>
</template>

<script>
import $ from 'zepto'
import VNav from '../../components/Nav'
import VContent from '../../components/Content'
import VList from '../../components/List'
import VTab from '../../components/Tab'
import VLayer from '../../components/PullToRefreshLayer'
import {planApi} from '../../util/service'

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
    .then(({data: data})=>{
      console.log(data)
      // if (code === 1) {
      //   this.$set('planList', results.list)
      // }
      // else {
      //   console.error('获取方案失败:' + msg)
      // }
    }).catch(()=>{
      console.error('无法连接服务器-获取盈利排行')
    })
  },
  data () {
    return {
      title: '盈利排行',
      path: '/plan',
      ranks: [
        {
          photo: '/img/个人中心/默认头像.png',
          nickname: 'A',
          planCount: 550,
          rate: 193819,
          color: 'background-color: red;'
        },
        {
          photo: '/img/个人中心/默认头像.png',
          nickname: 'B',
          planCount: 310,
          rate: 128901,
          color: 'background-color: blue;'
        },
        {
          photo: '/img/个人中心/默认头像.png',
          nickname: 'C',
          planCount: 420,
          rate: 8888,
          color: 'background-color: purple;'
        },
        {
          photo: '/img/个人中心/默认头像.png',
          nickname: 'D',
          planCount: 39,
          rate: 6666,
          color: 'background-color: gray;'
        }
      ]
    }
  },
  methods: {
    refreshPoint () {
      $.showIndicator()
      setTimeout(function () {
        console.log('refresh')
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }, 1500)
    },
    refreshInvite () {
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
.rank .content-block-title {
  margin: .75rem .75rem .5rem;
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
.rank-tabs .buttons-tab {
  z-index: 10;
  margin-top: 2.2rem;
}
#point, #invite  {
  top: 0rem;
}
.headerColor {
  background-color: #ed8e07;
}
</style>
