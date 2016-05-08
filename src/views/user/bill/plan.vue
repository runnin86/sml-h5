<template>
<div class="content plan" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"
      v-link="{path: '/user/bill', query: { pageTransition: 'fade' }, replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <!-- 搜索框 -->
  <div class="bar bar-header-secondary">
    <div class="searchbar">
      <a class="searchbar-cancel">取消</a>
      <div class="search-input">
        <label class="icon icon-search" for="search"></label>
        <input type="text" id='search' placeholder='选择时间...'/>
      </div>
    </div>
  </div>
  <!-- 列表 -->
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
import {dateFilter} from '../../../filters'
import $ from 'zepto'

export default {
  ready () {
    $('#search').calendar({
      value: [new Date()],
      dateFormat: 'yyyy年mm月dd日',
      // minDate: '2015-06-01',
      // maxDate: '2018-06-01',
      // onOpen: (obj)=>{
      //   obj.params.input[0].value = '32323'
      //   console.log(obj)
      // },
      onClose: (obj)=>{
        this.queryByDate(obj.value[0])
      },
      onChange: (obj, val, text)=>{
        // console.log(val + '->' + text)
        // this.queryByDate(text)
      }
    })
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
      title: '方案记录',
      oneLevelNum: 0,
      twoLevelNum: 0,
      threeLevelNum: 0,
      oneLevelUsers: []
    }
  },
  methods: {
    queryByDate (d) {
      let qd = dateFilter(d / 1000, 2)
      console.log(qd)
    }
  }
}
</script>

<style scoped>
.plan .content-padded {
  margin: 2.2rem 0 0 0;
  height: 100%;
  padding: .4rem .4rem;
}
.color {
  background-color: #ed8e07;
}
.list-block {
  margin: 4.4rem 0;
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
