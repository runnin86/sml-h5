<template>
<div class="content" transition="bounce" style="margin-bottom:1.8rem;">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/plan', replace: false}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title headerColor">方案详情</h1>
  </header>
  <div class="list-block">
    <ul>
      <li class="item-content">
        <div style="width:100%;">
          <span style="margin-left:-0.4rem;">
            信心指数
            <img v-if="plan.planConfident===-1 || plan.planConfident>0"
              src="/img/专家方案/信心.png" width="12" height="12">
            <img v-if="plan.planConfident===-1 || plan.planConfident>1"
              src="/img/专家方案/信心.png" width="12" height="12"
              style="margin-left:-0.1rem;">
            <img v-if="plan.planConfident===-1 || plan.planConfident>2"
              src="/img/专家方案/信心.png" width="12" height="12"
              style="margin-left:-0.1rem;">
            <img v-if="plan.planConfident>3" style="margin-left:-0.1rem;"
              src="/img/专家方案/信心.png" width="12" height="12">
            <img v-if="plan.planConfident>4" style="margin-left:-0.1rem;"
              src="/img/专家方案/信心.png" width="12" height="12">
          </span>
          <span class="pull-right r04">
            剩余购买时间:{{residualTime}}
          </span>
        </div>
      </li>
      <li class="item-content">
        <div class="center2">
          <img :src="plan.expert_photo" class="img-responsive" width="64" height="64">
        </div>
      </li>
      <li class="item-content" style="margin-top:-0.6rem;">
        <div class="center2">
          <font>{{plan.expert_name}}<font>
        </div>
      </li>
      <li class="item-content" style="margin-top:-0.8rem;">
        <div class="pull-left" style="margin-left:-0.4rem;">
          方案数:{{summary.planTotalNum}}
        </div>
        <div class="center2">
          胜率:{{parseInt(summary.winrate*100, 0)}}%
        </div>
        <div class="pull-right r04">
          奖金:{{summary.totalProfit}}
        </div>
      </li>
      <li class="item-content"
        style="margin-top:-0.6rem;background-color:#3c3d42;">
        <div style="width:180%;">
          <span class="icon-histogram"
            style="font-size:1rem;color:red;">
            <font style="font-size:0.68rem;color:#ffffff;">
              {{plan.range_name}}
            </font>
          </span>
          <span class="pull-right icon-piechart r04"
            style="font-size:1rem;color:red;">
            <font style="font-size:0.68rem;color:#FFFFFF;"
              v-if="plan.range_saleLimit-plan.saledAmount>0">
              限购剩余 {{plan.range_saleLimit-plan.saledAmount}} 元
            </font>
            <font style="font-size:0.68rem;color:#FFFFFF;" v-else>
              不限购
            </font>
          </span>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content2 item-link" @click="showInfo('planContent',$event)">
        <div class="item-inner">
          <div class="item-title2">
            方案内容
            <font style="font-size:0.48rem;color:gray;">
              (销售截止后才可查看)
            </font>
          </div>
        </div>
      </li>
      <li class="item-content2 fafafa" id="planContent" style="display: none;">
        <div class="item-inner">
          <div class="item-title2" style="font-size:0.58rem;margin-left:0.4rem;">
            {{{plan.plan_content}}}
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content2 item-link" @click="showInfo('expertDesc',$event)">
        <div class="item-inner">
          <div class="item-title2">专家简介</div>
        </div>
      </li>
      <li class="item-content2 fafafa" id="expertDesc" style="display: none;">
        <div class="item-inner">
          <div class="item-title2" style="font-size:0.58rem;margin-left:0.4rem;">
            {{attachInfo.expertIntro}}
          </div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content2 item-link"  @click="showInfo('expertHistory',$event)">
        <div class="item-inner">
          <div class="item-title2">专家战绩</div>
        </div>
      </li>
      <li class="item-content2" id="expertHistory" style="display: block;font-size:0.6rem;">
        <div v-for="h in expertHistory | orderBy 'plan_status' -1"
          class="item-inner item-title2 fafafa"
          :style="(h.planResult!=='胜'?'':'color:#FF2D2D')">
          <div>
            <!-- 01/05 -->
            {{h.effective_time.substr(5, 5)}}
          </div>
          <div>
            <span class="icon-histogram">
              {{h.rangeName}}
            </span>
          </div>
          <div>
            <div class="icon-golds">
              {{h.plan_amount}}.00元
            </div>
          </div>
          <div :class="h.planResult==='胜'?'icon-right2':(h.planResult==='负'?'icon-wrong2':'icon-cancel2')"></div>
        </div>
      </li>
    </ul>
    <br>
  </div>
</div>
<div class="toolBarDetail">
  <div class="submit-button">
    <button v-show="!showPayBtn" class="button button-big button-fill"
      :class="disabledPayBtn?'disabled':''" @click="popPay()">购买方案</button>
  </div>
</div>
<div :class="['modal-overlay', showPayBtn ? 'modal-overlay-visible' : '']"
  v-on:click="closeModal">
  <v-pay-button :amount="plan.plan_amount" :title="title" :show="showPayBtn" :item="plan"></v-pay-button>
</div>
</template>

<script>
  import VPayButton from '../../components/PlanPayButton'
  import {planApi} from '../../util/service'
  import {getDateDiff} from '../../util/util'
  import $ from 'zepto'

  export default {
    ready () {
      $.init()
      // 获取服务器时间
      this.$http.get(planApi.time, {}, {
        headers: {
          'x-token': window.localStorage.getItem('token')
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          this.$set('serviceTime', result)
        }
      }).catch(()=>{
        console.error('无法连接服务器-获取服务器时间')
      })
      this.loadPlan()
    },
    data () {
      return {
        id: this.$route.params.id,
        title: '方案详情',
        path: '/plan',
        attachInfo: '',
        certList: '',
        expertHistory: '',
        plan: '',
        summary: '',
        serviceTime: '',
        residualTime: '',
        showPayBtn: false,
        disabledPayBtn: false,
        showImg: window.localStorage.getItem('imageSwitch') === 'true',
        userId: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).user_id : null,
        loading: false,
        pagenum: 0
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
      },
      closeModal: function () {
        this.showPayBtn = false
      },
      popPay: function () {
        if (this.disabledPayBtn) {
          return
        }
        if (window.localStorage.getItem('user')) {
          this.showPayBtn = true
        }
        else {
          $.toast('请登录后购买方案...')
        }
      },
      loadPlan () {
        // 获取方案
        $.showIndicator()
        this.$http.post(planApi.detail, {
          pid: this.id
        }, {
          headers: {
            'x-token': window.localStorage.getItem('token')
          },
          emulateJSON: true
        })
        .then(({data: {code, msg, result}})=>{
          if (code === 1) {
            // console.log(result)
            this.$set('attachInfo', result.attachInfo)
            this.$set('certList', result.certList)
            this.$set('expertHistory', result.expertHistory)
            this.$set('plan', result.plan)
            this.$set('summary', result.summaryList[0])
            let filterTime = getDateDiff(this.serviceTime, result.plan.deallineTime, 'minute')
            this.$set('residualTime', filterTime > 0 ? filterTime + '分钟' : '已截止')
            if (filterTime < 0) {
              this.$set('disabledPayBtn', true)
            }
          }
          else {
            console.error('获取方案明细失败:' + msg)
          }
        }).catch(()=>{
          console.error('无法连接服务器-获取方案明细')
        }).finally(()=>{
          // 加载完毕需要重置
          $.pullToRefreshDone('.pull-to-refresh-content')
          $.hideIndicator()
        })
      }
    },
    components: {
      VPayButton
    }
  }
</script>
<style scoped>
.list-block {
  margin: 2.2rem 0;
  height: 2.9rem;
  font-size:0.74rem;

  ul {
    height: 2.9rem;
  }

  .item-content {
    margin-top: .7rem;
    height: inherit;
  }
}
.headerColor {
  background-color: #ed8e07;
}
.fafafa {
  background-color: #fafafa;
}
.r04 {
  margin-right:0.4rem;
}
.center2 {
  margin-left: auto;
  margin-right: auto;
}
.submit-button {
  /*margin: 0 auto 2rem auto;*/
  width: 100%;
  padding: 0 .45rem;
}
.submit-button button {
  background-color: red;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.toolBarDetail {
  position:absolute;
  bottom:0.38rem;
  width:100%;
  text-align:center;
  background-color: #FFFFFF;
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
