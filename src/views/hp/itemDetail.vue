<template>
<div class="content" transition="bounce">
  <v-nav :path="path" :title="title" :replace=false class="color"></v-nav>
  <v-content type="block">
    <div class="content list" style="margin-top:2.2rem;"
      v-infinite-scroll="loadMore">
      <div>
        <!-- 轮播图 -->
        <slider :banner="banner" style="z-index:9999;"></slider>
      </div>
      <div class="list-block media-list" style="margin:0rem;">
        <ul>
          <li>
            <a href="#" class="item-content" style="padding-left:0rem;">
              <div class="item-inner" style="padding-left:0.75rem;">
                <div class="item-title-row">
                  <div class="item-title">第{{itemInfo.number}}期 {{itemInfo.name}}</div>
                </div>
                <div class="item-text">{{itemInfo.content}}</div>
                <div class="progress" style="height:10px;margin-top:0.8rem;">
                  <span v-if="parseFloat((itemInfo.totalCount-itemInfo.codeCount)/itemInfo.totalCount) > 0"
                    class="red"
                    :style="{ height: '8px', width: parseFloat((itemInfo.totalCount-itemInfo.codeCount)/itemInfo.totalCount)*100 + '%' }"></span>

                </div>
                <div class="item-title-row" style="margin-bottom:0.5rem;">
                  <div class="item-text"><div>{{itemInfo.totalCount}}</div><div>总需</div></div>
                  <div class="item-text"><div>{{itemInfo.codeCount}}</div><div>剩余</div></div>
                </div>
              </div>
            </a>
          </li>
          <li class="item-content item-link" @click="showPartake('partake',$event)">
            <div class="item-inner">
              <div class="item-title">参与码</div>
            </div>
          </li>
          <li class="item-content" id="partake" style="display: none;">
            <div class="item-text-sml">
              <div>
                <span v-for="r in partake">
                  <span>{{r}}</span>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- <div class="list-block">
        <ul>
          <li class="item-content item-link" style="padding-left:0rem;">
            <div class="item-inner" style="padding-left:0.75rem;">
              <div class="item-title">图文详情</div>
            </div>
          </li>
          <li class="item-content item-link">
            <div class="item-inner">
              <div class="item-title">往期揭晓</div>
            </div>
          </li>
        </ul>
      </div> -->

      <div class="list-block" style="padding-bottom:4rem;">
        <ul>
          <li class="item-content" style="padding-left:0rem;">
            <div class="item-inner" style="padding-left:0.75rem;">
              <div class="item-title">参与记录</div>
            </div>
          </li>
        </ul>
        <ul>
          <li class="item-content" id="joinRecord" style="padding-left:0rem;"
            v-for="r in records" track-by="$index">
            <div class="item-inner" style="padding-left:0.75rem;padding-top:0;padding-bottom:0;">
              <div class="item-media">
                <div class="item-title-row">
                  <div>
                    <div class="text-center pull-left" style="margin-left: 0.2rem;">
                      <img src="/img/个人中心/默认头像.png" class="img-responsive"
                        style="border:solid 1px #02DF82;border-radius: 50px;overflow:hidden;"
                        width="40" height="40">
                    </div>
                    <div style="font-weight: bold;text-align: center;">{{r.name}}</div>
                  </div>
                </div>
              </div>
              <div class="item-title pull-left">
                <div style="margin-bottom:0.3rem;">IP:192.178.128.122</div>
                <div style="margin-top:0.3rem;">{{r.time}}</div>
              </div>
              <div class="item-after">人次:{{r.count}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </v-content>
</div>
<div class="toolBarDetail">
  <div class="submit-button">
    <button v-show="!showPayBtn" class="button button-big button-fill" @click="popPay()">立即夺宝</button>
  </div>
</div>
<div :class="['modal-overlay', showPayBtn ? 'modal-overlay-visible' : '']"
  v-on:click="closeModal">
  <v-pay-button :amount="itemInfo.price<10?(itemInfo.codeCount<10?itemInfo.price:10):itemInfo.price" :title="title" :show="showPayBtn" :item="itemInfo"></v-pay-button>
</div>
</template>

<script>
  import Slider from '../../components/Slider'
  import VNav from '../../components/Nav'
  import VContent from '../../components/Content'
  import VPayButton from '../../components/PayButton'
  import {loader} from '../../util/util'
  import {hpApi} from '../../util/service'
  import $ from 'zepto'
  export default {
    ready () {
      $.init()
      // 获取商品信息
      this.getItemInfo(this.$route.params.id)
      // 获取该商品的所有参与记录
      this.getParticipation(this.$route.params.id, this.$route.query.number, 0)
      if (this.userId) {
        // 用户登录的需要查询参与码
        this.getUserPartake(this.userId, this.$route.params.id, this.$route.query.number)
      }
    },
    data () {
      return {
        id: this.$route.params.id,
        itemInfo: '',
        banner: [],
        title: '商品详情',
        path: '/happyPurchase',
        records: [],
        partake: [],
        showPayBtn: false,
        showImg: window.localStorage.getItem('imageSwitch') === 'true',
        userId: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).user_id : null,
        loading: false,
        pagenum: 0,
        addObj: ''
      }
    },
    methods: {
      closeModal: function () {
        this.showPayBtn = false
      },
      popPay: function () {
        if (window.localStorage.getItem('user')) {
          this.showPayBtn = true
        }
        else {
          $.toast('请登录后参与夺宝...')
        }
      },
      /*
       * 获取产品基本信息
       */
      getItemInfo: function (id) {
        // 获取商品信息
        this.$http.get(hpApi.home + '/' + id)
        .then(({data: {code, msg, info}})=>{
          if (code === 1) {
            this.$set('itemInfo', info[0])
            let img = []
            let images = info[0].images.split(',')
            for (var i = 0; i < images.length; i++) {
              img.push({
                content: images[i]
              })
            }
            if (this.showImg) {
              this.$set('banner', img)
            }
          }
          else {
            console.error('获取商品信息失败:' + msg)
          }
        }).catch(()=>{
          console.error('无法连接服务器-获取商品信息')
        })
      },
      /*
       * 获取该产品所有参与记录
       */
      getParticipation: function (id, number, pagenum) {
        // 获取参与记录
        let recordUrl = hpApi.all_partake +
          '?projectId=' + id + '&number=' + number + '&pagenum=' + pagenum
        this.$http.get(recordUrl)
        .then(({data: {code, msg, results}})=>{
          if (code === 1) {
            if (results.list.length === 0) {
              this.pagenum = -1
              return
            }
            for (var i = 0; i < results.list.length; i++) {
              let re = results.list[i]
              this.records.push({
                name: re.user_name,
                time: re.addTime,
                count: re.payCount
              })
            }
          }
          else {
            console.error('获取商品的所有参与记录失败:' + msg)
          }
        }).catch(()=>{
          console.error('无法连接服务器-获取商品的所有参与记录')
        })
      },
      /*
       * 获取用户的参与码
       */
      getUserPartake: function (uid, id, number) {
        let upUrl = hpApi.my_partake +
          '?userId=' + uid + '&projectId=' + id + '&number=' + number
        this.$http.get(upUrl).then(({data: {code, msg, info}})=>{
          if (code === 1) {
            for (var i = 0; i < info.split(',').length; i++) {
              this.partake.push(info.split(',')[i])
            }
          }
        }).catch(()=>{
        })
      },
      /*
       * 参与码展开
       */
      showPartake (id, e) {
        if (document.getElementById(id).style.display === 'block') {
          document.getElementById(id).style.display = 'none'
        }
        else {
          document.getElementById(id).style.display = 'block'
        }
      },
      /*
       * 加载更多
       */
      loadMore () {
        // 1.加载中 2.pagenum为负数 3.当前记录的条数<当前页数*每页条数
        if (this.loading || this.pagenum === -1 || (this.records.length < (this.pagenum + 1) * 10)) {
          // 满足上述3条件的任一条,均不加载更多
          return
        }
        this.loading = true
        let scroller = $('.list')
        loader.show()
        setTimeout(() => {
          this.pagenum = this.pagenum + 1
          this.getParticipation(this.$route.params.id, this.$route.query.number, this.pagenum)
          let scrollTop = scroller[0].scrollHeight - scroller.height()
          scroller.scrollTop(scrollTop)
          this.loading = false
          loader.hide()
        }, 1500)
      }
    },
    components: {
      Slider,
      VNav,
      VContent,
      VPayButton
    }
  }
</script>
<style>
.list-block {
  margin: .3rem 0;
}
.list {
  bottom: .5rem;
  padding-bottom: 1rem;
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
#joinRecord>div{
  font-size: 0.48rem;
}
.list-block .item-text-sml {
  font-size: 0.75rem;
  color: #5f646e;
  line-height: 1.05rem;
}
.color {
  background-color: #ed8e07;
}
</style>
