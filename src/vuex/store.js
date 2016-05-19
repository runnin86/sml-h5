import Vue from 'vue'
import Vuex from 'vuex'
import {planApi, hpApi, userApi} from '../util/service'
import $ from 'zepto'

Vue.use(Vuex)

const state = {
  // TODO:设置启动状态
  planBanner: [],
  planScrollMsg: [{
    content: '<div class="scrollMsgText">温馨提示：理性投注，长跟长红</div>'
  }],
  rangeList: [],
  hpBanner: [],
  hpScrollmsg: [{
    content: '<div class="scrollMsgText">一元夺宝，精彩无限!</div>'
  }],
  hpList: [],
  hpList10: [],
  showImg: window.localStorage.getItem('imageSwitch'),
  userUnreadMsg: []
}

const mutations = {
  /*
   * 获取banner-方案
   */
  bannerForPlan () {
    if (!state.showImg) {
      state.planBanner = []
      return
    }
    // console.log('刷新banner-方案!')
    // 获取banner的图片数据-方案
    Vue.http.get(planApi.banner)
    .then(({data: {code, msg, info}})=>{
      if (code === 1) {
        state.planBanner = []
        if (info.length > 0) {
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
    // console.log('刷新滚动消息-方案!')
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
      if (code === 1 && result.length > 0) {
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
    // console.log('获取方案区间列表-方案!')
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
  },
  /*
   * 获取banner-乐夺宝
   */
  bannerForHP () {
    if (!state.showImg) {
      state.hpBanner = []
      return
    }
    // console.log('刷新banner-乐夺宝!')
    Vue.http.get(hpApi.banner)
    .then(({data: {code, msg, info}})=>{
      if (code === 1) {
        state.hpBanner = []
        if (info.length > 0) {
          for (var i = 0; i < info.length; i++) {
            state.hpBanner.push({
              content: info[i].img
            })
          }
        }
      }
      else {
        console.error('获取乐夺宝banner失败:' + msg)
      }
    }).catch(()=>{
      console.error('无法连接服务器获取乐夺宝banner')
    })
  },
  /*
   * 获取滚动提示消息-乐夺宝
   */
  scrollMsgForHP () {
    // console.log('刷新滚动消息-乐夺宝!')
    Vue.http.get(hpApi.oneBuyNewPublic + '?pagenum=' + 0)
    .then(({data: {code, msg, results}})=>{
      if (code === 1) {
        if (results.list.length > 0) {
          state.hpScrollmsg = []
          for (var i = 0; i < results.list.length; i++) {
            let info = results.list[i]
            // 速来挑战!->即刻来秒!->想中戳我!
            // info.payCount
            if (info.user_name) {
              let name = info.user_name
              // 首字*
              // let first = name.substr(0, 1)
              // let finalName = name.replace(first, '*')
              // 首字之外全部*
              let unFirst = name.substr(name.length > 2 ? 2 : 1, name.length)
              let rv = ''
              for (let i = 0; i < name.length - 1; i++) {
                rv += '*'
              }
              let finalName = name.replace(unFirst, rv)
              let msg = '恭喜 ' + finalName + ' ' + info.price + '元夺得' + info.name
              state.hpScrollmsg.push({
                content: '<div class="scrollMsgText">' + msg + '</div>'
              })
            }
          }
        }
      }
      else {
        console.error('获取乐夺宝滚动消息失败:' + msg)
      }
    }).catch((e)=>{
      console.log('无法连接服务器-获取乐夺宝滚动消息')
      console.error(e)
    })
  },
  hpList () {
    // console.log('获取商品列表-乐夺宝!')
    // 获取商品列表
    Vue.http.get(hpApi.home)
    .then(({data: {code, msg, results, count, pagenum}})=>{
      if (code === 1) {
        state.hpList = results.list
      }
      else {
        $.toast(msg)
        console.error('获取商品列表失败:' + msg)
      }
    }).catch(()=>{
      $.alert('服务器连接中断...')
      console.error('无法连接服务器-获取商品列表')
    }).finally(()=>{
    })
  },
  hpList10 () {
    // console.log('获取商品列表10元区-乐夺宝!')
    // 获取商品列表
    Vue.http.get(hpApi.home + '?price=10')
    .then(({data: {code, msg, results, count, pagenum}})=>{
      if (code === 1) {
        state.hpList10 = results.list
      }
      else {
        $.toast(msg)
        console.error('获取十元专区商品列表失败:' + msg)
      }
    }).catch((e)=>{
      console.error('无法连接服务器-获取十元专区商品列表:' + e)
    })
  },
  /*
   * 设置是否展示图片
   */
  showImg (state, flag) {
    window.localStorage.setItem('imageSwitch', flag)
    state.showImg = flag
  },
  /*
   * 获取用户未读消息数量(因接口未完善,此处只是去查询第一页100条内的未读条数)
   */
  userUnreadMsg () {
    // console.log('获取用户消息列表!')
    let token = window.localStorage.getItem('token')
    let param = '?pagenum=1&pagesize=100'
    Vue.http.get(userApi.userMessage + param, {}, {
      headers: {
        'x-token': token
      },
      emulateJSON: true
    })
    .then(({data: {code, msg, result}})=>{
      if (code === 1) {
        state.userUnreadMsg = []
        if (result.msglist.length > 0) {
          for (let m of result.msglist) {
            // 1=未读;0=已读
            if (m.msg_isread === 1) {
              state.userUnreadMsg.push(m)
            }
          }
        }
      }
    }).catch((e)=>{
      console.error('获取用户消息失败:' + e)
    })
  }
}

export default new Vuex.Store({
  state,
  mutations
})
