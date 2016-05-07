<template>
  <div :class="['actions-modal', show ? 'modal-in' : 'modal-out']"
    @click="$event.stopPropagation()">
    <div class="actions-modal-group">
      <span class="actions-modal-label">请选择</span>
      <span class="actions-modal-button actions-modal-button-bold">
        <div class="modal-buttons">
          <span class="modal-button-sml" @click="this.amount=plan.plan_amount*5" :style="(this.amount===plan.plan_amount*5?'color:#f6383a':'')">{{plan.plan_amount*5}}</span>
          <span class="modal-button-sml" @click="this.amount=plan.plan_amount*10" :style="(this.amount===plan.plan_amount*10?'color:#f6383a':'')">{{plan.plan_amount*10}}</span>
          <span class="modal-button-sml" @click="this.amount=plan.plan_amount*20" :style="(this.amount===plan.plan_amount*20?'color:#f6383a':'')">{{plan.plan_amount*20}}</span>
          <span class="modal-button-sml" @click="this.amount=plan.plan_amount*50" :style="(this.amount===plan.plan_amount*50?'color:#f6383a':'')">{{plan.plan_amount*50}}</span>
          <span class="modal-button-sml" @click="this.amount=plan.plan_amount*100" :style="(this.amount===plan.plan_amount*100?'color:#f6383a':'')">{{plan.plan_amount*100}}</span>
        </div>
      </span>
      <span class="actions-modal-button">
        <div class="modal-buttons">
          <span class="modal-button-sml" @click="this.amount>this.plan.plan_amount?(this.amount-=this.plan.plan_amount):this.plan.plan_amount"
            style="width:20%;font-size:2rem;color:black;">-</span>
          <span class="modal-button-sml" style="width:60%">
            <input v-model="amount"
              type="number" min={{plan.plan_amount}} max={{plan.plan_amount*99999}}
              style="ime-mode:disabled;height:1.8rem;width:100%;text-align:center;color:#f6383a"
              onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;"
              onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
          </span>
          <span class="modal-button-sml" @click="this.amount=parseFloat(this.amount)+parseFloat(this.plan.plan_amount)"
            style="width:20%;font-size:1.4rem;color:black;">+</span>
        </div>
      </span>
      <span class="actions-modal-label">
        需&nbsp;<font style="color:#f6383a">{{amount}}</font>&nbsp;元
      </span>
    </div>
    <div class="actions-modal-group">
      <span class="actions-modal-button bg-danger" @click="addToCart(this.plan)">确认</span>
    </div>
  </div>
</template>

<script>
import {planApi} from '../util/service'
import $ from 'zepto'
export default {
  props: {
    amount: 10,
    show: false,
    plan: ''
  },
  methods: {
    addToCart: function (plan) {
      if (parseFloat(this.amount) % parseFloat(plan.plan_amount) > 0) {
        $.toast('购买金额必须是' + plan.plan_amount + '的倍数')
        return
      }
      // else if (parseFloat(this.amount) > parseFloat(plan.codeCount)) {
      //   $.toast('最多可购买' + plan.codeCount)
      //   return
      // }
      else if (parseFloat(this.amount) <= 0) {
        $.toast('请输入有效金额')
        return
      }
      // 添加至购物车
      this.$http.post(planApi.upCart,
        {
          'pid': plan.plan_id,
          'amt': this.amount
        },
        {
          headers: {
            'x-token': window.localStorage.getItem('token')
          },
          emulateJSON: true
        })
      .then(({data: {code, msg}})=>{
        if (code === 1) {
          this.$parent.closeModal()
          $.toast('已加入购物车')
          // 设置购物车图标
          this.$root.setCardBadge()
        }
        else if (code === 0) {
          // 未登录
          $.toast('会话失效,请重新登录...')
        }
        else {
          console.error('加入购物车失败:' + msg)
        }
      }).catch((e)=>{
        console.error('无法加入购物车:' + e)
      })
    }
  }
}
</script>

<style scoped>
.icon-left {
  width: 1rem;
}
.modal-button-sml {
  width: 100%;
  padding: 0 0.25rem;
  height: 2.2rem;
  font-size: 0.85rem;
  line-height: 2.2rem;
  text-align: center;
  color: #0894ec;
  background: #e8e8e8;
  display: block;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  -ms-flex: 1;
}
.modal-button-sml:after {
  /*content: '';
  position: absolute;
  right: 0;
  top: 0;
  left: auto;
  bottom: auto;
  width: 1px;
  height: 100%;
  background-color: #b5b5b5;
  display: block;
  z-index: 15;
  -webkit-transform-origin: 100% 50%;
  transform-origin: 100% 50%;*/
}
</style>
