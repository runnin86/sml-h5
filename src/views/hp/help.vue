<template>
<div class="content invite" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"
      @click="this.$root.back()">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="list-block" style="margin: 2.35rem 0">
    <ul>
      <li class="item-content item-link" @click="showMsg('registerHelp',$event)">
        <div class="item-inner">
          <div class="item-title">注册不成功</div>
        </div>
      </li>
      <li class="item-content" id="registerHelp" style="display: none;background-color: #EEEEEE;">
        <div class="item-inner">
          <div class="helpMsgText">
            注册不成功注册不成功注册不成功注册不成功注册不成功注册不成功注册不成功
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link" @click="showMsg('rechargeHelp',$event)">
        <div class="item-inner">
          <div class="item-title">充值问题</div>
        </div>
      </li>
      <li class="item-content" id="rechargeHelp" style="display: none;background-color: #EEEEEE;">
        <div class="item-inner">
          <div class="helpMsgText">
            注充值问题充值问题充值问题充值问题充值问题充值问题充值问题充值问题充值问题
            充值问题
            充值问题充值问题充值问题充值问题充值问题
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link" @click="showMsg('withdrawHelp',$event)">
        <div class="item-inner">
          <div class="item-title">提现问题</div>
        </div>
      </li>
      <li class="item-content" id="withdrawHelp" style="display: none;background-color: #EEEEEE;">
        <div class="item-inner">
          <div class="helpMsgText">
            注充值问题充值问题充值问题充值问题充值问题充值问题充值问题充值问题充值问题
            充值问题
            充值问题充值问题充值问题充值问题充值问题
          </div>
        </div>
      </li>
    </ul>
    <br>
  </div>
</div>
</template>

<script>
// import $ from 'zepto'

export default {
  ready () {
    console.log(2)
    // $.ajax({
    //   type: 'get',
    //   // url: 'http://api.douban.com/v2/book/1139336',
    //   url: 'http://192.168.1.22:9587/api/v1/sml/oneBuyProject',
    //   dataType: 'jsonp',
    //   jsonp: 'callback',
    //   jsonpCallback: 'success_jsonpCallback',
    //   success: function (data, status, xhr) {
    //     console.log(data)
    //     // console.log(status)
    //     // console.log(xhr)
    //   },
    //   error: function () {
    //     console.log('请求出错')
    //   }
    // })
    this.$http.get('http://192.168.1.22:9587/api/v1/sml/oneBuyProject')
    .then(({data: {code, msg, results}})=>{
      console.log(results)
      // this.$set('banner', data)
    })
  },
  data () {
    return {
      title: '帮助'
    }
  },
  methods: {
    showMsg (id, e) {
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

<style>
.list-block {
  height: 2.9rem;

  ul {
    height: 2.9rem;
  }

  .item-content {
    margin-top: .7rem;
    height: inherit;
  }
}
.helpMsgText {
  font-size: 0.6rem;
  color: gray;
}
.color {
  background-color: #ed8e07;
}
</style>
