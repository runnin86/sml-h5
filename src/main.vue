<template>
  <div class="page page-current">
      <bar v-if="isIndex" class="barHeight">
        <bar-item v-show="showPlan" path="/plan" label="购买方案" icon="plan"></bar-item>
        <bar-item path="/happyPurchase" label="一元夺宝" icon="gift"></bar-item>
        <bar-item path="/shopCart" label="购物车" icon="cart" :b="cardBadge"></bar-item>
        <bar-item path="/user" label="个人中心" icon="me" :b="userBadge"></bar-item>
        <!-- <bar-item path="/more" label="更多" icon="more"></bar-item> -->
      </bar>
      <router-view transition-mode="out-in"></router-view>
      <!-- <router-view transition-mode="out-in" keep-alive></router-view> -->
  </div>
</template>

<script>
import Bar from './components/Bar'
import BarItem from './components/BarItem'
import {hpApi, planApi} from './util/service'
// import {wxShareConfig} from './util/util'
import $ from 'zepto'
import wx from 'wx'

export default {
  ready () {
    // 微信配置参数
    $.sign = {
      appId: 'wxadccc645716a9348',
      timestamp: Date.parse(new Date()),
      nonceStr: this.randomString(32),
      signature: '{sign.signature}'
    }
    // 获取签名要先获得access_tokeb
    // let appSecret = 'eb188f8ac0cf975ab877848601542015'
    // let tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&secret=' +
    //   appSecret + '&appid=' + $.sign.appId
    // console.log(tokenUrl)
    // this.$http.get(tokenUrl)
    // .then(({data: {access_token, expires_in}})=>{
    //   console.log(access_token + '->' + expires_in)
    // }).catch((e)=>{
    //   console.error('获取公众号token失败:' + e)
    // })

    // let urlw = 'https://ruby-china.org/api/v3/nodes.json'
    // urlw = 'http://123.57.217.199:9587/api/v1/sml/oneBuyProject'
    // // GET request
    // this.$http({url: urlw, method: 'GET'}, {}, {
    //   headers: {
    //     // 'Origin': '*'
    //   }
    // }).then(function (response) {
    //   console.log(response)
    //   // success callback
    // }, function (response) {
    //   console.log(response)
    //   // error callback
    // })

    // console.log($.sign)

    let wxJsApi = [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
    // 微信配置
    wx.config({
      debug: false,
      appId: $.sign.appId, // 必填，公众号的唯一标识
      timestamp: $.sign.timestamp, // 必填，生成签名的时间戳
      nonceStr: $.sign.nonceStr, // 必填，生成签名的随机串
      signature: $.sign.signature, // 必填，签名，见附录1
      jsApiList: wxJsApi // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    // 微信错误打印
    wx.error((res) => {
      /*
       * config信息验证失败会执行error函数，如签名过期导致验证失败，
       * 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
       * 对于SPA可以在这里更新签名。
       */
      console.log(res)
    })
    // 在需要配置分享内容的时候调用
    // wxShareConfig('123')
    if (window.localStorage.getItem('imageSwitch') === null) {
      window.localStorage.setItem('imageSwitch', true)
    }
    // 设置购物车图标
    this.setCardBadge()
  },
  data () {
    return {
      isIndex: true,
      cardBadge: 0,
      userBadge: 0,
      showPlan: false
    }
  },
  methods: {
    back () {
      // $.router.back()
      window.history.back()
      // window.history.go(-1)
    },
    randomString (len) {
      // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      let maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    setCardBadge () {
      let token = window.localStorage.getItem('token')
      if (token) {
        // 处理购物车图标右上角的数字
        this.cardBadge = 0
        // 获取服务器中的乐夺宝购物车信息
        this.$http.get(hpApi.redisCart, {},
          {
            headers: {
              'x-token': window.localStorage.getItem('token')
            },
            emulateJSON: true
          })
        .then(({data: {code, msg, info}})=>{
          if (info) {
            this.cardBadge += info.length
          }
        }).catch((e)=>{
          console.error('无法获取乐夺宝购物车:' + e)
        })
        // 获取服务器中的方案购物车信息
        this.$http.post(planApi.queryCart, {},
          {
            headers: {
              'x-token': window.localStorage.getItem('token')
            },
            emulateJSON: true
          })
        .then(({data: {code, msg, result}})=>{
          if (code === 1) {
            // 展示方案的菜单
            this.showPlan = true
            if (result) {
              this.cardBadge += result.length
            }
          }
        }).catch((e)=>{
          console.error('无法获取方案购物车:' + e)
        })
      }
    }
  },
  components: {
    Bar,
    BarItem
  }
}
</script>

<style>
@import './assets/css/sm.css';
@import './assets/css/style.css';
[v-cloak] {
  display: none;
}
.barHeight {
  background: #efeff4;
  height: 3rem;
  /*position: relative;*/
  box-shadow: 0 .01rem .05rem rgba(0,0,0,.3);
}
.barHeight .tab-item {
  height: 3rem;
  background-color: #1e2126;
}

/*
 平滑切入
 */
.fade-transition {
  transition: opacity .1s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}

/*
 从右至左切入
 */
.bounce-enter {
  animation: bounce-in .5s;
}
.bounce-leave {
  animation: bounce-out .5s;
}

@keyframes bounce-in {
  0% {
		opacity: 0;
		-webkit-transform: translateX(100%);
	}
	100% {
		opacity: 1;
		-webkit-transform: translateX(0);
	}
}
@keyframes bounce-out {
  0% {
		opacity: 0;
		-webkit-transform: translateX(0);
	}
	100% {
		opacity: 1;
		-webkit-transform: translateX(100%);
	}
}

/*
 从下至上切入
 */
.pushtop-enter {
  animation: pushtop-in .6s;
}
.pushtop-leave {
  animation: pushtop-out .3s;
}

@keyframes pushtop-in {
  0% {
		opacity: 0;
		-webkit-transform: translateY(100%);
	}
	100% {
		opacity: 1;
		-webkit-transform: translateY(0);
	}
}
@keyframes pushtop-out {
  0% {
		opacity: 0;
		-webkit-transform: translateY(0);
	}
	100% {
		opacity: 1;
		-webkit-transform: translateY(100%);
	}
}
</style>
