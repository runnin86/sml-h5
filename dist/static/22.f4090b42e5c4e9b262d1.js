webpackJsonp([22],{129:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var o=i(104),s=i(18),n=a(s);t["default"]={route:{data:function(e){var t=(e.to,e.next);t()}},ready:function(){for(var e=0;15>e;e++)this.items.push({id:e,name:"demo"+(e+1)})},data:function(){return{items:[],loading:!1}},computed:{length:function(){return this.items.length}},methods:{loadMore:function(){var e=this;if(!this.loading){this.loading=!0;var t=(0,n["default"])(".list");o.loader.show(),setTimeout(function(){var i=e.length;e.items.push({id:i,name:"demo"+(i+1)});var a=t[0].scrollHeight-t.height()-20;t.scrollTop(a),e.loading=!1,o.loader.hide()},1500)}}}}},174:function(e,t,i){t=e.exports=i(5)(),t.push([e.id,".list-block[_v-3e343aae]{margin:.5rem 0}.list[_v-3e343aae]{bottom:2.5rem;padding-bottom:1rem}",""])},199:function(e,t,i){var a=i(174);"string"==typeof a&&(a=[[e.id,a,""]]);i(6)(a,{});a.locals&&(e.exports=a.locals)},229:function(e,t){e.exports='<div class=container _v-3e343aae=""> <nav class="bar bar-nav" _v-3e343aae=""> <h1 class=title _v-3e343aae="">滚动加载更多</h1> </nav> <div class="content list" v-infinite-scroll=loadMore _v-3e343aae=""> <div class="list-block infinite-list" _v-3e343aae=""> <ul _v-3e343aae=""> <li class=item-content v-for="item in items" track-by=$index _v-3e343aae=""> <div class=item-media _v-3e343aae=""><i class="icon icon-dianji" _v-3e343aae=""></i></div> <div class=item-inner _v-3e343aae=""> <div class=item-title _v-3e343aae="">商品名称</div> <div class=item-after _v-3e343aae="">{{item.name}}</div> </div> </li> </ul> </div> </div> </div>'},235:function(e,t,i){var a,o;i(199),a=i(129),o=i(229),e.exports=a||{},e.exports.__esModule&&(e.exports=e.exports["default"]),o&&(("function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports).template=o)}});