webpackJsonp([12],{7:function(t,e){var a=t.exports={version:"1.2.6"};"number"==typeof __e&&(__e=a)},39:function(t,e,a){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.wxShareConfig=e.loader=e.hookTime=e.getDateDiff=void 0;var n=a(8),i=o(n),l=a(75),s=o(l);e.getDateDiff=function(t,e,a){t=t.replace(/\-/g,"/"),e=e.replace(/\-/g,"/"),a=a.toLowerCase();var o=new Date(t),n=new Date(e),i=1;switch(a){case"second":i=1e3;break;case"minute":i=6e4;break;case"hour":i=36e5;break;case"day":i=864e5}return parseInt((n.getTime()-o.getTime())/parseFloat(i,0),0)},e.hookTime=function(t,e){var a=new Date,o=a.getMinutes(),n=a.getSeconds(),i=a.getMilliseconds();console.log(t+" "+e+" "+o+"-"+n+"-"+i)},e.loader={show:function(){if(!(0,i["default"])(".ball-beat")[0]){var t=document.body;(0,i["default"])(t).append('<div class="loader-inner ball-beat"><div></div><div></div><div></div></div>')}},hide:function(){(0,i["default"])(".ball-beat").remove()}},e.wxShareConfig=function(t,e,a,o){var n=t.title,i=t.desc,l=t.link,r=t.imgUrl;console.log("wxShare Config"),s["default"].ready(function(){s["default"].onMenuShareAppMessage({title:n,desc:i,link:l,imgUrl:r,success:e,fail:a}),s["default"].onMenuShareTimeline({title:n,link:l,imgUrl:r,success:e,fail:a}),s["default"].onMenuShareQQ({title:n,desc:i,link:l,imgUrl:r,success:e,fail:a}),s["default"].onMenuShareWeibo({title:n,desc:i,link:l,imgUrl:r,success:e,fail:a}),s["default"].onMenuShareQZone({title:n,desc:i,link:l,imgUrl:r,success:e,fail:a})})}},40:function(t,e,a){t.exports={"default":a(41),__esModule:!0}},41:function(t,e,a){var o=a(7);t.exports=function(t){return(o.JSON&&o.JSON.stringify||JSON.stringify).apply(JSON,arguments)}},134:function(t,e,a){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(40),i=o(n),l=a(10),s=a(8),r=o(s);e["default"]={props:{amount:1,show:!1,plan:""},methods:{payPlan:function(t){var e=this;if(parseFloat(this.amount)<=0)return void r["default"].toast("请输入有效倍数");var a={pmp:this.amount,pid:t.plan_id},o=(0,i["default"])(a);r["default"].confirm("总计"+this.amount*t.plan_amount+"元,是否确认付款?","提示",function(){e.$http.post(l.planApi.buyPlan,o,{headers:{"x-token":window.localStorage.getItem("token")},emulateJSON:!0}).then(function(t){var a=t.data,o=a.code,n=a.msg,i=a.result;if(1===o)r["default"].toast("购买成功!"),e.$parent.closeModal();else if(2===o)r["default"].toast(n);else if(0===o){var l=i[0],s=l.expert_name?"专家["+l.expert_name+"],":""+l.msg;r["default"].toast(s)}})["catch"](function(t){r["default"].alert("服务器连接中断..."),console.error(t)})},function(){e.$parent.showPayBtn=!1})}}}},136:function(t,e,a){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(10),i=a(8),l=o(i);e["default"]={props:{amount:0,show:!1,plan:""},methods:{payReward:function(t){var e=this;l["default"].confirm("您要给["+t.expert_name+"]打赏</br>￥"+this.amount,"提示",function(){e.$http.post(n.planApi.doreward,{pid:t.plan_id,amount:e.amount},{headers:{"x-token":window.localStorage.getItem("token")},emulateJSON:!0}).then(function(t){var a=t.data,o=a.code,n=a.msg;1===o&&e.$parent.closeRewardBtn(),l["default"].toast(n),e.$parent.showRewardBtn=!1})["catch"](function(t){console.error("无法打赏:"+t)})},function(){e.$parent.showRewardBtn=!1})}}}},145:function(t,e,a){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(270),i=o(n),l=a(272),s=o(l),r=a(10),d=a(39),c=a(8),m=o(c);e["default"]={ready:function(){var t=this;m["default"].init(),this.$http.get(r.planApi.time,{},{headers:{"x-token":window.localStorage.getItem("token")},emulateJSON:!0}).then(function(e){var a=e.data,o=a.code,n=(a.msg,a.result);1===o&&t.$set("serviceTime",n)})["catch"](function(){console.error("无法连接服务器-获取服务器时间")}),this.loadPlan()},data:function(){return{id:this.$route.params.id,title:"方案详情",path:"/plan",attachInfo:"",certList:"",expertHistory:"",plan:"",summary:"",serviceTime:"",residualTime:"",showPayBtn:!1,showRewardBtn:!1,disabledPayBtn:!1,showImg:"true"===window.localStorage.getItem("imageSwitch"),userId:window.localStorage.getItem("user")?JSON.parse(window.localStorage.getItem("user")).user_id:null,loading:!1,pagenum:0}},methods:{showInfo:function(t,e){return"planContent"!==t||this.plan.plan_content?void("block"===document.getElementById(t).style.display?document.getElementById(t).style.display="none":document.getElementById(t).style.display="block"):void m["default"].toast("方案截止后，才可观看!")},closeModal:function(){this.showPayBtn=!1},popPay:function(){this.disabledPayBtn||(window.localStorage.getItem("user")?this.showPayBtn=!0:m["default"].toast("请登录后购买方案..."))},loadPlan:function(){var t=this;m["default"].showIndicator(),this.$http.post(r.planApi.detail,{pid:this.id},{headers:{"x-token":window.localStorage.getItem("token")},emulateJSON:!0}).then(function(e){var a=e.data,o=a.code,n=a.msg,i=a.result;if(1===o){t.$set("attachInfo",i.attachInfo),t.$set("certList",i.certList),t.$set("expertHistory",i.expertHistory),t.$set("plan",i.plan),t.$set("summary",i.summaryList[0]);var l=(0,d.getDateDiff)(t.serviceTime,i.plan.deallineTime,"minute");t.$set("residualTime",l>0?l+"分钟":"已截止"),0>l&&t.$set("disabledPayBtn",!0)}else m["default"].toast(n),console.error("获取方案明细失败:"+n)})["catch"](function(){console.error("无法连接服务器-获取方案明细")})["finally"](function(){m["default"].pullToRefreshDone(".pull-to-refresh-content"),m["default"].hideIndicator()})},reward:function(){this.showRewardBtn=!0},closeRewardBtn:function(){this.showRewardBtn=!1}},components:{VPlanPayButton:i["default"],VRewardButton:s["default"]}}},186:function(t,e,a){e=t.exports=a(3)(),e.push([t.id,".icon-left[_v-5208e70c]{width:1rem}.modal-button-sml[_v-5208e70c]{width:100%;padding:0 .25rem;height:2.2rem;font-size:.85rem;line-height:2.2rem;text-align:center;color:#0894ec;background:#e8e8e8;display:block;position:relative;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;cursor:pointer;box-sizing:border-box;-webkit-box-flex:1;-ms-flex:1}",""])},187:function(t,e,a){e=t.exports=a(3)(),e.push([t.id,".icon-left[_v-599550d6]{width:1rem}.rewardBackground[_v-599550d6]{border-radius:.35rem;background:url('/img/专家方案/打赏背景.png');background-size:100%}.amountbg[_v-599550d6]{background:url('/img/专家方案/打赏固定金额选中.png') no-repeat;background-size:100%}.sml-modal-button[_v-599550d6]{width:5.2rem;padding:0 .25rem;height:2.2rem;font-size:.85rem;line-height:1.6rem;text-align:center;display:block;position:relative;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;cursor:pointer;box-sizing:border-box;-webkit-box-flex:1;-ms-flex:1}.modal[_v-599550d6]{width:13.5rem;position:absolute;z-index:11000;left:50%;margin-left:-6.75rem;margin-top:0;top:50%;text-align:center;border-radius:.35rem;opacity:0;-webkit-transform:translateZ(0) scale(1.185);transform:translateZ(0) scale(1.185);-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;color:#3d4145;display:none}.modal.modal-in[_v-599550d6]{opacity:1;-webkit-transition-duration:.4s;transition-duration:.4s;-webkit-transform:translateZ(0) scale(1);transform:translateZ(0) scale(1)}.modal.modal-out[_v-599550d6]{opacity:0;z-index:10999;-webkit-transition-duration:.4s;transition-duration:.4s;-webkit-transform:translateZ(0) scale(.815);transform:translateZ(0) scale(.815)}.modal-title[_v-599550d6]{font-weight:500;font-size:.9rem;text-align:center}.modal-title+.modal-text[_v-599550d6]{margin-top:.25rem}.sml-modal-buttons[_v-599550d6]{height:2.2rem;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.modal-button[_v-599550d6]{width:100%;padding:0 .25rem;height:2.2rem;font-size:.85rem;line-height:2.2rem;text-align:center;display:block;position:relative;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;cursor:pointer;box-sizing:border-box;-webkit-box-flex:1;-ms-flex:1}@media only screen and (-webkit-min-device-pixel-ratio:2){.modal-button[_v-599550d6]:after{-webkit-transform:scaleY(.5);transform:scaleY(.5)}}@media only screen and (-webkit-min-device-pixel-ratio:3){.modal-button[_v-599550d6]:after{-webkit-transform:scaleY(.33);transform:scaleY(.33)}}.modal-button[_v-599550d6]:first-child{border-radius:0 0 0 .35rem}.modal-button[_v-599550d6]:last-child{border-radius:0 0 .35rem 0}.modal-button[_v-599550d6]:last-child:after{display:none}.modal-button[_v-599550d6]:first-child:last-child{border-radius:0 0 .35rem .35rem}.modal-button.modal-button-bold[_v-599550d6]{font-weight:500}.sml-actions-modal[_v-599550d6]{position:absolute;left:0;bottom:0;z-index:11000;width:100%;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}.sml-actions-modal.modal-in[_v-599550d6]{-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transform:translateZ(0);transform:translateZ(0)}.sml-actions-modal.modal-out[_v-599550d6]{z-index:10999;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}.sml-actions-modal-group[_v-599550d6]{margin:.4rem}.sml-actions-modal-button[_v-599550d6],.sml-actions-modal-label[_v-599550d6]{width:100%;text-align:center;font-weight:400;margin:0;box-sizing:border-box;display:block;position:relative}.sml-actions-modal-button[_v-599550d6]:after,.sml-actions-modal-label[_v-599550d6]:after{content:'';position:absolute;left:0;bottom:0;right:auto;top:auto;height:1px;width:100%;display:block;z-index:15;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}@media only screen and (-webkit-min-device-pixel-ratio:2){.sml-actions-modal-button[_v-599550d6]:after,.sml-actions-modal-label[_v-599550d6]:after{-webkit-transform:scaleY(.5);transform:scaleY(.5)}}@media only screen and (-webkit-min-device-pixel-ratio:3){.sml-actions-modal-button[_v-599550d6]:after,.sml-actions-modal-label[_v-599550d6]:after{-webkit-transform:scaleY(.33);transform:scaleY(.33)}}.sml-actions-modal-button a[_v-599550d6],.sml-actions-modal-label a[_v-599550d6]{text-decoration:none;color:inherit}.sml-actions-modal-button.sml-actions-modal-button-bold[_v-599550d6],.sml-actions-modal-button b[_v-599550d6],.sml-actions-modal-label.sml-actions-modal-button-bold[_v-599550d6],.sml-actions-modal-label b[_v-599550d6]{font-weight:500}.sml-actions-modal-button.color-danger[_v-599550d6],.sml-actions-modal-button.sml-actions-modal-button-danger[_v-599550d6],.sml-actions-modal-label.color-danger[_v-599550d6],.sml-actions-modal-label.sml-actions-modal-button-danger[_v-599550d6]{color:#f6383a}.sml-actions-modal-button.bg-danger[_v-599550d6],.sml-actions-modal-label.bg-danger[_v-599550d6]{background:#f5d996;color:red}.sml-actions-modal-button[_v-599550d6]:first-child,.sml-actions-modal-label[_v-599550d6]:first-child{border-radius:.2rem .2rem 0 0}.sml-actions-modal-button[_v-599550d6]:last-child,.sml-actions-modal-label[_v-599550d6]:last-child{border-radius:0 0 .2rem .2rem}.sml-actions-modal-button[_v-599550d6]:last-child:after,.sml-actions-modal-label[_v-599550d6]:last-child:after{display:none}.sml-actions-modal-button[_v-599550d6]:first-child:last-child,.sml-actions-modal-label[_v-599550d6]:first-child:last-child{border-radius:.2rem}.sml-actions-modal-button.disabled[_v-599550d6],.sml-actions-modal-label.disabled[_v-599550d6]{opacity:.95;color:#8e8e93}.sml-actions-modal-button[_v-599550d6]{cursor:pointer;line-height:2.15rem;font-size:1rem;color:#0894ec}.sml-actions-modal-label[_v-599550d6]{font-size:.7rem;line-height:1.3;min-height:2.2rem;padding:.4rem .5rem;color:#f5d996;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}",""])},192:function(t,e,a){e=t.exports=a(3)(),e.push([t.id,".list-block[_v-73f2110a]{margin:2.2rem 0;height:2.9rem;font-size:.74rem;ul{height:2.9rem}.item-content{margin-top:.7rem;height:inherit}}.headerColor[_v-73f2110a]{background-color:#ed8e07}.fafafa[_v-73f2110a]{background-color:#fafafa}.r04[_v-73f2110a]{margin-right:.4rem}.center2[_v-73f2110a]{margin-left:auto;margin-right:auto}.submit-button[_v-73f2110a]{width:100%;padding:0 .45rem}.submit-button button[_v-73f2110a]{background-color:red;width:100%;line-height:2.1rem!important;height:2.1rem!important}.toolBarDetail[_v-73f2110a]{position:absolute;bottom:.38rem;width:100%;text-align:center;background-color:#fff}.list-block .item-content2[_v-73f2110a]{box-sizing:border-box;min-height:2.2rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.list-block .item-title2[_v-73f2110a]{-ms-flex:0 1 auto;-webkit-flex-shrink:1;-ms-flex-negative:1;flex-shrink:1;position:relative;max-width:100%;padding-left:.4rem}.list-block .item-inner[_v-73f2110a]:before,.list-block ul[_v-73f2110a]:before{content:'';position:absolute;left:0;top:0;bottom:auto;right:auto;height:1px;width:100%;background-color:#e7e7e7;display:block;z-index:15;-webkit-transform-origin:50% 0;transform-origin:50% 0}.planContentTextArea[_v-73f2110a]{font-size:.58rem;margin-left:.4rem;width:100%;outline:0 none;border-color:rgba(82,168,236,.8);box-shadow:inset 0 1px 3px rgba(0,0,0,.1),0 0 8px rgba(82,168,236,.6)}",""])},218:function(t,e,a){var o=a(186);"string"==typeof o&&(o=[[t.id,o,""]]);a(4)(o,{});o.locals&&(t.exports=o.locals)},219:function(t,e,a){var o=a(187);"string"==typeof o&&(o=[[t.id,o,""]]);a(4)(o,{});o.locals&&(t.exports=o.locals)},224:function(t,e,a){var o=a(192);"string"==typeof o&&(o=[[t.id,o,""]]);a(4)(o,{});o.locals&&(t.exports=o.locals)},258:function(t,e){t.exports='<div :class="[\'actions-modal\', show ? \'modal-in\' : \'modal-out\']" @click=$event.stopPropagation() _v-5208e70c=""> <div class=actions-modal-group _v-5208e70c=""> <span class=actions-modal-label _v-5208e70c="">请选择倍数</span> <span class="actions-modal-button actions-modal-button-bold" _v-5208e70c=""> <div class=modal-buttons _v-5208e70c=""> <span class=modal-button-sml @click="this.amount=5" :style="(this.amount===5?\'color:#f6383a\':\'\')" _v-5208e70c="">5</span> <span class=modal-button-sml @click="this.amount=10" :style="(this.amount===10?\'color:#f6383a\':\'\')" _v-5208e70c="">10</span> <span class=modal-button-sml @click="this.amount=20" :style="(this.amount===20?\'color:#f6383a\':\'\')" _v-5208e70c="">20</span> <span class=modal-button-sml @click="this.amount=50" :style="(this.amount===50?\'color:#f6383a\':\'\')" _v-5208e70c="">50</span> <span class=modal-button-sml @click="this.amount=100" :style="(this.amount===100?\'color:#f6383a\':\'\')" _v-5208e70c="">100</span> </div> </span> <span class=actions-modal-button _v-5208e70c=""> <div class=modal-buttons _v-5208e70c=""> <span class=modal-button-sml @click="this.amount<2?1:this.amount-=1" style=width:20%;font-size:2rem;color:#000 _v-5208e70c="">-</span> <span class=modal-button-sml style=width:60% _v-5208e70c=""> <input v-model=amount type=number min=1 max=9999 style=ime-mode:disabled;height:1.8rem;width:100%;text-align:center;color:#f6383a onkeypress="(event.keyCode<48||event.keyCode>57)&&(event.returnValue=!1)" onkeyup=\'this.value=this.value.replace(/\\D/g,"")\' _v-5208e70c=""> </span> <span class=modal-button-sml @click="this.amount+=1" style=width:20%;font-size:1.4rem;color:#000 _v-5208e70c="">+</span> </div> </span> <span class=actions-modal-label _v-5208e70c=""> 需&nbsp;<font style=color:#f6383a _v-5208e70c="">{{amount*plan.plan_amount}}</font>&nbsp;元 </span> </div> <div class=actions-modal-group _v-5208e70c=""> <span class="actions-modal-button bg-danger" @click=payPlan(this.plan) _v-5208e70c="">确认</span> </div> </div>'},259:function(t,e){t.exports='<div :class="[\'sml-actions-modal\', show ? \'modal-in\' : \'modal-out\']" @click=$event.stopPropagation() _v-599550d6=""> <div class="sml-actions-modal-group rewardBackground" _v-599550d6=""> <span class=sml-actions-modal-label _v-599550d6=""></span> <span class="sml-actions-modal-button sml-actions-modal-button-bold" _v-599550d6=""> <div class=sml-modal-buttons _v-599550d6=""> <span @click="this.amount=8.8" :class="[\'sml-modal-button\', amount===8.8 ? \'amountbg\' : \'\']" :style="amount===8.8 ? \'color:red\':\'color:#f5d996\'" _v-599550d6=""> 8.8 </span> <span @click="this.amount=18.8" :class="[\'sml-modal-button\', amount===18.8 ? \'amountbg\' : \'\']" :style="amount===18.8 ? \'color:red\':\'color:#f5d996\'" _v-599550d6=""> 18.8 </span> <span @click="this.amount=88.8" :class="[\'sml-modal-button\', amount===88.8 ? \'amountbg\' : \'\']" :style="amount===88.8 ? \'color:red\':\'color:#f5d996\'" _v-599550d6=""> 88.8 </span> </div> </span> <span class=sml-actions-modal-button _v-599550d6=""> <div class=sml-modal-buttons _v-599550d6=""> <span class=sml-modal-button @click="this.amount<9?8.8:this.amount=parseFloat(this.amount)-1" style=width:20%;font-size:2.2rem;color:#f5d996 _v-599550d6="">-</span> <span class=sml-modal-button style=width:60% _v-599550d6=""> <input v-model=amount readonly=true type=text style=height:1.8rem;width:100%;text-align:center;color:red _v-599550d6=""> </span> <span class=sml-modal-button @click="this.amount=parseFloat(this.amount)+1" style=width:20%;font-size:1.6rem;color:#f5d996 _v-599550d6="">+</span> </div> </span> <span class=sml-actions-modal-label _v-599550d6=""> 赏&nbsp;<font style=color:#f5d996 _v-599550d6="">{{amount}}</font>&nbsp;元 </span> </div> <div class=sml-actions-modal-group _v-599550d6=""> <span class="sml-actions-modal-button bg-danger" @click=payReward(this.plan) _v-599550d6="">打赏</span> </div> </div>'},264:function(t,e){t.exports='<div class=content transition=bounce style=margin-bottom:1.8rem _v-73f2110a=""> <header class="bar bar-nav" _v-73f2110a=""> <a class="button button-link button-nav pull-left back" @click=this.$root.back() _v-73f2110a=""> <span class="icon icon-left" _v-73f2110a=""></span> </a> <a class="icon pull-right" @click=reward() _v-73f2110a=""> <img src=/img/专家方案/打赏按钮.png width=30 height=30 _v-73f2110a=""> </a> <h1 class="title headerColor" _v-73f2110a="">方案详情</h1> </header> <div class=list-block _v-73f2110a=""> <ul style=background-image:url(/img/专家方案/头像背景.png) _v-73f2110a=""> <li class=item-content _v-73f2110a=""> <div style=width:100% _v-73f2110a=""> <span style=margin-left:-.4rem _v-73f2110a=""> 信心指数 <img v-if="plan.planConfident===-1 || plan.planConfident>0" src=/img/专家方案/信心.png width=12 height=12 _v-73f2110a=""> <img v-if="plan.planConfident===-1 || plan.planConfident>1" src=/img/专家方案/信心.png width=12 height=12 style=margin-left:-.1rem _v-73f2110a=""> <img v-if="plan.planConfident===-1 || plan.planConfident>2" src=/img/专家方案/信心.png width=12 height=12 style=margin-left:-.1rem _v-73f2110a=""> <img v-if="plan.planConfident>3" style=margin-left:-.1rem src=/img/专家方案/信心.png width=12 height=12 _v-73f2110a=""> <img v-if="plan.planConfident>4" style=margin-left:-.1rem src=/img/专家方案/信心.png width=12 height=12 _v-73f2110a=""> </span> <span class="pull-right r04" _v-73f2110a=""> 剩余购买时间:{{residualTime}} </span> </div> </li> <li class=item-content _v-73f2110a=""> <div class=center2 _v-73f2110a=""> <img :src=plan.expert_photo class=img-responsive width=64 height=68 _v-73f2110a=""> </div> </li> <li class=item-content style=margin-top:-.6rem _v-73f2110a=""> <div class=center2 _v-73f2110a=""> {{plan.expert_name}} <font style=font-size:.6rem _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="">[{{plan.plan_name}}]<font _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a=""> </font></font></div><font style=font-size:.6rem _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a=""><font _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a=""> </font></font></li><font style=font-size:.6rem _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a=""><font _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a=""> <li class=item-content style=margin-top:-.8rem _v-73f2110a=""> <div class=pull-left style=margin-left:-.4rem _v-73f2110a=""> 方案数:{{summary.planTotalNum}} </div> <div class=center2 _v-73f2110a=""> 胜率:{{parseInt(summary.winrate*100, 0)}}% </div> <div class="pull-right r04" _v-73f2110a=""> 奖金:{{summary.totalProfit}} </div> </li> <li class=item-content v-if=!plan.plan_content style=margin-top:-.6rem;background-color:#3c3d42 _v-73f2110a=""> <div style=width:180% _v-73f2110a=""> <span class=icon-histogram style=font-size:1rem;color:red _v-73f2110a=""> <font style=font-size:.68rem;color:#fff _v-73f2110a=""> {{plan.range_name}} </font> </span> <span class="pull-right icon-piechart r04" style=font-size:1rem;color:red _v-73f2110a=""> <font style=font-size:.68rem;color:#FFF v-if="plan.range_salelimit>0" _v-73f2110a=""> 限购剩余 {{plan.range_salelimit}} 元 </font> <font style=font-size:.68rem;color:#FFF v-else="" _v-73f2110a=""> 不限购 </font> </span> </div> </li> </font></font></ul><font style=font-size:.6rem _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a=""><font _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a=""> <ul _v-73f2110a=""> <li class="item-content2 item-link" @click="showInfo(\'planContent\',$event)" _v-73f2110a=""> <div class=item-inner _v-73f2110a=""> <div class=item-title2 _v-73f2110a=""> 方案内容 <font style=font-size:.48rem;color:gray _v-73f2110a=""> (销售截止后才可查看) </font> </div> </div> </li> <li id=planContent class="item-content2 fafafa" style=display:none _v-73f2110a=""> <div class=item-inner _v-73f2110a=""> <textarea readonly=readonly class=planContentTextArea _v-73f2110a="">{{{plan.plan_content}}}</textarea> </div> </li> </ul> <ul _v-73f2110a=""> <li class="item-content2 item-link" @click="showInfo(\'expertDesc\',$event)" _v-73f2110a=""> <div class=item-inner _v-73f2110a=""> <div class=item-title2 _v-73f2110a="">专家简介</div> </div> </li> <li class="item-content2 fafafa" id=expertDesc style=display:none _v-73f2110a=""> <div class=item-inner _v-73f2110a=""> <div class=item-title2 style=font-size:.58rem;margin-left:.4rem _v-73f2110a=""> {{attachInfo.expertIntro}} </div> </div> </li> </ul> <ul _v-73f2110a=""> <li class="item-content2 item-link" @click="showInfo(\'expertHistory\',$event)" _v-73f2110a=""> <div class=item-inner _v-73f2110a=""> <div class=item-title2 _v-73f2110a="">专家战绩</div> </div> </li> <li class=item-content2 id=expertHistory style=display:block;font-size:.6rem _v-73f2110a=""> <div v-for="h in expertHistory | orderBy \'plan_status\' -1" class="item-inner item-title2 fafafa" :style="(h.planResult!==\'胜\'?\'\':\'color:#FF2D2D\')" _v-73f2110a=""> <div _v-73f2110a=""> {{h.effective_time.substr(5, 5)}} </div> <div _v-73f2110a=""> <span class=icon-histogram _v-73f2110a=""> {{h.rangeName}} </span> </div> <div _v-73f2110a=""> <div class=icon-golds _v-73f2110a=""> {{h.plan_amount}}.00元 </div> </div> <div :class="h.planResult===\'胜\'?\'icon-right2\':(h.planResult===\'负\'?\'icon-wrong2\':\'icon-cancel2\')" _v-73f2110a=""></div> </div> </li> </ul> <br _v-73f2110a=""> </font></font></div><font style=font-size:.6rem _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a=""><font _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a=""> </font></font></div><font style=font-size:.6rem _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a=""><font _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a="" _v-73f2110a=""> <div class=toolBarDetail _v-73f2110a=""> <div class=submit-button _v-73f2110a=""> <button v-show=!showPayBtn class="button button-big button-fill" :class="disabledPayBtn?\'disabled\':\'\'" @click=popPay() _v-73f2110a="">购买服务</button> </div> </div> <div :class="[\'modal-overlay\', showPayBtn ? \'modal-overlay-visible\' : \'\']" v-on:click=closeModal _v-73f2110a=""> <v-plan-pay-button :amount=1 :title=title :show=showPayBtn :plan=plan _v-73f2110a=""></v-plan-pay-button> </div> <div :class="[\'modal-overlay\', showRewardBtn ? \'modal-overlay-visible\' : \'\']" v-on:click=closeRewardBtn _v-73f2110a=""> <v-reward-button :amount=8.8 :title=title :show=showRewardBtn :plan=plan _v-73f2110a=""></v-reward-button> </div> </font></font>'},270:function(t,e,a){var o,n;a(218),o=a(134),n=a(258),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)},272:function(t,e,a){var o,n;a(219),o=a(136),n=a(259),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)},282:function(t,e,a){var o,n;a(224),o=a(145),n=a(264),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}});