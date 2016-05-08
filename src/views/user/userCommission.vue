<template>
<div class="content commission" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="list-block">
    <ul v-for="t in list | orderBy 'order_id' -1">
      <li class="item-content2">
        <div class="item-inner">
          <div class="item-title2">
            <div>
              {{t.from_user_phone}}
              <font>({{t.status}})</font>
            </div>
            <div style="font-size:0.48rem;">
              <span>
                用户所属:上级{{t.oneLevelPhone}}
              </span>
              <span>
                上上级:{{t.twoLevelPhone}}
              </span>
            </div>
          </div>
          <div class="item-title2 pull-right" style="font-size:1rem;">
            {{t.total_fee}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
<div class="toolBarCart">
  <div class="list-block">
    <ul>
      <li class="item-content bottomLi">
        <div class="item-inner" style="padding-left:0.75rem;">
          <div class="item-title">共{{list.length}}条可提现 总额:2000</div>
          <div class="toPay-button">
            <button class="button button-fill button-success" @click="payHP()">提现</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import {userApi} from '../../util/service'

export default {
  ready () {
    this.$http.post(userApi.commission, {}, {
      headers: {
        'x-token': window.localStorage.getItem('token')
      },
      emulateJSON: true
    })
    .then(({data: {code, msg, result}})=>{
      if (code === 1) {
        // console.log(result)
        this.$set('list', result)
      }
    }).catch((e)=>{
      console.error('获取我的返佣失败:' + e)
    })
  },
  data () {
    return {
      title: '我的返佣',
      list: []

    }
  },
  methods: {
  }
}
</script>

<style scoped>
.commission .content-padded {
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
  font-size:0.72rem;

  ul {
    height: 2.9rem;
  }

  .item-content {
    margin-top: .7rem;
    height: inherit;
  }
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
.toolBarCart {
  position:absolute;
  bottom:-2.6rem;
  width:100%;
  text-align:center;
}
.toPay-button button {
  margin-right: 1rem;
  width: 112%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.bottomLi {
  background-color: #FFFFF0;
  font-size: 0.7rem;
  height: 2.6rem;
}
</style>
