<template>
<div class="content recharge" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"
      v-link="{path: '/user/bill', query: { pageTransition: 'fade' }, replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="list-block">
    <ul>
      <li class="item-content2">
        <div class="item-inner">
          <div class="item-title2">
            2016年05月08日17:33:53
          </div>
          <div class="item-title2">
            提现
          </div>
          <div class="item-title2">
            1998
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content2">
        <div class="item-inner">
          <div class="item-title2">
            2016年05月08日17:34:13
          </div>
          <div class="item-title2">
            提现
          </div>
          <div class="item-title2">
            89
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
// import {userApi} from '../../../util/service'

export default {
  ready () {
    // this.$http.post(userApi.team, {}, {
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
    //   console.error('获取我的方案记录失败:' + e)
    // })
  },
  data () {
    return {
      title: '充值记录',
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
.recharge .content-padded {
  margin: 2.2rem 0 0 0;
  height: 100%;
  padding: .4rem .4rem;
}
.color {
  background-color: #ed8e07;
}
.list-block {
  margin: 2.2rem 0;
  height: 2.9rem;
  font-size:0.66rem;

  ul {
    height: 2.9rem;
  }

  .item-content {
    margin-top: .7rem;
    height: inherit;
  }
}
.list-block .item-title2 {
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  -webkit-flex-shrink: 1;
  flex-shrink: 1;
  /*white-space: nowrap;*/
  position: relative;
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  max-width: 100%;
  padding-left: 0.4rem;
}
</style>
