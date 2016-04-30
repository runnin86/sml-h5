<template>
<div class="content plandetail" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/plan', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color">方案详情</h1>
  </header>
  <div class="list-block">
    <ul>
      <li class="item-content">
        <div style="width:100%;">
          <span style="margin-left:-0.4rem;">
            信心指数
            <img src="/img/专家方案/信心.png" width="12" height="12">
            <img src="/img/专家方案/信心.png" width="12" height="12"
              style="margin-left:-0.1rem;">
            <img src="/img/专家方案/信心.png" width="12" height="12"
              style="margin-left:-0.1rem;">
            <img src="/img/专家方案/信心.png" width="12" height="12"
              style="margin-left:-0.1rem;">
            <img src="/img/专家方案/信心.png" width="12" height="12"
              style="margin-left:-0.1rem;">
          </span>
          <span class="pull-right" style="margin-right:0.4rem;">
            剩余购买时间: 500分钟
          </span>
        </div>
      </li>
      <li class="item-content">
        <div class="center2">
          <img src="/img/个人中心/默认头像.png" class="img-responsive"
            style="border:solid 1px #e32;border-radius: 50px;overflow:hidden;"
            width="64" height="64">
        </div>
      </li>
      <li class="item-content" style="margin-top:-0.6rem;">
        <div class="center2">
          <font>他山之石<font>
        </div>
      </li>
      <li class="item-content" style="margin-top:-0.8rem;">
        <div class="pull-left" style="margin-left:-0.4rem;">
          方案数:280
        </div>
        <div class="center2">胜率:88%</div>
        <div class="pull-right" style="margin-right:0.4rem;">
          奖金:226035
        </div>
      </li>
      <li class="item-content"
        style="margin-top:-0.6rem;background-color:#3c3d42;">
        <div style="width:180%;">
          <span class="icon-histogram"
            style="font-size:1rem;color:red;">
            <font style="font-size:0.68rem;color:#ffffff;">
              0%~10%收益区
            </font>
          </span>
          <span class="pull-right icon-piechart"
            style="font-size:1rem;color:red;margin-right:0.4rem;">
            <font style="font-size:0.68rem;color:#ffffff;">
              限购剩余 36870.00元
            </font>
          </span>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content2 item-link">
        <div class="item-inner">
          <div class="item-title2">方案内容(销售截止后才可观看)</div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content2 item-link" v-link="{ path: '/more/feedback', replace: true}">
        <div class="item-inner">
          <div class="item-title2">专家简介</div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content2 item-link" v-link="{ path: '/more/about', replace: true}">
        <div class="item-inner">
          <div class="item-title2">专家战绩</div>
        </div>
      </li>
      <li class="item-content2" style="display: block;background-color: #fafafa;">
        <div class="item-inner item-title2">
          <div>01/05</div>
          <div>
            <span class="icon-histogram"
              style="font-size:1rem;color:red;">
              <font style="font-size:0.68rem;color:black;">
                0%~10%收益
              </font>
            </span>
          </div>
          <div>
            <div class="icon-golds" style="font-size:1rem;">
              <font style="font-size:0.5rem;">
                12.00 元
              </font>
            </div>
          </div>
          <div class="icon-right2"></div>
        </div>
        <div class="item-inner item-title2">
          <div>30/04</div>
          <div>
            <span class="icon-histogram"
              style="font-size:1rem;color:red;">
              <font style="font-size:0.68rem;color:black;">
                10%~30%收益
              </font>
            </span>
          </div>
          <div>
            <div class="icon-golds" style="font-size:1rem;">
              <font style="font-size:0.5rem;">
                6.00 元
              </font>
            </div>
          </div>
          <div class="icon-wrong2"></div>
        </div>
      </li>
    </ul>
    <br>
  </div>
</div>
</template>

<script>
  import $ from 'zepto'
  export default {
    ready () {
      $.init()
    },
    data () {
      return {
        id: this.$route.params.id,
        itemInfo: '',
        banner: [],
        title: '方案详情',
        path: '/plan',
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
    }
  }
</script>
<style>
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
.color {
  background-color: #ed8e07;
}
.center2 {
  margin-left: auto;
  margin-right: auto;
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
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
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
