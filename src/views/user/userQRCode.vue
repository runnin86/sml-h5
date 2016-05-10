<template>
<div class="content qrcode" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="content-padded" style="background: white;">
    <p class="color-gray"></p>
    <v-content type="block" >
      <div class="invite-card" v-if="qrUrl">
          <div class="invite-card-content" style="height:100%;">
            <v-qrcode id="canvas" :val="qrUrl" style="margin-left:1.6rem;"
              :size="size" :bg-color="bgColor"
              :fg-color="fgColor" level="L"></v-qrcode>
          </div>
      </div>
    </v-content>
    <div class="download-button">
      <button class="button button-big button-fill" @click="saveAsLocalImage()">
        <span class="icon icon-download"></span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import VContent from '../../components/Content'
import VQrcode from '../../components/Qrcode'
import {userApi} from '../../util/service'
// import * as qr from '../../util/qrcode'
// import $ from 'zepto'

export default {
  ready () {
    // console.log(qr.makeCode('http://naver.com'))
    this.$http.post(userApi.qrcode, {}, {
      headers: {
        'x-token': window.localStorage.getItem('token')
      },
      emulateJSON: true
    })
    .then(({data: {code, msg, result}})=>{
      if (code === 1) {
        this.$set('qrUrl', result)
        // var imgSrc = document.getElementById('canvas').toDataUrl('image/png')
        // console.log(imgSrc)
      }
    }).catch((e)=>{
      console.error('获取用户二维码失败:' + e)
    })
  },
  data () {
    return {
      title: '我的二维码',
      qrUrl: '',
      bgColor: '#FFFFFF',
      fgColor: '#000000',
      size: 260
    }
  },
  components: {
    VContent,
    VQrcode
  },
  methods: {
    saveAsLocalImage () {
      var myCanvas = document.getElementById('qrCanvas')
      var image = myCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      window.location.href = image
    }
  }
}
</script>

<style scoped>
.qrcode .content-padded {
  margin: 2.2rem 0 0 0;
  height: 100%;
  padding: .4rem .4rem;
}
.invite-card {
  padding: .1rem;
}
.invite-card .invite-card-content {
  width: 100%;
  height: 380.2666429px;
  border: 1px solid #B2B2B2;
  border-radius: 8px;
  background-color: #ffffff;
  padding-top: 0.4rem;
}
.color {
  background-color: #ed8e07;
}
.download-button {
  display: none;
  margin-top: .8rem;
  width: 100%;
  padding: 0 .45rem;
}
.download-button button {
  background-color: #ed8e07;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
</style>
