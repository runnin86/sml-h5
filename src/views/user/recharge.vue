<template>
<div class="content rcag" transition="rcag-transition">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left"
      @click="this.$route.router.go({path: this.path, replace: true})">
      <span class="icon icon-left"></span>
    </a>
    <h1 class="title color">充值</h1>
  </header>
  <div class="content" style="margin-top:-1rem;">
    <div class="content-block-title">请选择充值金额:</div>
    <div class="buttons-tab">
      <a :class="this.rechargeMoney===100?'tab-link button active':'tab-link button disabled'"
        @click="this.tips('目前仅支持充值1000元')">100元</a>
      <a :class="this.rechargeMoney===500?'tab-link button active':'tab-link button'"
        @click="this.tips('目前仅支持充值1000元')">500元</a>
      <a :class="this.rechargeMoney===1000?'tab-link button active':'tab-link button'"
        @click="this.rechargeMoney=1000">1000元</a>
    </div>
    <div class="content-block">
      <div class="content-block">
        <div class="money-input">
          <input type="number" readonly="readonly" v-model="rechargeMoney" placeholder="请选择充值金额">
        </div>
      </div>
    </div>
    <div class="submit-button">
      <button class="button button-fill button-success"
        @click="doRecharge()">
        立即支付
      </button>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'zepto'

export default {
  ready () {
  },
  data () {
    return {
      path: '/' + this.$route.query.from,
      rechargeMoney: 1000,
      uPhone: window.localStorage.getItem('localPhone'),
      oauthCode: this.$route.query.code
    }
  },
  methods: {
    tips (msg) {
      $.toast(msg)
    },
    doRecharge () {
      $.confirm('您的账号即将充值</br>￥1000.00', '提示', ()=>{
        // let url = 'http://192.168.1.15:8080/pay/pingxxPay.do'
        // // let url = 'http://218.244.151.190/demo/charge'
        // let spcarInfos = {
        //   amount: 1000,
        //   uPhone: '18251967031',
        //   channel: 'wx_pub',
        //   payType: '2'
        // }
        // // let postBody = JSON.stringify(spcarInfos)
        // // console.log(spcarInfos)
        // // console.log(postBody)
        // this.$http.post(url, spcarInfos, {
        //   headers: {
        //     // 'x-token': token
        //   },
        //   emulateJSON: true
        // })
        // .then(({data: da})=>{
        //   // console.log(da.chargeObj)
        //   pingpp.createPayment(da.chargeObj, function (result, err) {
        //     console.log(result)
        //     console.log(err)
        //     if (result === 'success') {
        //       console.log(1)
        //       // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
        //     }
        //     else if (result === 'fail') {
        //       console.log(2)
        //       // charge 不正确或者微信公众账号支付失败时会在此处返回
        //     }
        //     else if (result === 'cancel') {
        //       console.log(3)
        //       // 微信公众账号支付取消支付
        //     }
        //   })
        // }).catch((e)=>{
        //   console.error('充值获取charge失败:' + e)
        // })
      }, ()=>{
        // confirm取消
      })
    }
  }
}
</script>

<style>
.rcag .submit-button {
  margin: 0 auto 2rem auto;
  width: 100%;
  padding: 0 .45rem;
}
.rcag .submit-button button {
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.color {
  background-color: #ed8e07;
}
.money-input input{
  width: 100%;
  height: 2.15rem;
  font-size: .7rem;
  padding: .4rem .5rem;
  background-color: #fff;
  margin-top: -1rem;
  margin-bottom: -.5rem;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .2rem;
}
/*
 从右至左切入
 */
.rcag-transition-enter {
  animation: bounce-in .5s;
}
.rcag-transition-leave {
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
</style>
