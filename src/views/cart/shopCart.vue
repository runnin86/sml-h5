<template>
  <div class="container">
    <nav class="bar bar-nav">
      <h1 class="title color">购物车</h1>
    </nav>
    <div class="content list" style="bottom: 4.8rem;top: -0.2rem;"
      v-pull-to-refresh="refreshCart">
      <v-layer></v-layer>
      <div class="list-block infinite-list">
        <ul>
          <li class="item-content" id="cartRecord" style="padding-left:0rem;"
            v-for="item in items" track-by="$index">
            <div class="item-inner" style="padding:0.2rem;">
              <div class="item-media">
                <div class="item-title-row">
                  <div v-if="showImg" class="text-center" style="padding-right:0.2rem;">
                    <img :src="item.images| split ','| getArray 0" style="width:4rem;">
                  </div>
                  <div v-else class="text-center" style="padding-right:0.2rem;">
                    <img src="/img/乐夺宝/产品图片默认.png" style="width:4rem;">
                  </div>
                </div>
              </div>
              <div class="item-title-sml">
                <div style="margin-bottom:0.3rem;font-size:0.8rem;">{{item.name}}</div>
                <div style="margin-top:-0.2rem;">
                  {{item.content}}
                </div>
                <div class="buttons-row" style="margin-top:0.3rem;width: 7.6rem;">
                  <span class="button" @click="reduce(item)"
                    style="width:2rem;font-size:1.6rem;">-</span>
                  <span class="button">
                    <input :value="item.amount" v-on:blur='cartPriceCheck(item, $event)'
                      type="tel" min={{item.price}} max={{item.totalCount}}
                      style="ime-mode:disabled;text-align:center;height:100%;font-size:.7rem;"
                      onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
                      onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
                  </span>
                  <span class="button" @click="augment(item)"
                    style="width:2rem;font-size:1.2rem;">+</span>
                </div>
                <div style="margin-top:0.1rem;">
                  人次剩余:<font class="redFont">{{item.totalCount}}</font>
                </div>
                <div style="margin-top:0.3rem;">
                  总价:{{item.totalPrice}}.00元
                </div>
              </div>
              <div class="item-after" @click="delCart(item.id, item.number)">
                <img src="/img/购物车/删除.png" width="32">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="toolBarCart" v-if="length>0">
    <div class="list-block">
      <ul>
        <li class="item-content bottomLi">
          <div class="item-inner" style="padding-left:0.75rem;">
            <div class="item-title redFont">共{{items.length}}件商品,总计{{totalAmount}}元</div>
            <div class="toPay-button">
              <button class="button button-fill" @click="pay()">付款</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VLayer from '../../components/PullToRefreshLayer'
import {hpApi} from '../../util/service'
import $ from 'zepto'

Vue.filter('cartPriceValidate', function (value, price) {
  console.log(price)
  return value
})

export default {
  route: {
    data ({to, next}) {
      next()
    }
  },
  ready () {
    $.init()
    this.refreshCart()
  },
  data () {
    return {
      items: [],
      totalAmount: 0,
      showImg: window.localStorage.getItem('imageSwitch') === 'true',
      loading: false
    }
  },
  watch: {
    'items': {
      handler: function (val, oldVal) {
        // console.log('进入深度观察')
      },
      deep: true
    }
  },
  computed: {
    length () {
      return this.items.length
    }
  },
  methods: {
    cartPriceCheck: function (item, e) {
      if (e.target.value % item.price > 0) {
        let validAmount = e.target.value - (e.target.value % item.price)
        // 防止金额小于价格
        validAmount = validAmount < item.price ? item.price : validAmount
        e.target.value = validAmount
        this.changeItemAmount(item, validAmount)
        $.toast('必须是' + item.price + '的倍数,已为你调整为' + validAmount, 500)
      }
      else if (e.target.value === '' || parseFloat(e.target.value) === 0) {
        e.target.value = item.amount
      }
    },
    refreshCart () {
      $.showIndicator()
      setTimeout(function () {
        // 获取服务器中的购物车信息
        this.$http.get(hpApi.redisCart, {},
          {
            headers: {
              'x-token': window.localStorage.getItem('token')
            },
            emulateJSON: true
          })
        .then(({data: {code, msg, info}})=>{
          if (code === 1) {
            this.items = []
            this.totalAmount = 0
            if (info.length > 0) {
              for (let i of info) {
                this.totalAmount += i.amount
                this.items.push(i)
              }
            }
          }
          else if (code === 0) {
            // 未登录
            $.toast('你尚未登录...')
            // setTimeout(function () {
            //   this.$route.router.go({path: '/user', replace: true})
            // }.bind(this), 3000)
          }
          else {
            console.error('获取购物车失败:' + msg)
          }
        }).catch((e)=>{
          console.error('无法获取购物车:' + e)
        })
        // 设置购物车图标
        this.$root.setCardBadge()
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 500)
    },
    delCart (id, number) {
      this.$http.delete(hpApi.redisCart + '/' + id + '_' + number, {},
        {
          headers: {
            'x-token': window.localStorage.getItem('token')
          },
          emulateJSON: true
        })
      .then(({data: {code, msg}})=>{
        if (code === 1) {
          // 删除成功
          this.refreshCart()
        }
      }).catch((e)=>{
        console.error('删除购物车异常:' + e)
      })
    },
    pay () {
      if (window.localStorage.getItem('user')) {
        // 购物车商品数组
        let spcarlist = []
        for (let i of this.items) {
          spcarlist.push({
            'name': i.name,
            'number': i.number,
            'payCount': i.amount,
            'projectId': i.id,
            'recharge_money': i.amount
          })
        }
        // 组装请求消息体
        let spcarInfos = {
          'spcarInfos': {
            'totalmoney': this.totalAmount,
            'spcarlist': spcarlist
          }
        }
        let postBody = JSON.stringify(spcarInfos)
        $.confirm('总计' + this.totalAmount + '元,是否确认付款?', '提示', ()=>{
          // console.log(postBody)
          // 发起支付请求
          this.$http.post(hpApi.cartPay, postBody,
            {
              headers: {
                'x-token': window.localStorage.getItem('token')
              },
              emulateJSON: true
            })
          .then(({data: {code, msg}})=>{
            if (code === 1) {
              $.toast(msg)
              setTimeout(function () {
                // 清空购物车
                this.items = []
                this.totalAmount = 0
                // 刷新购物车
                this.refreshCart()
              }.bind(this), 500)
            }
            else {
              $.alert(msg)
            }
          }).catch((e)=>{
            $.alert('服务器连接中断...')
            console.error(e)
          })
        }, ()=>{
          // confirm取消
        })
      }
      else {
        $.toast('你尚未登录')
        this.$route.router.go({path: '/login?from=shopCart', replace: true})
      }
    },
    augment (item) {
      // 数量相加
      let augmentAmount = item.amount + item.price
      this.changeItemAmount(item, augmentAmount)
    },
    reduce (item) {
      // 数量加减
      let reduceAmount = (item.amount - item.price) < item.price ? item.price : (item.amount - item.price)
      this.changeItemAmount(item, reduceAmount)
    },
    changeItemAmount (item, amount) {
      this.$http.put(hpApi.redisCart + '/' + item.id,
        {
          'number': item.number,
          'amount': amount
        },
        {
          headers: {
            'x-token': window.localStorage.getItem('token')
          },
          emulateJSON: true
        })
      .then(({data: {code, msg}})=>{
        if (code === 1) {
          let initAmount = item.amount
          item.amount = msg.amount
          this.totalAmount = this.totalAmount - initAmount + amount
        }
      }).catch((e)=>{
        console.error('购物车数量加减异常:' + e)
      })
    }
  },
  components: {
    VLayer
  }
}
</script>

<style>
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.list-block .item-title-sml {
  -webkit-flex-shrink: 1;
  -ms-flex: 0 1 auto;
  -webkit-flex-shrink: 1;
  flex-shrink: 1;
  /*white-space: nowrap;*/
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.list-block {
  margin: .3rem 0;
}
.list {
  bottom: .5rem;
  padding-bottom: 1rem;
}
.toolBarCart {
  position:absolute;
  bottom:2.24rem;
  width:100%;
  text-align:center;
}
.toPay-button button {
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.color {
  background-color: #ed8e07;
}
.bottomLi {
  background-color: #FFFFF0;
  font-size: 0.7rem;
  height: 2.4rem;
}
#cartRecord>div{
  font-size: 0.48rem;
}
.redFont {
  color: red;
}
</style>
