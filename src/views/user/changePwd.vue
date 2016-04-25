<template>
<div class="content password" transition="expand">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user/setting', replace: false}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color" v-text="title"></h1>
  </header>
  <div class="content-block">
    <div class="password-input">
      <input type="text" placeholder="电话">
      <input type="text" placeholder="邮箱">
    </div>
  </div>
  <div class="submit-button">
    <button class="button button-big button-fill">提交</button>
  </div>
</div>
</template>

<script>
export default {
  ready () {
  },
  data () {
    return {
      title: '修改密码'
    }
  }
}
</script>

<style>
/* 必需 */
.expand-transition {
  transition: all .3s ease;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
/* .expand-enter 定义进入的开始状态 */
.expand-enter {
  /*height: 0;
  padding: 0 10px;
  opacity: 0;*/
  animation: bounce-in 2.5s;
}
/* .expand-leave 定义离开的结束状态 */
.expand-leave {
  /*height: 0;
  padding: 0 10px;
  opacity: 0;*/
  animation: bounce-in .5s;
}
.sub-title {
  margin-top: 2.2rem;
  background-color: white;
  height: 2.2rem;
  font-size: .8rem;
  font-weight: normal;
  line-height: 2.2rem;
  text-align: center;
  border-bottom: 1px solid #d8d8d9;
}
.password .content-block {
  margin: 3rem 0 0 0;
  padding: 0 .45rem;
}
.password-label {
  font-size: .7rem;
  line-height: 1.2rem;
}
.password-input input{
  width: 100%;
  height: 2.15rem;
  font-size: .7rem;
  padding: .4rem .5rem;
  background-color: #fff;
  margin-bottom: .3rem;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .2rem;
}
.password textarea {
  height: auto;
  resize: none;
  width: 100%;
  font-size: .7rem;
  -webkit-appearance: none;
  padding: .4rem .5rem;
  -webkit-user-select: text;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: .2rem;
  outline: 0;
}
.password .submit-button {
  margin-top: .8rem;
  width: 100%;
  padding: 0 .45rem;
}
.password .submit-button button {
  background-color: #ed8e07;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
</style>
