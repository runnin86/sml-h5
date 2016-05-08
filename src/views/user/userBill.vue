<template>
<div class="content bill" :transition="transition">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"
      v-link="{path: '/user', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="list-block" style="margin-top:2.2rem;font-size:0.65rem;">
    <ul>
      <li class="item-content item-link"
        v-link="{path: '/user/bill/plan', replace: true}">
        <div class="item-inner">
          <div class="item-title">
            方案记录
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link"
        v-link="{ path: '/user/order', replace: true}">
        <div class="item-inner">
          <div class="item-title">
            提现
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link"
        v-link="{ path: '/user/commission', replace: true}">
        <div class="item-inner">
          <div class="item-title">
            充值
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link"
        v-link="{ path: '/user/order', replace: true}">
        <div class="item-inner">
          <div class="item-title">
            打赏
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
// import {userApi} from '../../util/service'

export default {
  ready () {
    // this.$http.post(userApi.bill, {}, {
    //   headers: {
    //     'x-token': window.localStorage.getItem('token')
    //   },
    //   emulateJSON: true
    // })
    // .then(({data: {code, msg, result}})=>{
    //   if (code === 1) {
    //     // console.log(result)
    //     this.$set('oneLevelNum', result.oneLevelNum)
    //     this.$set('twoLevelNum', result.twoLevelNum)
    //     this.$set('threeLevelNum', result.threeLevelNum)
    //     this.$set('oneLevelUsers', result.oneLevelUsers)
    //   }
    // }).catch((e)=>{
    //   console.error('获取我的团队失败:' + e)
    // })
  },
  // route: {
  //   data ({from, to, next}) {
  //     console.log(from.path + '->' + to.path)
  //     if (from.path === '/user/bill/plan') {
  //       this.switch = 'fade'
  //     }
  //     next()
  //   }
  // },
  data () {
    return {
      transition: 'bounce',
      title: '我的账单',
      oneLevelNum: 0,
      twoLevelNum: 0,
      threeLevelNum: 0,
      oneLevelUsers: []
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.bill .content-padded {
  margin: 2.2rem 0 0 0;
  height: 100%;
  padding: .4rem .4rem;
}
.color {
  background-color: #ed8e07;
}
</style>
