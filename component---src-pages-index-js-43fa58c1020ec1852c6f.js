"use strict";(self.webpackChunkgum_test=self.webpackChunkgum_test||[]).push([[678],{957:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});var i=n(294),o=(n.p,n.p+"static/img10-f-651f5d532c0dcd9c7764a17e17895bcd.png"),c=640/480,l=function(){var e=(0,i.useRef)(),t=(0,i.useRef)(),n=(0,i.useState)(void 0),l=n[0],r=n[1],a=(0,i.useState)(void 0),u=a[0],s=a[1],d=(0,i.useCallback)((function(){e.current.pause();var n=window.getComputedStyle(e.current),i=parseFloat(n.width),o=parseFloat(n.height),l=e.current,r=l.videoWidth,a=l.videoHeight,u=o/i,s=u>c?[i,i*c]:[o/c,o],d=a/r>u?r/i:a/o,f=s[0]*d,p=s[1]*d,g=(r-f)/2,h=(a-p)/2;t.current.getContext("2d").drawImage(e.current,g,h,f,p,0,0,480,640),t.current.toBlob((function(t){console.log("takePhoto blob",t),e.current.play()}))}),[e.current,t.current]),f=(0,i.useCallback)((function(){e.current.pause(),e.current.srcObject=null,s(!u)}),[u]);return(0,i.useEffect)((function(){var e=navigator.mediaDevices.getSupportedConstraints().facingMode;r(Boolean(e))}),[]),(0,i.useEffect)((function(){"boolean"==typeof l&&s(!l)}),[l]),(0,i.useEffect)((function(){"boolean"==typeof u&&navigator.mediaDevices.getUserMedia({video:{facingMode:u?"user":"environment"},audio:!1}).then((function(t){e.current.srcObject=t})).catch((function(e){console.error(e)}))}),[u]),i.createElement("div",null,i.createElement("video",{ref:function(t){return e.current=t},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"block",objectFit:"cover"},autoPlay:!0,playsInline:!0,muted:!0}),i.createElement("canvas",{ref:function(e){return t.current=e},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"block",objectFit:"contain"},width:480,height:640}),i.createElement("img",{src:o,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"block",objectFit:"contain"},alt:"Frame image"}),i.createElement("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",flexDirection:"column",justifyContent:"space-between"}},i.createElement("div",{style:{height:80,display:"flex",justifyContent:"flex-end",alignItems:"center",padding:20}},l&&i.createElement("button",{onClick:f},"SWITCH FACING")),i.createElement("div",{style:{height:120,display:"flex",alignItems:"center",padding:20}},i.createElement("div",{style:{flex:1}}),i.createElement("div",null,i.createElement("button",{onClick:d},"SHOOT")),i.createElement("div",{style:{flex:1}}))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-43fa58c1020ec1852c6f.js.map