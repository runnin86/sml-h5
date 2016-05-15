<template>
<div class="content about" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color">关于</h1>
  </header>
  <div class="list-block" style="margin-top:2.2rem;font-size:0.65rem;">
    <br/>
    <div class="invite-card">
        <div class="invite-card-content" style="height:100%;">
            <div class="center_code">
                <div class="wx_code" style="width:100%;height:100%">
                    <img src="/favicon.ico" height="64" width="64">
                </div>
            </div>
        </div>
    </div>
    <br/>
    <ul>
      <a href="tel:400-8710-088">
        <li class="item-content item-link">
          <div class="item-inner">
            <div class="item-title" style="color:black;">
              客服电话
            </div>
            <div class="item-after">
              400-8710-088
            </div>
          </div>
        </li>
      </a>
    </ul>
  </div>
</div>
</template>

<script>
// import $ from 'zepto'

export default {
  ready () {
  },
  data () {
    return {
      showImg: window.localStorage.getItem('imageSwitch') === 'true'
    }
  },
  methods: {
  }
}
</script>

<style>
.about .list-block {
  margin: 2.2rem 0 1rem 0;
  font-size: .65rem;
}
.color {
  background-color: #ed8e07;
}
.invite-card {
  padding: .1rem;
}
.invite-card .invite-card-content {
  width: 100%;
  /*height: 380.2666429px;*/
  border: 1px solid #B2B2B2;
  border-radius: 8px;
  background-color: #ffffff;
  /*padding-top: 26.666665px;*/
}
.invite-card .left_logo {
  width: 3rem;
  height: 3rem;
  float: left;
  margin-left: .8rem;
}
.center_code {
  width: 100%;
  margin: 0 auto;
  /*padding-top: 1rem;*/
}
.center_code .wx_code {
  margin: 0 auto;
  text-align: center;
  width: 50%;
  height: 50%;
}
</style>
