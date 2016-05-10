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
    <ul v-for="t in list" track-by="$index">
      <li class="item-content2">
        <div class="item-inner">
          <div class="item-title2" style="width:40%;">
              {{t.rewarded_date}}
          </div>
          <div class="item-title2"
            style="width:30%;text-align:center;">
            <!-- {{t.recharge_remarks}} -->
            {{t.plan_name}}
          </div>
          <div class="item-title2" style="width:20%;text-align:right;">
            {{t.rewarded_amount}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import {userApi} from '../../../util/service'
import $ from 'zepto'

export default {
  ready () {
    $.showIndicator()
    this.$http.post(userApi.myreward, {}, {
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
      $.hideIndicator()
    }).catch((e)=>{
      console.error('获取我的账单(打赏记录)失败:' + e)
    })
  },
  data () {
    return {
      title: '打赏记录',
      list: []
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
