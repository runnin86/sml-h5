<template>
<div class="content message" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color">我的消息</h1>
  </header>
  <div class="content list" v-infinite-scroll="loadMore">
    <div class="list-block infinite-list">
      <ul v-for="ml in msglist" track-by="$index">
        <li class="item-content" @click="showMsg('m_' + $index,$event)">
          <!-- <div class="item-media"><i class="icon icon-dianji"></i></div> -->
          <div class="item-inner">
            <!-- <div class="item-after">{{ml.msg_id}}</div> -->
            <!-- <div class="item-after">{{ml.msg_title}}</div> -->
            <!-- <div class="item-after">{{ml.msg_content}}</div> -->
            <!-- <div class="item-after">{{ml.msg_createtime.replace('T', ' ').replace('.000Z', ' ')}}</div> -->
            <!-- <div class="item-after">{{ml.msg_isread}}</div> -->
            <!-- <div class="item-after">{{ml.msg_remark}}</div> -->
            <!-- <div class="item-after">{{ml.msg_touser}}</div> -->
            <!-- <div class="item-after">{{ml.msg_type}}</div> -->
            <div style="position:relative;">
              <i v-if="ml.msg_isread === 0"></i>
              <font style="margin-left:0.6rem;">{{ml.msg_title}}</font>
            </div>
            <div>{{ml.msg_createtime.replace('T', ' ').replace('.000Z', ' ')}}</div>
          </div>
        </li>
        <li class="item-content" :id="'m_' + $index" style="display: none;background-color: #FFF7FB;">
          <div class="item-inner">
            <div class="msgContent">{{{ml.msg_content}}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import {loader} from '../../util/util'
import {userApi} from '../../util/service'
import $ from 'zepto'

export default {
  route: {
    data ({to, next}) {
      next()
    }
  },
  ready () {
    this.msglist = []
    this.getMessage()
  },
  data () {
    return {
      msglist: [],
      pagenum: 1,
      pagesize: 10,
      loading: false
    }
  },
  computed: {
    length () {
      return this.msglist.length
    }
  },
  methods: {
    getMessage () {
      let token = window.localStorage.getItem('token')
      let param = '?pagenum=' + this.pagenum + '&pagesize=' + this.pagesize
      this.$http.get(userApi.userMessage + param, {}, {
        headers: {
          'x-token': token
        },
        emulateJSON: true
      })
      .then(({data: {code, msg, result}})=>{
        if (code === 1) {
          if (result.msglist.length === 0) {
            this.pagenum = -1
            return
          }
          for (let m of result.msglist) {
            this.msglist.push(m)
          }
        }
      }).catch((e)=>{
        console.error('获取用户消息失败:' + e)
      })
    },
    showMsg (id, e) {
      if (document.getElementById(id).style.display === 'block') {
        document.getElementById(id).style.display = 'none'
      }
      else {
        document.getElementById(id).style.display = 'block'
      }
    },
    loadMore () {
      // 1.加载中 2.pagenum为负数 3.当前记录的条数<当前页数*每页条数
      if (this.loading || this.pagenum === -1) {
        // 满足上述2条件的任一条,均不加载更多
        return
      }
      this.loading = true
      let scroller = $('.list')
      loader.show()
      setTimeout(() => {
        // 查询更多数据
        this.pagenum = this.pagenum + 1
        this.getMessage()
        let scrollTop = scroller[0].scrollHeight - scroller.height()
        scroller.scrollTop(scrollTop)
        this.loading = false
        loader.hide()
      }, 1500)
    }
  }
}
</script>

<style>
.message .list-block {
  margin: 0.1rem 0 1rem 0;
  font-size: .65rem;
}
.message .list-block .item-subtitle {
  font-size: .65rem;
}
.message .list-block .item-input {
  margin-top: .06rem;
  margin-bottom: .06rem;
}
.message .list-block input {
  font-size: .65rem;
}
.message .list-block select {
  font-size: .65rem;
}
.message .list-block textarea {
  font-size: .65rem;
}
.message .list-block .item-title.label  {
  width: 30%;
}
.msgContent span {
  font-size: .60rem !important;
}
.color {
  background-color: #ed8e07;
}
i{
  display:block;
  background: #f00;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  top: 0.26rem;
  /*left:-0.2rem;*/
  position: absolute;
}
</style>
