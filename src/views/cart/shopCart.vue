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
                    <img :src="item.image" style="width:4rem;">
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
                    <input value="{{item.buy | cartPriceValidate item.id}}"
                      type="number" min={{item.price}} max={{item.codeCount}}
                      style="ime-mode:disabled;text-align:center;height:100%;font-size:.7rem;"
                      onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
                      onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
                  </span>
                  <span class="button" @click="augment(item)"
                    style="width:2rem;font-size:1.2rem;">+</span>
                </div>
                <div style="margin-top:0.1rem;">
                  人次剩余:<font class="redFont">{{item.codeCount}}</font>
                </div>
                <div style="margin-top:0.3rem;">
                  总价:{{item.totalPrice}}.00元
                </div>
              </div>
              <div class="item-after" @click="delCart(item.id)">
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

Vue.filter('cartPriceValidate', function (value, id) {
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
    refreshCart () {
      $.showIndicator()
      setTimeout(function () {
        if (window.localStorage.getItem('cards')) {
          this.items = JSON.parse(window.localStorage.getItem('cards'))
          this.totalAmount = 0
          for (var i = 0; i < this.items.length; i++) {
            let newCodeCount = this.items[i].codeCount
            // 去查询最新商品信息,防止购买份数大于剩余份数
            this.$http.get(hpApi.home + '/' + this.items[i].id)
            .then(({data: {code, msg, info}})=>{
              if (code === 1) {
                newCodeCount = info[0].codeCount
              }
              else {
                console.error('获取商品信息失败:' + msg)
              }
            }).catch((e)=>{
              console.error('无法连接服务器-获取商品信息:' + e)
            })
            this.items[i].codeCount = newCodeCount
            if (this.items[i].buy >= newCodeCount) {
              this.items[i].buy = newCodeCount
            }
            this.totalAmount += this.items[i].buy
          }
        }
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 500)
    },
    delCart (id) {
      $.showIndicator()
      setTimeout(function () {
        let storageCart = JSON.parse(window.localStorage.getItem('cards'))
        for (var i = 0; i < storageCart.length; i++) {
          if (storageCart[i].id === id) {
            this.totalAmount -= storageCart[i].buy
            this.items.$remove(this.items[i])
            storageCart.$remove(storageCart[i])
          }
        }
        window.localStorage.setItem('cards', JSON.stringify(storageCart))
        this.$root.cardBadge = JSON.parse(window.localStorage.getItem('cards')).length
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 200)
    },
    pay () {
      if (window.localStorage.getItem('user')) {
        // 购物车商品数组
        let spcarlist = []
        for (let i of this.items) {
          spcarlist.push({
            'name': i.name,
            'number': i.number,
            'payCount': i.buy,
            'projectId': i.id,
            'recharge_money': i.price * i.buy
          })
        }
        // 组装请求消息体
        let spcarInfos = {
          'totalmoney': this.totalAmount,
          'spcarlist': spcarlist
        }
        console.log(spcarInfos)
      }
      else {
        $.toast('你尚未登录')
        this.$route.router.go({path: '/login?from=shopCart', replace: true})
      }
    },
    augment (item) {
      if (item.buy < item.codeCount) {
        item.buy += item.price
        this.totalAmount += item.price
      }
      else {
        item.buy = item.codeCount
      }
    },
    reduce (item) {
      if (item.buy > item.price) {
        item.buy -= item.price
        this.totalAmount -= item.price
      }
      else {
        item.buy = item.price
      }
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
