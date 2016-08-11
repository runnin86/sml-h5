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
        :class="this.isRecharge?'disabled':'button-success'"
        @click="doRecharge()">
        立即支付
      </button>
    </div>
  </div>
</div>
</template>

<script>
import pingpp from 'pingpp-js'
import $ from 'zepto'

export default {
  ready () {
  },
  data () {
    return {
      user: JSON.parse(window.localStorage.getItem('user')),
      path: '/' + this.$route.params.state,
      rechargeMoney: 1000,
      uPhone: window.localStorage.getItem('localPhone'),
      openid: this.$route.params.openid,
      isRecharge: false
    }
  },
  methods: {
    tips (msg) {
      $.toast(msg)
    },
    doRecharge () {
      if (!this.isRecharge) {
        this.isRecharge = true
        $.confirm('账号[' + this.user.user_phone + ']即将充值</br>￥1000.00', '提示', ()=>{
          let url = 'http://reg.zqsml.com/pay/pingxxPay.do'
          // let url = 'http://192.168.1.22:8080/pay/pingxxPay.do'
          let spcarInfos = {
            chargeMoney: '1000',
            uPhone: this.user.user_phone,
            channel: 'wx_pub',
            payType: '2',
            openId: this.$route.params.openid
          }
          // let postBody = JSON.stringify(spcarInfos)
          // console.log(spcarInfos)
          // console.log(postBody)
          this.$http.post(url, spcarInfos, {
            headers: {
              // 'x-token': token
            },
            emulateJSON: true
          })
          .then(({data: da})=>{
            // console.log(da.chargeObj)
            pingpp.createPayment(da.chargeObj, function (result, err) {
              if (result === 'success') {
                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                $.toast('支付成功!')
              }
              else if (result === 'fail') {
                // charge 不正确或者微信公众账号支付失败时会在此处返回
                $.toast('支付失败!')
                setTimeout(function () {
                  this.isRecharge = false
                }.bind(this), 3000)
              }
              else if (result === 'cancel') {
                // 微信公众账号支付取消支付
                $.toast('支付取消!')
                setTimeout(function () {
                  this.isRecharge = false
                }.bind(this), 3000)
              }
            })
          }).catch((e)=>{
            $.toast('支付异常!')
            setTimeout(function () {
              this.isRecharge = false
            }.bind(this), 3000)
            console.error('充值获取charge失败:' + e)
          })
        }, ()=>{
          // confirm取消
          this.isRecharge = false
        })
      }
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
