webpackJsonp([10],{1:function(t,e){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},3:function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var n=r(20),i=o(n);e["default"]=function(t,e,r){return e in t?(0,i["default"])(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}},4:function(t,e,r){var o,n;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
!function(){"use strict";function r(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var n=typeof o;if("string"===n||"number"===n)t.push(o);else if(Array.isArray(o))t.push(r.apply(null,o));else if("object"===n)for(var s in o)i.call(o,s)&&o[s]&&t.push(s)}}return t.join(" ")}var i={}.hasOwnProperty;"undefined"!=typeof t&&t.exports?t.exports=r:(o=[],n=function(){return r}.apply(e,o),!(void 0!==n&&(t.exports=n)))}()},20:function(t,e,r){t.exports={"default":r(21),__esModule:!0}},21:function(t,e,r){var o=r(1);t.exports=function(t,e,r){return o.setDesc(t,e,r)}},68:function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var n=r(3),i=o(n),s=r(4),a=o(s);e["default"]={props:{type:{type:String,"default":""},className:""},computed:{classes:function(){var t;return(0,a["default"])((t={},(0,i["default"])(t,this.className,!!this.className),(0,i["default"])(t,"content-"+this.type,!!this.type),t))}}}},74:function(t,e){t.exports="<div :class=classes> <slot></slot> </div>"},78:function(t,e,r){var o,n;o=r(68),n=r(74),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)},127:function(t,e){t.exports={L:1,M:0,Q:3,H:2}},128:function(t,e,r){function o(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var o=0;o<t.length-r;o++)this.num[o]=t[o+r]}var n=r(129);o.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var i=0;i<t.getLength();i++)e[r+i]^=n.gexp(n.glog(this.get(r))+n.glog(t.get(i)));return new o(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=n.glog(this.get(0))-n.glog(t.get(0)),r=new Array(this.getLength()),i=0;i<this.getLength();i++)r[i]=this.get(i);for(var i=0;i<t.getLength();i++)r[i]^=n.gexp(n.glog(t.get(i))+e);return new o(r,0).mod(t)}},t.exports=o},129:function(t,e){for(var r={glog:function(t){if(1>t)throw new Error("glog("+t+")");return r.LOG_TABLE[t]},gexp:function(t){for(;0>t;)t+=255;for(;t>=256;)t-=255;return r.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},o=0;8>o;o++)r.EXP_TABLE[o]=1<<o;for(var o=8;256>o;o++)r.EXP_TABLE[o]=r.EXP_TABLE[o-4]^r.EXP_TABLE[o-5]^r.EXP_TABLE[o-6]^r.EXP_TABLE[o-8];for(var o=0;255>o;o++)r.LOG_TABLE[r.EXP_TABLE[o]]=o;t.exports=r},130:function(t,e){t.exports={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}},134:function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function n(t){return t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1}Object.defineProperty(e,"__esModule",{value:!0});var i=r(223),s=o(i);e["default"]={props:{val:{type:String,required:!0},size:{type:Number,"default":100},level:String,bgColor:{type:String,"default":"#FFFFFF"},fgColor:{type:String,"default":"#000000"}},watch:{size:function(){this.update()},val:function(){this.update()},level:function(){this.update()},bgColor:function(){this.update()},fgColor:function(){this.update()}},ready:function(){this.update()},methods:{update:function(){var t=this.size,e=this.bgColor,r=this.fgColor,o=this.$els.qr,i=(0,s["default"])(this.val),a=o.getContext("2d"),u=i.modules,l=t/u.length,h=t/u.length,f=(window.devicePixelRatio||1)/n(a);o.height=o.width=t*f,a.scale(f,f),u.forEach(function(t,o){t.forEach(function(t,n){a.fillStyle=t?r:e;var i=Math.ceil((n+1)*l)-Math.floor(n*l),s=Math.ceil((o+1)*h)-Math.floor(o*h);a.fillRect(Math.round(n*l),Math.round(o*h),i,s)})})}}}},158:function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var n=r(78),i=o(n),s=r(262),a=o(s),u=r(12),l=r(9),h=o(l);e["default"]={ready:function(){var t=this;this.$http.post(u.userApi.qrcode,{},{headers:{"x-token":window.localStorage.getItem("token")},emulateJSON:!0}).then(function(e){var r=e.data,o=r.code,n=r.msg,i=r.result;1===o?t.$set("qrUrl",i):h["default"].toast(n)})["catch"](function(t){console.error("获取用户二维码失败:"+t)})},data:function(){return{title:"我的二维码",qrUrl:"",bgColor:"#FFFFFF",fgColor:"#000000",size:260}},components:{VContent:i["default"],VQrcode:a["default"]},methods:{saveAsLocalImage:function(){var t=document.getElementById("qrCanvas"),e=t.toDataURL("image/png").replace("image/png","image/octet-stream");window.location.href=e}}}},164:function(t,e,r){e=t.exports=r(5)(),e.push([t.id,"",""])},190:function(t,e,r){e=t.exports=r(5)(),e.push([t.id,".qrcode .content-padded[_v-96787510]{margin:2.2rem 0 0;height:100%;padding:.4rem}.invite-card[_v-96787510]{padding:.1rem}.invite-card .invite-card-content[_v-96787510]{width:100%;height:380.2666429px;border:1px solid #b2b2b2;border-radius:8px;background-color:#fff;padding-top:.4rem}.color[_v-96787510]{background-color:#ed8e07}.download-button[_v-96787510]{display:none;margin-top:.8rem;width:100%;padding:0 .45rem}.download-button button[_v-96787510]{background-color:#ed8e07;width:100%;line-height:2.1rem!important;height:2.1rem!important}",""])},192:function(t,e,r){var o=r(164);"string"==typeof o&&(o=[[t.id,o,""]]);r(6)(o,{});o.locals&&(t.exports=o.locals)},221:function(t,e,r){var o=r(190);"string"==typeof o&&(o=[[t.id,o,""]]);r(6)(o,{});o.locals&&(t.exports=o.locals)},223:function(t,e,r){var o=r(226),n=r(127),i=function(t,e){e=e||{};var r=new o(e.typeNumber||-1,e.errorCorrectLevel||n.H);return r.addData(t),r.make(),r};i.ErrorCorrectLevel=n,t.exports=i},224:function(t,e,r){function o(t){this.mode=n.MODE_8BIT_BYTE,this.data=t}var n=r(130);o.prototype={getLength:function(t){return this.data.length},write:function(t){for(var e=0;e<this.data.length;e++)t.put(this.data.charCodeAt(e),8)}},t.exports=o},225:function(t,e){function r(){this.buffer=new Array,this.length=0}r.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;e>r;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t.exports=r},226:function(t,e,r){function o(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var n=r(224),i=r(227),s=r(225),a=r(228),u=r(128),l=o.prototype;l.addData=function(t){var e=new n(t);this.dataList.push(e),this.dataCache=null},l.isDark=function(t,e){if(0>t||this.moduleCount<=t||0>e||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},l.getModuleCount=function(){return this.moduleCount},l.make=function(){if(this.typeNumber<1){var t=1;for(t=1;40>t;t++){for(var e=i.getRSBlocks(t,this.errorCorrectLevel),r=new s,o=0,n=0;n<e.length;n++)o+=e[n].dataCount;for(var n=0;n<this.dataList.length;n++){var u=this.dataList[n];r.put(u.mode,4),r.put(u.getLength(),a.getLengthInBits(u.mode,t)),u.write(r)}if(r.getLengthInBits()<=8*o)break}this.typeNumber=t}this.makeImpl(!1,this.getBestMaskPattern())},l.makeImpl=function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++)this.modules[r][n]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=o.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},l.setupPositionProbePattern=function(t,e){for(var r=-1;7>=r;r++)if(!(-1>=t+r||this.moduleCount<=t+r))for(var o=-1;7>=o;o++)-1>=e+o||this.moduleCount<=e+o||(r>=0&&6>=r&&(0==o||6==o)||o>=0&&6>=o&&(0==r||6==r)||r>=2&&4>=r&&o>=2&&4>=o?this.modules[t+r][e+o]=!0:this.modules[t+r][e+o]=!1)},l.getBestMaskPattern=function(){for(var t=0,e=0,r=0;8>r;r++){this.makeImpl(!0,r);var o=a.getLostPoint(this);(0==r||t>o)&&(t=o,e=r)}return e},l.createMovieClip=function(t,e,r){var o=t.createEmptyMovieClip(e,r),n=1;this.make();for(var i=0;i<this.modules.length;i++)for(var s=i*n,a=0;a<this.modules[i].length;a++){var u=a*n,l=this.modules[i][a];l&&(o.beginFill(0,100),o.moveTo(u,s),o.lineTo(u+n,s),o.lineTo(u+n,s+n),o.lineTo(u,s+n),o.endFill())}return o},l.setupTimingPattern=function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},l.setupPositionAdjustPattern=function(){for(var t=a.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var o=t[e],n=t[r];if(null==this.modules[o][n])for(var i=-2;2>=i;i++)for(var s=-2;2>=s;s++)-2==i||2==i||-2==s||2==s||0==i&&0==s?this.modules[o+i][n+s]=!0:this.modules[o+i][n+s]=!1}},l.setupTypeNumber=function(t){for(var e=a.getBCHTypeNumber(this.typeNumber),r=0;18>r;r++){var o=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=o}for(var r=0;18>r;r++){var o=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=o}},l.setupTypeInfo=function(t,e){for(var r=this.errorCorrectLevel<<3|e,o=a.getBCHTypeInfo(r),n=0;15>n;n++){var i=!t&&1==(o>>n&1);6>n?this.modules[n][8]=i:8>n?this.modules[n+1][8]=i:this.modules[this.moduleCount-15+n][8]=i}for(var n=0;15>n;n++){var i=!t&&1==(o>>n&1);8>n?this.modules[8][this.moduleCount-n-1]=i:9>n?this.modules[8][15-n-1+1]=i:this.modules[8][15-n-1]=i}this.modules[this.moduleCount-8][8]=!t},l.mapData=function(t,e){for(var r=-1,o=this.moduleCount-1,n=7,i=0,s=this.moduleCount-1;s>0;s-=2)for(6==s&&s--;;){for(var u=0;2>u;u++)if(null==this.modules[o][s-u]){var l=!1;i<t.length&&(l=1==(t[i]>>>n&1));var h=a.getMask(e,o,s-u);h&&(l=!l),this.modules[o][s-u]=l,n--,-1==n&&(i++,n=7)}if(o+=r,0>o||this.moduleCount<=o){o-=r,r=-r;break}}},o.PAD0=236,o.PAD1=17,o.createData=function(t,e,r){for(var n=i.getRSBlocks(t,e),u=new s,l=0;l<r.length;l++){var h=r[l];u.put(h.mode,4),u.put(h.getLength(),a.getLengthInBits(h.mode,t)),h.write(u)}for(var f=0,l=0;l<n.length;l++)f+=n[l].dataCount;if(u.getLengthInBits()>8*f)throw new Error("code length overflow. ("+u.getLengthInBits()+">"+8*f+")");for(u.getLengthInBits()+4<=8*f&&u.put(0,4);u.getLengthInBits()%8!=0;)u.putBit(!1);for(;;){if(u.getLengthInBits()>=8*f)break;if(u.put(o.PAD0,8),u.getLengthInBits()>=8*f)break;u.put(o.PAD1,8)}return o.createBytes(u,n)},o.createBytes=function(t,e){for(var r=0,o=0,n=0,i=new Array(e.length),s=new Array(e.length),l=0;l<e.length;l++){var h=e[l].dataCount,f=e[l].totalCount-h;o=Math.max(o,h),n=Math.max(n,f),i[l]=new Array(h);for(var c=0;c<i[l].length;c++)i[l][c]=255&t.buffer[c+r];r+=h;var d=a.getErrorCorrectPolynomial(f),g=new u(i[l],d.getLength()-1),p=g.mod(d);s[l]=new Array(d.getLength()-1);for(var c=0;c<s[l].length;c++){var v=c+p.getLength()-s[l].length;s[l][c]=v>=0?p.get(v):0}}for(var m=0,c=0;c<e.length;c++)m+=e[c].totalCount;for(var _=new Array(m),E=0,c=0;o>c;c++)for(var l=0;l<e.length;l++)c<i[l].length&&(_[E++]=i[l][c]);for(var c=0;n>c;c++)for(var l=0;l<e.length;l++)c<s[l].length&&(_[E++]=s[l][c]);return _},t.exports=o},227:function(t,e,r){function o(t,e){this.totalCount=t,this.dataCount=e}var n=r(127);o.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],o.getRSBlocks=function(t,e){var r=o.getRsBlockTable(t,e);if(void 0==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var n=r.length/3,i=new Array,s=0;n>s;s++)for(var a=r[3*s+0],u=r[3*s+1],l=r[3*s+2],h=0;a>h;h++)i.push(new o(u,l));return i},o.getRsBlockTable=function(t,e){switch(e){case n.L:return o.RS_BLOCK_TABLE[4*(t-1)+0];case n.M:return o.RS_BLOCK_TABLE[4*(t-1)+1];case n.Q:return o.RS_BLOCK_TABLE[4*(t-1)+2];case n.H:return o.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},t.exports=o},228:function(t,e,r){var o=r(130),n=r(128),i=r(129),s={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},a={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;a.getBCHDigit(e)-a.getBCHDigit(a.G15)>=0;)e^=a.G15<<a.getBCHDigit(e)-a.getBCHDigit(a.G15);return(t<<10|e)^a.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;a.getBCHDigit(e)-a.getBCHDigit(a.G18)>=0;)e^=a.G18<<a.getBCHDigit(e)-a.getBCHDigit(a.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return a.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case s.PATTERN000:return(e+r)%2==0;case s.PATTERN001:return e%2==0;case s.PATTERN010:return r%3==0;case s.PATTERN011:return(e+r)%3==0;case s.PATTERN100:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case s.PATTERN101:return e*r%2+e*r%3==0;case s.PATTERN110:return(e*r%2+e*r%3)%2==0;case s.PATTERN111:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new n([1],0),r=0;t>r;r++)e=e.multiply(new n([1,i.gexp(r)],0));return e},getLengthInBits:function(t,e){if(e>=1&&10>e)switch(t){case o.MODE_NUMBER:return 10;case o.MODE_ALPHA_NUM:return 9;case o.MODE_8BIT_BYTE:return 8;case o.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(27>e)switch(t){case o.MODE_NUMBER:return 12;case o.MODE_ALPHA_NUM:return 11;case o.MODE_8BIT_BYTE:return 16;case o.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(41>e))throw new Error("type:"+e);switch(t){case o.MODE_NUMBER:return 14;case o.MODE_ALPHA_NUM:return 13;case o.MODE_8BIT_BYTE:return 16;case o.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,o=0;e>o;o++)for(var n=0;e>n;n++){for(var i=0,s=t.isDark(o,n),a=-1;1>=a;a++)if(!(0>o+a||o+a>=e))for(var u=-1;1>=u;u++)0>n+u||n+u>=e||0==a&&0==u||s==t.isDark(o+a,n+u)&&i++;i>5&&(r+=3+i-5)}for(var o=0;e-1>o;o++)for(var n=0;e-1>n;n++){var l=0;t.isDark(o,n)&&l++,t.isDark(o+1,n)&&l++,t.isDark(o,n+1)&&l++,t.isDark(o+1,n+1)&&l++,0!=l&&4!=l||(r+=3)}for(var o=0;e>o;o++)for(var n=0;e-6>n;n++)t.isDark(o,n)&&!t.isDark(o,n+1)&&t.isDark(o,n+2)&&t.isDark(o,n+3)&&t.isDark(o,n+4)&&!t.isDark(o,n+5)&&t.isDark(o,n+6)&&(r+=40);for(var n=0;e>n;n++)for(var o=0;e-6>o;o++)t.isDark(o,n)&&!t.isDark(o+1,n)&&t.isDark(o+2,n)&&t.isDark(o+3,n)&&t.isDark(o+4,n)&&!t.isDark(o+5,n)&&t.isDark(o+6,n)&&(r+=40);for(var h=0,n=0;e>n;n++)for(var o=0;e>o;o++)t.isDark(o,n)&&h++;var f=Math.abs(100*h/e/e-50)/5;return r+=10*f}};t.exports=a},230:function(t,e){t.exports="<div> <canvas id=qrCanvas :style=\"{height:size + 'px',width: size + 'px'}\" height={{size}} width={{size}} v-el:qr></canvas> </div>"},259:function(t,e){t.exports='<div class="content qrcode" transition=bounce _v-96787510=""> <header class="bar bar-nav" _v-96787510=""> <a class="button button-link button-nav pull-left" v-link="{path: \'/user\', replace: true}" _v-96787510=""> <span class="icon icon-left" _v-96787510=""></span> </a> <h1 class="title color" v-text=title _v-96787510=""></h1> </header> <div class=content-padded style=background:#fff _v-96787510=""> <p class=color-gray _v-96787510=""></p> <v-content type=block _v-96787510=""> <div class=invite-card v-if=qrUrl _v-96787510=""> <div class=invite-card-content style=height:100% _v-96787510=""> <v-qrcode id=canvas :val=qrUrl style=margin-left:1.6rem :size=size :bg-color=bgColor :fg-color=fgColor level=L _v-96787510=""></v-qrcode> </div> </div> </v-content> <div class=download-button _v-96787510=""> <button class="button button-big button-fill" @click=saveAsLocalImage() _v-96787510=""> <span class="icon icon-download" _v-96787510=""></span> </button> </div> </div> </div>'},262:function(t,e,r){var o,n;r(192),o=r(134),n=r(230),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)},287:function(t,e,r){var o,n;r(221),o=r(158),n=r(259),t.exports=o||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}});