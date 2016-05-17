import Vue from 'vue'
import Vuex from 'vuex'
import {planApi} from '../util/service'
import $ from 'zepto'

Vue.use(Vuex)

const state = {
  // TODO:设置启动状态
  planBanner: [],
  planScrollMsg: [{
    content: '<div class="scrollMsgText">温馨提示：理性投注，长跟长红</div>'
  }],
  rangeList: [],
  showImg: window.localStorage.getItem('imageSwitch') === 'true'
}

const mutations = {
  /*
   * 获取banner-方案
   */
  bannerForPlan () {
    console.log('刷新banner-方案!')
    // 获取banner的图片数据-方案
    Vue.http.get(planApi.banner)
    .then(({data: {code, msg, info}})=>{
      if (code === 1) {
        state.planBanner = []
        if (info.length > 0 && state.showImg) {
          for (var i = 0; i < info.length; i++) {
            state.planBanner.push({
              content: info[i].img
            })
          }
        }
      }
      else {
        console.error('获取方案banner失败:' + msg)
      }
    }).catch((e)=>{
      console.log('无法连接服务器获取方案banner')
      console.error(e)
    })
  },
  /*
   * 获取滚动提示消息-方案
   */
  scrollMsgForPlan (state) {
    console.log('刷新滚动消息-方案!')
    // 获取滚动消息(方案)
    Vue.http.get(planApi.rank, {}, {
      headers: {
        'x-token': window.localStorage.getItem('token')
      },
      emulateJSON: true
    })
    .then(({data: {code, msg, result}})=>{
      // console.log(data)
      // content: '<div style="font-size:0.72em;line-height:2rem;color:#FFFFFF;">温馨提示：理性投注，长跟场红</div>'
      if (code === 1) {
        state.planScrollMsg = []
        for (var i = 0; i < result.length; i++) {
          let obj = result[i]
          // 隐藏手机号码中间四位
          let phone = obj.bs_userId.substr(3, 4)
          let lphone = obj.bs_userId.replace(phone, '****')
          let scrollText = {content: '<div class="scrollMsgText">用户 ' +
            lphone + '，上期盈利 ' + (obj.winbonus ? obj.winbonus : 0.0) + ' 元</div>'}
          state.planScrollMsg.push(scrollText)
          // console.log(obj.bs_userId + '->' + obj.winbonus)
        }
      }
      else {
        console.error('获取方案滚动消息失败:' + msg)
      }
    }).catch((e)=>{
      console.log('无法连接服务器-获取方案滚动消息')
      console.error(e)
    })
  },
  /*
   * 获取方案区间列表
   */
  rangeList () {
    // 获取方案
    Vue.http.get(planApi.plan, {}, {
      headers: {
        'x-token': window.localStorage.getItem('token')
      },
      emulateJSON: true
    })
    .then(({data: {code, msg, result}})=>{
      if (code === 1) {
        // console.log(result.rangeList)
        state.rangeList = result.rangeList
      }
      else if (code === 0) {
        $.toast(msg)
      }
      else if (code === 3) {
        $.alert(msg, ()=>{
          window.localStorage.clear()
          window.localStorage.setItem('imageSwitch', true)
          this.$route.router.go({path: '/login?from=user', replace: true})
        })
      }
    }).catch(()=>{
      $.alert('服务器连接中断...')
      console.error('无法连接服务器-获取方案')
    }).finally(()=>{
    })
  }
}

export default new Vuex.Store({
  state,
  mutations
})
