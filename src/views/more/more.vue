<template>
<div class="content more">
  <header class="bar bar-nav">
    <h1 class="title color">更多</h1>
  </header>
  <div class="list-block">
    <ul>
      <li class="item-content item-link">
        <div class="item-inner">
          <div class="item-title">分享</div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link">
        <div class="item-inner">
          <div class="item-title">使用教程</div>
        </div>
      </li>
    </ul>
    <br>
    <ul>
      <li class="item-content item-link" v-link="{ path: '/more/feedback', replace: true}">
        <div class="item-inner">
          <div class="item-title">意见反馈</div>
        </div>
      </li>
    </ul>
    <ul>
      <li class="item-content item-link" v-link="{ path: '/more/about', replace: true}">
        <div class="item-inner">
          <div class="item-title">关于</div>
        </div>
      </li>
    </ul>
    <br>
  </div>
</div>
</template>

<style lang="sass" scoped>
.list-block {
  margin: 2.75rem 0;
  height: 2.9rem;

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
</style>
