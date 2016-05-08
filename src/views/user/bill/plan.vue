<template>
<div class="content team" :transition="$root.transition">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"
      v-link="{path: '/user/bill', replace: true}">
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
      title: '方案记录',
      oneLevelNum: 0,
      twoLevelNum: 0,
      threeLevelNum: 0,
      oneLevelUsers: []
    }
  },
  methods: {
    showInfo (id, e) {
      if (document.getElementById(id).style.display === 'block') {
        document.getElementById(id).style.display = 'none'
      }
      else {
        document.getElementById(id).style.display = 'block'
      }
    }
  }
}
</script>

<style scoped>
.team .content-padded {
  margin: 2.2rem 0 0 0;
  height: 100%;
  padding: .4rem .4rem;
}
.color {
  background-color: #ed8e07;
}
.img_full {
  width: 100%;
  height: 100%;
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
.fcfcfc {
  background-color: #fcfcfc;
}
.list-block .item-content2 {
  box-sizing: border-box;
  min-height: 2.2rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
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
.list-block ul:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: #e7e7e7;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
.list-block .item-inner:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
  height: 1px;
  width: 100%;
  background-color: #e7e7e7;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 50% 0%;
  transform-origin: 50% 0%;
}
</style>
