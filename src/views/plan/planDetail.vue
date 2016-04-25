<template>
<div class="content profile" transition="bounce">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/plan', replace: false}">
      <span class="icon icon-left"></span>
    </a>
    <h1 class="title">方案详情</h1>
  </header>
  <div class="list-block">
    <ul style="margin-top:.5rem;">
      <li>
        <div class="item-content">
          <div class="item-inner">
            <span>海苔  第280期</span>
            <span>本期为大家带来高赔收益单</span>
          </div>
        </div>
      </li>
      <li>
        <div class="item-content">
          <div class="item-inner">
            <span></span>
            <span>截止时间 <font color="red">23:59:59</font></span>
          </div>
        </div>
        <div class="item-content">
          <div class="item-inner">
            <span>
              <div>本期信心指数</div>
              <div>
                <img src="../../assets/img/专家方案/信心.png" height="14" width="16" class="text-center">
                <img src="../../assets/img/专家方案/信心.png" height="14" width="16" class="text-center">
                <img src="../../assets/img/专家方案/信心.png" height="14" width="16" class="text-center">
                <img src="../../assets/img/专家方案/信心.png" height="14" width="16" class="text-center">
                <img src="../../assets/img/专家方案/信心.png" height="14" width="16" class="text-center">
              </div>
            </span>
            <span><font color="red" size="10">12</font>元</span>
            <span>预期收益 <font size="5" color="red">72%</font></span>
          </div>
        </div>
      </li>
      <li style="background-color:red;color:white;">
        <div class="item-content">
          <div class="item-inner">
            <span></span>
            <span>购买人次1028 / 总销售额2871873.00</span>
            <span></span>
          </div>
        </div>
      </li>
      <li>
        <div class="item-link-sml item-content" @click="toggleClass()">
            <div class="item-inner">
                <div class="item-title label">方案内容</div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
          <div class="item-inner">
            方案内容方案内容方案内容方案内容方案内容方案
            内容方案内容方案内容方案内容方案内容方案内容
            方案内容方案内容方案内容
          </div>
        </div>
      </li>
      <li>
        <div class="item-link-sml item-content">
            <div class="item-inner">
                <div class="item-title label">专家信息</div>
            </div>
        </div>
      </li>
      <li>
        <div class="item-content">
          <div class="item-inner">
            这个是专家区域，这个是专家区域，这个是专家区域
            这个是专家区域，这个是专家区域，这个是专家区域
            这个是专家区域，这个是专家区域，这个是专家区域
            这个是专家区域，这个是专家区域，这个是专家区域
            这个是专家区域，这个是专家区域，这个是专家区域
            这个是专家区域，这个是专家区域，这个是专家区域
          </div>
        </div>
      </li>
    </ul>
  </div>

  <div class="toolBar">
    <div class="text-center">
      <img src="../../assets/img/专家方案/温馨提示.png" height="24" width="152" class="text-center">
    </div>
    <div class="text-center">
      <font size="2">合理稳健的利用您的财富,才能给您带来长久收益!</font>
    </div>

    <div class="submit-button" style="padding-bottom: -30px;">
      <button class="button button-big button-fill" @click="sortBy('123')">投注</button>
    </div>
  </div>
</div>
</template>

<script>
  import $ from 'zepto'
  export default {
    methods: {
      toggleClass: function () {
        console.log('331')
      },
      sortBy: function (key) {
        console.log($.actions)
        var buttons1 = [
          {
            text: '请选择',
            label: true
          },
          {
            text: '卖出',
            bold: true,
            color: 'danger'
            // ,onClick: function() {
            //   $.alert("你选择了“卖出“");
            // }
          },
          {
            text: '买入'
            // ,onClick: function() {
            //   $.alert("你选择了“买入“");
            // }
          }
        ]
        var buttons2 = [
          {
            text: '取消',
            bg: 'danger'
          }
        ]
        var groups = [buttons1, buttons2]
        $.actions(groups)
      }
    }
  }
</script>
<style>
.profile .list-block {
  margin: 2.4rem 0 1rem 0;
  font-size: .65rem;
  /*position:absolute;*/
  bottom:0px;
  left:0px;
  width:100%;
  height:100%;
  overflow:auto;
}
.profile .list-block .item-subtitle {
  font-size: .65rem;
}
.profile .list-block .item-input {
  margin-top: .06rem;
  margin-bottom: .06rem;
}
.profile .list-block input {
  font-size: .65rem;
}
.profile .list-block select {
  font-size: .65rem;
}
.profile .list-block textarea {
  font-size: .65rem;
}
.profile .list-block .item-title.label  {
  width: 30%;
}
.profile .submit-button {
  margin: 0 auto 2rem auto;
  width: 100%;
  padding: 0 .45rem;
}
.profile .submit-button button {
  background-color: #ed8e07;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.toolBar {
  /*position:absolute;*/
  bottom:0px;
  width:100%;
  text-align:center;
}
.item-link-sml {
  background-image: url('/img/箭头/向右icon.png');
  background-size: 0.7rem;
  background-repeat: no-repeat;
  background-position: 97% center;
  background-position: -webkit-calc(100% - .5rem) center;
  background-position: calc(100% - .5rem) center;
}
</style>
