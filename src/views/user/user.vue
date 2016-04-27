<template>
<div class="content user" distance="55"
  v-pull-to-refresh="refresh" v-infinite-scroll="loadMore"
  :style="(!this.user?'background-color:white':'')">
  <v-layer></v-layer>
  <div class="banner">
    <div class="logo">
        <div class="logo_img">
            <img src="../../assets/img/个人中心/默认头像.png" class="img-responsive"
              style="border:solid 1px #fff;border-radius: 50px;overflow:hidden;"
              width="64" height="64">
        </div>
        <div class="name_txt">
          <span class="name" v-if="user">{{user.user_nickname?user.user_nickname:user.user_name}}</span>
        </div>
        <div class="logo_txt">
            <span class="yue">我的余额</span>
            <span class="amount timer count-title" id="count-number"
              data-to="300" data-speed="500" data-decimals="0">
              {{user?userate:'...'}}
            </span>
        </div>
    </div>
  </div>
  <div v-if="!user" class="submit-button">
    <button @click="this.$route.router.go({path: '/login?from=user', replace: true})"
      class="button button-big button-fill">
      登录
    </button>
  </div>
  <div v-if="user">
    <nav class="bar bar-tab user-tab">
      <a class="tab-item">
        <span class="icon icon-message"></span>
        <span class="tab-label">消息</span>
      </a>
      <a class="tab-item" v-link="{ path: '/user/setting', replace: false}">
        <span class="icon icon-settings"></span>
        <span class="tab-label">设置</span>
      </a>
    </nav>
    <!-- 内容区 -->
    <v-tabs type="tab" class-name="article-tabs" style="margin-top:0.1rem;">
      <v-tab name="tab-participation" status="active" title="所有参与">
        <div style="margin-top: 0.1rem;height:100%;" class="list">
          <v-card-container v-for="p in participation | orderBy 'id' -1" style="margin: 0.18rem;">
            <div class="row">
              <div v-if="showImg" class="col-25" style="margin-top:2.2rem;margin-left:6%;width:2.48rem;">
                <img :src="p.images| split ','| getArray 0" style="width: 130%;height:130%;">
              </div>
              <div v-else class="col-25" style="margin-top:2.2rem;margin-left:6%;width:2.48rem;">
                <img src="/img/乐夺宝/产品图片默认.png" style="width: 130%;height:130%;">
              </div>
              <div class="col-78">
                <card type="content-inner" style="margin-bottom:0.1rem;">
                  <div style="font-size:.8rem;" class="text-sml">{{'第'+p.number+'期 '+p.name}}</div>
                  <div style="font-size:.6rem;" class="text-sml">
                    本期参与人次:<font color="red"> {{p.payCount}}</font>
                  </div>
                  <div v-if="p.status==0 && !this.isShowTime(p.publicTime).show" class="row" style="background-color: #EEEEEE;margin-top: 0.2rem;">
                    <div style="margin:0.2rem 0.2rem 0.2rem 0.4rem;">
                      <span id="knowResult">
                        <div>
                          中奖号码: <font color="red"> {{p.luckCode}}</font>
                        </div>
                        <div>
                          <span>获奖者: {{p.user_name}}<span>
                          <span class="pull-right" style="margin-right: 0.6rem;padding: .1rem;border: 1px solid #929292;">
                            <font color="green">已揭晓</font>
                          <span>
                        </div>
                        <div>
                          人次: <font color="red"> {{p.userPayCount}}</font>
                        </div>
                        <div>
                          日期: {{p.publicTime}}
                        </div>
                      </span>
                    </div>
                  </div>
                  <div v-if="p.status==0 && this.isShowTime(p.publicTime).show" class="row">
                    <span style="margin-top: -2rem;">
                      <div style="margin-left:0.4rem;">揭晓倒计时</div>
                      <v-count-down :countTime="this.isShowTime(p.publicTime).time" :id="p.id"></v-count-down>
                      <div>
                      </div>
                    </span>
                  </div>
                  <div v-if="p.status==1" class="row" style="margin-top: 0.2rem;">
                    <div class="col-90">
                      <card type="content-inner" style="padding:0.1rem">
                        <div class="progress" style="height:10px;">
                          <span v-if="parseFloat((p.totalCount-p.remainingAmount)/p.totalCount) > 0"
                            class="blue"
                            :style="{ height: '8px', width: parseFloat((p.totalCount-p.remainingAmount)/p.totalCount)*100 + '%' }"></span>
                        </div>
                      </card>
                      <card type="header">
                        <span style="font-size:.6rem;">
                          <div>{{p.totalCount}}</div><div>总需</div>
                        </span>
                        <span style="font-size:.6rem;">
                          <div>{{p.remainingAmount}}</div><div>剩余</div>
                        </span>
                      </card>
                    </div>
                  </div>
                </card>
              </div>
            </div>
          </v-card-container>
        </div>
      </v-tab>

      <v-tab name="tab-winning" title="中奖记录">
        <div style="margin-top:0.1rem;" class="list">
          <v-card-container v-for="w in winning | orderBy 'id' -1" style="margin: 0.18rem;">
            <div class="row">
              <div v-if="showImg" class="col-25" style="margin-top:2.2rem;margin-left:6%;width:2.48rem;">
                <img :src="w.images| split ','| getArray 0" style="width: 130%;height:130%;">
              </div>
              <div v-else class="col-25" style="margin-top:2.2rem;margin-left:6%;width:2.48rem;">
                <img src="/img/乐夺宝/产品图片默认.png" style="width: 130%;height:130%;">
              </div>
              <div class="col-78">
                <card type="content-inner" style="margin-bottom:0.1rem;">
                  <div style="font-size:.8rem;" class="text-sml">{{'第'+w.number+'期 '+w.name}}</div>
                  <div style="font-size:.6rem;" class="text-sml">
                    本期参与人次:<font color="red"> {{w.payCount}}</font>
                  </div>
                  <div class="row" style="margin-top: 0.2rem;text-align: center;">
                    <span>
                      <div>
                        <font style="font-size:1.4rem;color:red;"> {{w.luckCode}}</font>
                      </div>
                      <div style="font-size:.6rem;">
                        中奖时间: {{w.publicTime}}
                      </div>
                    </span>
                  </div>
                </card>
              </div>
            </div>
          </v-card-container>
        </div>
      </v-tab>
    </v-tabs>
  </div>
</div>
</template>

<script>
import VTabs from '../../components/Tabs'
import VTab from '../../components/Tab'
import VCardContainer from '../../components/Card'
import Card from '../../components/CardItem'
import VCountDown from '../../components/Countdown'
import VLayer from '../../components/PullToRefreshLayer'
import {loader} from '../../util/util'
import {hpApi} from '../../util/service'
import $ from 'zepto'

export default {
  ready () {
    $.init()
    this.refresh()
  },
  data () {
    return {
      loading: false,
      user: JSON.parse(window.localStorage.getItem('user')),
      showImg: window.localStorage.getItem('imageSwitch') === 'true',
      userate: 0,
      coinmeter: 0,
      participation: [],
      participationPagenum: 0,
      winning: [],
      winningPagenum: 0
    }
  },
  computed: {
    length () {
      return this.participation.length
    }
  },
  methods: {
    /*
     * 刷新
     */
    refresh () {
      if (this.user) {
        $.showIndicator()
        // 获取用户盈利
        let token = window.localStorage.getItem('token')
        this.getUserate(token)
        // 执行查询
        setTimeout(function () {
          // 需要清空分页信息
          this.participation = []
          this.participationPagenum = 0
          this.winning = []
          this.winningPagenum = 0
          // 获取用户参与记录
          this.getParticipation(this.user.user_id, 0)
          // 获取用户中奖记录
          this.getWinning(this.user.user_id, 0)
          // 加载完毕需要重置
          $.pullToRefreshDone('.pull-to-refresh-content')
          $.hideIndicator()
        }.bind(this), 500)
      }
      else {
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
      }
    },
    /*
     * 加载更多
     */
    loadMore () {
      let activeTab = $('.active.button.tab-link')[0].hash
      if (activeTab === '#tab-participation') {
        this.loadMore0()
      }
      else if (activeTab === '#tab-winning') {
        this.loadMore1()
      }
    },
    loadMore0 () {
      // 1.加载中 2.pagenum为负数 3.当前记录的条数<当前页数*每页条数
      if (this.loading || this.participationPagenum === -1 ||
        (this.participation.length < (this.participationPagenum + 1) * 10)) {
        // 满足上述3条件的任一条,均不加载更多
        return
      }
      this.loading = true
      let scroller = $('.list')
      loader.show()
      setTimeout(() => {
        // 查询更多数据
        this.participationPagenum = this.participationPagenum + 1
        this.getParticipation(this.user.user_id, this.participationPagenum)
        let scrollTop = scroller[0].scrollHeight - scroller.height()
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 1500)
    },
    loadMore1 () {
      // 1.加载中 2.pagenum为负数 3.当前记录的条数<当前页数*每页条数
      if (this.loading || this.winningPagenum === -1 ||
        (this.winning.length < (this.winningPagenum + 1) * 10)) {
        // 满足上述3条件的任一条,均不加载更多
        return
      }
      this.loading = true
      let scroller = $('.list')
      loader.show()
      setTimeout(() => {
        // 查询更多数据
        this.winningPagenum = this.winningPagenum + 1
        this.getWinning(this.user.user_id, this.winningPagenum)
        let scrollTop = scroller[0].scrollHeight - scroller.height()
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 1500)
    },
    /*
     * 获取用户账户的盈利
     */
    getUserate (token) {
      this.$http.post(hpApi.userate, {}, {
        headers: {
          'x-token': token
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          this.userate = result.rateAccount
        }
        else {
          $.alert('会话失效,请重新登录', ()=>{
            window.localStorage.clear()
            window.localStorage.setItem('imageSwitch', true)
            this.$route.router.go({path: '/login?from=user', replace: true})
          })
        }
      }).catch((e)=>{
        console.error('获取账户盈利失败:' + e)
      })
    },
    /*
     * 获取账户本金
     */
    getCoinmeter (token) {
      this.$http.post(hpApi.coinmeter,
        {
          'x-token': token
        })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          this.coinmeter = result.coinmeter
        }
        else {
          $.alert('会话失效,请重新登录', ()=>{
            window.localStorage.clear()
            window.localStorage.setItem('imageSwitch', true)
            this.$route.router.go({path: '/login?from=user', replace: true})
          })
        }
      }).catch((e)=>{
        console.error('获取账户本金失败:' + e)
      })
    },
    /*
     * 获取用户的所有参与
     */
    getParticipation (uid, num) {
      if (this.user.user_id) {
        this.$http.get(hpApi.userOneBuyOrder + '?userId=' + uid + '&pagenum=' + num)
        .then(({data: {code, msg, results}})=>{
          if (code === 1) {
            if (results.list.length === 0) {
              this.participationPagenum = -1
              return
            }
            for (var i = 0; i < results.list.length; i++) {
              this.participation.push(results.list[i])
            }
          }
        }).catch((e)=>{
          console.error('获取用户参与记录失败:' + e)
        })
      }
    },
    /*
     * 获取用户的中奖记录
     */
    getWinning (uid, num) {
      if (this.user.user_id) {
        this.$http.get(hpApi.oneBuyNewPublic + '?userId=' + uid + '&pagenum=' + num)
        .then(({data: {code, msg, results}})=>{
          if (code === 1) {
            if (results.list.length === 0) {
              this.winningPagenum = -1
              return
            }
            for (var i = 0; i < results.list.length; i++) {
              this.winning.push(results.list[i])
            }
          }
        }).catch((e)=>{
          console.error('获取用户中奖记录失败:' + e)
        })
      }
    },
    /*
     * 是否展示倒计时
     */
    isShowTime (time) {
      let pubTime = new Date(Date.parse(time.replace(/-/g, '/')))
      let now = new Date()
      // pubTime.setHours(pubTime.getHours() + 9)
      // now.setMinutes(now.getMinutes() + 15)
      if (now < pubTime) {
        // 展示倒计时
        return {show: true, time: pubTime}
      }
      else {
        // 展示结果
        return {show: false, time: pubTime}
      }
    }
  },
  components: {
    VTabs,
    VTab,
    VCardContainer,
    Card,
    VLayer,
    VCountDown
  }
}
</script>

<style>
.user {
  top: -2.2rem !important;
}
.banner {
  width: 100%;
  background-color: white;
  padding: 12.7999992px;
}
.banner .logo {
  background-color: #ed8e07;
  border-radius: 10px;
  width: 100%;
  height: 110px;
  padding: 20.2666654px 21.333332px 5.333333px;
  box-shadow: 0 .0rem .8rem rgba(0,0,0,.3);
}
.banner .logo .logo_img {
  margin-top: 0px;
  width: 58.666663px;
  height: 58.666663px;
  float: left;
  margin-left: -0.6rem;
  display: inline-block;
}
.banner .logo .name_txt {
  margin-top: 1rem;
  margin-left: 0.6rem;
  float: left;
  text-align: right;
}
.banner .logo .name_txt .name {
  color: #ffffff;
  font-size: 15.999999px;
}
.banner .logo .logo_txt {
  /*margin-top: 0.1rem;*/
  float: right;
  text-align: right;
}
.banner .logo .logo_txt .yue {
  color: #ffffff;
  font-size: 10.999999px;
}
.banner .logo .logo_txt .amount {
  display: block;
  margin-top: -6px;
  color: #ffffff;
  font-size: 35.8666638px;
}
.user-tab {
  background: #efeff4;
  height: 3rem;
  position: relative;
}
.user-tab .tab-item {
  height: 3rem;
  background-color: white;
}
.user-tab:before {
  background-color: white;
}
#knowResult{
  font-size: 0.48rem;
}
.submit-button {
  margin-top: .8rem;
  width: 100%;
  padding: 0 .45rem;
}
.submit-button button {
  background-color: #ed8e07;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
</style>
