(this.webpackJsonpletwalk_cms=this.webpackJsonpletwalk_cms||[]).push([[0],{102:function(e,t,a){},109:function(e,t,a){},110:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(9),l=a.n(s),r=(a(102),a(50)),c=a(185),i=a(194),m=a(187),u=a(186),g=a(188),h=a(166),p=a(24),f=a(190),d=a(167),E=a(189),b=a(168),v=a(86),k=a.n(v),I=a(26),w=a(27),C=a(32),y=a(30),O=a(162),S=a(71),x=a(112),j=a(169),A=(o.a.Component,a(192)),R=a(37),D=function(e){Object(C.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(I.a)(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={roomInfo:[],userInfo:[],message:[],open:!1},e}return Object(w.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.setState({open:!0}),fetch("https://us-central1-letswalk-c0e21.cloudfunctions.net/GetAllRoomInfo").then((function(e){return e.json()})).then((function(t){e.setState({roomInfo:JSON.parse(t).room,userInfo:JSON.parse(t).users}),console.log(e.state.roomInfo),console.log(e.state.userInfo),e.setState({open:!1})})).catch(console.log)}},{key:"render",value:function(){var e=[];if(0!==this.state.roomInfo.length)for(var t=this.state.roomInfo.length,a=0;a<t;a++)e.push(o.a.createElement(O.a,{item:!0,xs:3},o.a.createElement(S.a,null,o.a.createElement(h.a,null,o.a.createElement(d.a,{button:!0,component:R.b,to:{pathname:"/teaminfo",state:{roomId:this.state.roomInfo[a].id,userInfo:this.state.userInfo,user1:this.state.roomInfo[a].user[0],user2:this.state.roomInfo[a].user[1]}}},o.a.createElement(b.a,null,this.state.userInfo[this.state.roomInfo[a].user[0]]," & ",this.state.userInfo[this.state.roomInfo[a].user[1]]),1===this.state.roomInfo[a].active?o.a.createElement(b.a,{style:{backgroundColor:"#37ABA2",textAlign:"center",color:"#FFFFFF"}},"\u7d44\u968a\u4e2d"):o.a.createElement(b.a,{style:{backgroundColor:"#FF5151",textAlign:"center",color:"#FFFFFF"}},"\u5df2\u89e3\u9664"))))));return o.a.createElement("div",null,o.a.createElement(O.a,{container:!0,spacing:5},o.a.createElement(O.a,{item:!0,xs:12},o.a.createElement(A.a,{"aria-label":"breadcrumb"},o.a.createElement(p.a,{color:"textPrimary"},"\u968a\u4f0d\u5217\u8868"))),o.a.createElement(O.a,{item:!0,xs:12},o.a.createElement(O.a,{container:!0,spacing:3},e))),o.a.createElement(x.a,{style:{color:"#fff"},open:this.state.open},o.a.createElement(j.a,{color:"inherit"})))}}]),a}(o.a.Component),L=a(173),U=a(175),F=a(170),N=a(174),B=a(171),J=a(4),T=a(176),M=a(85),P=a.n(M),z=a(84),G=a.n(z),W=a(191),_=a(177),H=a(181),Y=a(179),K=a(180),Q=a(178),V=a(172),X=a(83),$=a.n(X),q=a(60),Z=a.n(q);a(111);Z.a.initializeApp({apiKey:"AIzaSyAnETEp2XQVFv2NdfhDrURjFYTvod3Yv3I",authDomain:"letswalk-c0e21.firebaseapp.com",databaseURL:"https://letswalk-c0e21.firebaseio.com",projectId:"letswalk-c0e21",storageBucket:"letswalk-c0e21.appspot.com",messagingSenderId:"1007650815035",appId:"1:1007650815035:web:d468a7a5d95c4941b1301e"});var ee=Z.a.storage(),te={padding:"50px"},ae=Object(J.a)((function(e){return{head:{backgroundColor:"#37ABA2",color:e.palette.common.white},body:{fontSize:14}}}))(F.a),ne=function(e){Object(C.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(I.a)(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={roomId:"",roomInfo:[],userInfo:[],message:[],messageDate:[],stepInfo:[],user1:"",user2:"",open:!1,photo:!1,content:"",progressOpen:!1,imageList:[]},e.handleClickOpen=function(){e.setState({open:!0})},e.handleClickOpen1=function(){e.setState({photo:!0})},e.handleClickClose=function(){e.setState({open:!1})},e.handleClickClose1=function(){e.setState({photo:!1})},e.handleClose=function(){e.setState({open:!1,progressOpen:!0}),console.log(e.state.content),console.log("\u4e0a\u50b3");var t=new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/SendContentToRoom"),a={room:e.state.roomId,content:e.state.content,kind:"text"};Object.keys(a).forEach((function(e){return t.searchParams.append(e,a[e])})),fetch(t).then((function(e){return e.json()})).then((function(t){console.log(t),console.log("\u4e0b\u8f09");var a=new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/GetRoomInfo"),n={room:e.state.roomId};Object.keys(n).forEach((function(e){return a.searchParams.append(e,n[e])})),fetch(a).then((function(e){return e.json()})).then((function(t){e.setState({message:JSON.parse(t).message,stepInfo:JSON.parse(t).stepData[0],progressOpen:!1}),console.log(e.state.stepInfo)})).catch(console.log)})).catch(console.log)},e.handleFireBaseUpload=function(e){e.preventDefault()},e.handleClose1=function(){e.setState({photo:!1,progressOpen:!0}),console.log(e.state.imageList[0]),console.log("start of upload");var t,a=new Date;t=a.getFullYear()+(a.getMonth()<10?"0":"")+(a.getMonth()+1)+(a.getDate()<10?"0":"")+a.getDate()+"_"+(a.getHours()<10?"0":"")+a.getHours()+(a.getMinutes()<10?"0":"")+a.getMinutes()+(a.getSeconds()<10?"0":"")+a.getSeconds(),console.log(t),ee.ref("/").child(t+".jpg").put(e.dataURItoBlob(e.state.imageList[0].dataURL)).on("state_changed",(function(e){}),(function(e){console.log(e)}),(function(){ee.ref("/").child(t).getDownloadURL().then((function(e){}));var a=new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/SendContentToRoom"),n={room:e.state.roomId,content:t,kind:"photo"};Object.keys(n).forEach((function(e){return a.searchParams.append(e,n[e])})),fetch(a).then((function(e){return e.json()})).then((function(t){console.log(t),console.log("\u4e0b\u8f09");var a=new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/GetRoomInfo"),n={room:e.state.roomId};Object.keys(n).forEach((function(e){return a.searchParams.append(e,n[e])})),fetch(a).then((function(e){return e.json()})).then((function(t){e.setState({messageDate:JSON.parse(t).messageDate,message:JSON.parse(t).message,stepInfo:JSON.parse(t).stepData[0],progressOpen:!1}),console.log("testtesttest"),console.log(e.state.stepInfo),console.log(e.state.message)})).catch(console.log)})).catch(console.log)}))},e.downloadImg=function(e){console.log(e),ee.ref("/").child(e).getDownloadURL().then((function(e){return console.log(e),e}))},e.handleChange=function(t){e.setState({content:t.target.value})},e.onChange=function(t){console.log(t),e.setState({imageList:t})},e.download=function(){var t="";t+="Data,StepGoal,TotalStep,"+e.state.userInfo[e.state.user1]+","+e.state.userInfo[e.state.user2]+"\r\n";for(var a=0,n=Object.entries(e.state.stepInfo);a<n.length;a++){var o=Object(r.a)(n[a],2),s=o[0],l=o[1];t+=s+","+l.TotalStep+","+l.teamStep+","+l[e.state.user1]+","+l[e.state.user2]+"\r\n"}console.log("\u5132\u5b58\u6b65\u6578\u8cc7\u8a0a");var c=document.createElement("a"),i=new Blob([t]);c.href=URL.createObjectURL(i),c.download="step("+e.state.userInfo[e.state.user1]+"-"+e.state.userInfo[e.state.user2]+").csv",document.body.appendChild(c),c.click();var m="";m+="sender,message\r\n",console.log(e.state.message.length);for(var u=0;u<e.state.message.length;u++)"admin"===e.state.message[u].sender?"photo"===e.state.message[u].kind?m+=e.state.messageDate[u]+", admin,https://firebasestorage.googleapis.com/v0/b/letswalk-c0e21.appspot.com/o/"+e.state.message[u].message+"?alt=media&token=3b51c748-a011-4403-87f8-8ed3e5db0149\r\n":m+=e.state.messageDate[u]+", admin,"+e.state.message[u].message+"\r\n":"photo"===e.state.message[u].kind?m+=e.state.messageDate[u]+", "+e.state.userInfo[e.state.message[u].sender]+", https://firebasestorage.googleapis.com/v0/b/letswalk-c0e21.appspot.com/o/"+e.state.message[u].message+"?alt=media&token=3b51c748-a011-4403-87f8-8ed3e5db0149\r\n":m+=e.state.messageDate[u]+", "+e.state.userInfo[e.state.message[u].sender]+","+e.state.message[u].message+"\r\n",console.log(m);console.log(m),console.log("\u5132\u5b58\u804a\u5929\u5ba4\u5167\u5bb9");var g=document.createElement("a"),h=new Blob([m]);g.href=URL.createObjectURL(h),g.download="chat("+e.state.userInfo[e.state.user1]+"-"+e.state.userInfo[e.state.user2]+").csv",document.body.appendChild(g),g.click()},e}return Object(w.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.location.state.roomId,a=this.props.location.state.userInfo,n=this.props.location.state.user1,o=this.props.location.state.user2;this.setState({roomId:t,userInfo:a,user1:n,user2:o,progressOpen:!0}),console.log(t),console.log(a),console.log("\u4e0b\u8f09");var s=new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/GetRoomInfo"),l={room:t};Object.keys(l).forEach((function(e){return s.searchParams.append(e,l[e])})),fetch(s).then((function(e){return e.json()})).then((function(t){e.setState({message:JSON.parse(t).message,messageDate:JSON.parse(t).messageDate,stepInfo:JSON.parse(t).stepData[0],progressOpen:!1}),console.log(e.state.message),console.log(e.state.stepInfo),console.log(e.state.messageDate)})).catch(console.log)}},{key:"dataURItoBlob",value:function(e){var t;t=e.split(",")[0].indexOf("base64")>=0?atob(e.split(",")[1]):unescape(e.split(",")[1]);for(var a=e.split(",")[0].split(":")[1].split(";")[0],n=new Uint8Array(t.length),o=0;o<t.length;o++)n[o]=t.charCodeAt(o);return new Blob([n],{type:a})}},{key:"render",value:function(){for(var e=this,t=[],a=0,n=Object.entries(this.state.stepInfo);a<n.length;a++){var s=Object(r.a)(n[a],2),l=s[0],c=s[1];console.log(l,c),t.push(o.a.createElement(B.a,null,o.a.createElement(ae,{align:"center"},l),o.a.createElement(ae,{align:"center"},c.TotalStep),o.a.createElement(ae,{align:"center"},c.teamStep),o.a.createElement(ae,{align:"center"},c[this.state.user1]),o.a.createElement(ae,{align:"center"},c[this.state.user2])))}return console.log(t),o.a.createElement("div",null,o.a.createElement(O.a,{container:!0,spacing:5},o.a.createElement(O.a,{item:!0,xs:10},o.a.createElement(A.a,{"aria-label":"breadcrumb"},o.a.createElement(p.a,{component:R.b,color:"inherit",to:"/teamlist"},"\u968a\u4f0d\u5217\u8868"),o.a.createElement(p.a,{color:"textPrimary"},"\u968a\u4f0d\u8cc7\u8a0a( ",this.state.userInfo[this.state.user1]," - ",this.state.userInfo[this.state.user2],")"))),o.a.createElement(O.a,{item:!0,xs:2},o.a.createElement(V.a,{variant:"contained",onClick:this.download,color:"primary",style:{align:"right",backgroundColor:"#37ABA2"}},"\u5132\u5b58\u6a94\u6848")),o.a.createElement(O.a,{item:!0,xs:6},o.a.createElement(L.a,{style:te},o.a.createElement(N.a,null,o.a.createElement(B.a,null,o.a.createElement(ae,{align:"center"},"Date"),o.a.createElement(ae,{align:"center"},"Step Goal"),o.a.createElement(ae,{align:"center"},"total steps"),o.a.createElement(ae,{align:"center"},this.state.userInfo[this.state.user1],"'s steps"),o.a.createElement(ae,{align:"center"},this.state.userInfo[this.state.user2],"'s steps"))),o.a.createElement(U.a,null,t))),o.a.createElement(O.a,{item:!0,xs:6},o.a.createElement(S.a,{style:{maxHeight:450,overflow:"auto"}},o.a.createElement(h.a,null,this.state.message.map((function(t,a,n){return o.a.createElement(d.a,null,"photo"===e.state.message[a].kind&&o.a.createElement(b.a,null,o.a.createElement(O.a,{container:!0},o.a.createElement(O.a,{item:!0,xs:6},"admin"===e.state.message[a].sender&&o.a.createElement(O.a,{item:!0,xs:6},"admin ",o.a.createElement("img",{src:"https://firebasestorage.googleapis.com/v0/b/letswalk-c0e21.appspot.com/o/"+e.state.message[a].content+".jpg?alt=media&token=3b51c748-a011-4403-87f8-8ed3e5db0149",width:"200",height:"200"})),"admin"!==e.state.message[a].sender&&o.a.createElement(O.a,{item:!0,xs:6},e.state.userInfo[e.state.message[a].sender]," ",o.a.createElement("img",{src:"https://firebasestorage.googleapis.com/v0/b/letswalk-c0e21.appspot.com/o/"+e.state.message[a].content+".jpg?alt=media&token=3b51c748-a011-4403-87f8-8ed3e5db0149",width:"200",height:"200"}))),o.a.createElement(O.a,{item:!0,xs:6,align:"right"},e.state.messageDate[a]))),"photo"!==e.state.message[a].kind&&o.a.createElement(b.a,null,o.a.createElement(O.a,{container:!0},o.a.createElement(O.a,{item:!0,xs:6},"admin"===e.state.message[a].sender&&o.a.createElement(O.a,{item:!0,xs:6},"admin : ",e.state.message[a].content),"admin"!==e.state.message[a].sender&&o.a.createElement(O.a,{item:!0,xs:6},e.state.userInfo[e.state.message[a].sender]," : ",e.state.message[a].content)),o.a.createElement(O.a,{item:!0,xs:6,align:"right"},e.state.messageDate[a]))))})))),o.a.createElement(T.a,{color:"primary","aria-label":"text",onClick:this.handleClickOpen,style:{backgroundColor:"#37ABA2",right:"20px",bottom:"10px",left:"auto",position:"absolute"}},o.a.createElement(G.a,null)),o.a.createElement(T.a,{color:"primary","aria-label":"photo",onClick:this.handleClickOpen1,style:{backgroundColor:"#37ABA2",right:"100px",bottom:"10px",left:"auto",position:"absolute"}},o.a.createElement(P.a,null)),o.a.createElement(_.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"form-dialog-title"},o.a.createElement(Q.a,{id:"form-dialog-title"},"Let's Walk"),o.a.createElement(Y.a,null,o.a.createElement(K.a,null,"\u50b3\u9001\u8a0a\u606f\u81f3\u804a\u5929\u5ba4"),o.a.createElement(W.a,{autoFocus:!0,margin:"dense",value:this.state.content,onChange:this.handleChange,label:"\u8981\u8aaa\u7684\u8a71...",fullWidth:!0})),o.a.createElement(H.a,null,o.a.createElement(V.a,{onClick:this.handleClickClose,color:"primary"},"\u53d6\u6d88"),o.a.createElement(V.a,{onClick:this.handleClose,color:"primary"},"\u78ba\u8a8d"))),o.a.createElement(_.a,{open:this.state.photo,"aria-labelledby":"form-dialog-title"},o.a.createElement(Q.a,{id:"form-dialog-title"},"Let's Walk"),o.a.createElement(Y.a,null,o.a.createElement(K.a,null,"\u50b3\u9001\u7167\u7247\u81f3\u804a\u5929\u5ba4"),o.a.createElement($.a,{onChange:this.onChange,maxNumber:1,multiple:!0,maxFileSize:5242880,acceptType:["jpg","gif","png"]},(function(e){var t=e.imageList,a=e.onImageUpload;e.onImageRemoveAll;return o.a.createElement("div",null,o.a.createElement("button",{onClick:a},"Upload images"),t.map((function(e){return o.a.createElement("div",{key:e.key},o.a.createElement("img",{src:e.dataURL,width:"400",height:"400"}),o.a.createElement("button",{onClick:e.onRemove},"Remove"))})))}))),o.a.createElement(H.a,null,o.a.createElement(V.a,{onClick:this.handleClickClose1,color:"primary"},"\u53d6\u6d88"),o.a.createElement(V.a,{onClick:this.handleClose1,color:"primary"},"\u78ba\u8a8d"))))),o.a.createElement(x.a,{style:{color:"#fff"},open:this.state.open},o.a.createElement(j.a,{color:"inherit"})))}}]),a}(o.a.Component),oe=a(184),se=a(193),le=a(182),re=a(183),ce=function(e){Object(C.a)(a,e);var t=Object(y.a)(a);function a(){var e;Object(I.a)(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={userinfo:[],left:[],right:[],message:""},e.handleToggle=function(t,a){return function(){var n=e.state.left,o=e.state.right;if("left"===a){var s=e.state.left.indexOf(t);n.splice(s,1),o.push(t)}else{var l=e.state.right.indexOf(t);o.splice(l,1),n.push(t)}e.setState({right:o,left:n})}},e.handleAllRight=function(){var t=e.state.right.concat(e.state.left);e.setState({right:t,left:[]})},e.handleAllLeft=function(){var t=e.state.left.concat(e.state.right);e.setState({right:[],left:t})},e.sendMessage=function(){for(var t=e.state.right,a=[],n=e.state.message,o=0;o<t.length;o++)a.push(e.state.userinfo.userinfo[t[o]].fcmtoken);console.log(a),console.log(n);var s=new URL("https://us-central1-letswalk-c0e21.cloudfunctions.net/SendToClient"),l={users:a,message:n};Object.keys(l).forEach((function(e){return s.searchParams.append(e,l[e])})),fetch(s).then((function(e){return e.json()})).then((function(e){console.log(e)})).catch(console.log)},e}return Object(w.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("https://us-central1-letswalk-c0e21.cloudfunctions.net/GetAllUserInfo").then((function(e){return e.json()})).then((function(t){e.setState({userinfo:JSON.parse(t)}),console.log(e.state.userinfo.userinfo);var a=[];for(var n in e.state.userinfo.userinfo)a.push(n);e.setState({left:a})})).catch(console.log)}},{key:"render",value:function(){var e=this;return o.a.createElement(O.a,{container:!0,spacing:1,justify:"center",alignItems:"center"},o.a.createElement(O.a,{item:!0,xs:2},o.a.createElement(le.a,{style:{width:200,height:600,overflow:"auto"}},o.a.createElement(re.a,{title:"\u5c1a\u672a\u9078\u64c7"}),this.state.left.map((function(t){return o.a.createElement(h.a,null,o.a.createElement(d.a,{button:!0,onClick:e.handleToggle(t,"left")},o.a.createElement(oe.a,null,o.a.createElement(se.a,null)),o.a.createElement(b.a,null,e.state.userinfo.userinfo[t].name)))})))),o.a.createElement(O.a,{item:!0,xs:1},o.a.createElement(O.a,{container:!0,direction:"column",alignItems:"center"},o.a.createElement(V.a,{variant:"outlined",size:"small",onClick:this.handleAllRight},"\u226b"),o.a.createElement(V.a,{variant:"outlined",size:"small",onClick:this.handleAllLeft},"\u226a"))),o.a.createElement(O.a,{item:!0,xs:2},o.a.createElement(le.a,{style:{width:200,height:600,overflow:"auto"}},o.a.createElement(re.a,{title:"\u5df2\u9078\u64c7"}),this.state.right.map((function(t){return o.a.createElement(h.a,null,o.a.createElement(d.a,{button:!0,onClick:e.handleToggle(t,"right")},o.a.createElement(oe.a,null,o.a.createElement(se.a,null)),o.a.createElement(b.a,null,e.state.userinfo.userinfo[t].name)))})))),o.a.createElement(O.a,{item:!0,xs:2}),o.a.createElement(O.a,{item:!0,xs:5},o.a.createElement("div",{align:"center"},o.a.createElement(W.a,{style:{width:400},multiline:!0,rows:"10",variant:"outlined",value:this.state.message,onChange:function(t){return e.setState({message:t.target.value})}})),o.a.createElement("p",null),o.a.createElement("div",{align:"center"},o.a.createElement(V.a,{variant:"contained",color:"primary",onClick:this.sendMessage},"Send notification"))))}}]),a}(o.a.Component),ie=a(11),me=Object(c.a)((function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,backgroundColor:"#37ABA2"},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},content:{flexGrow:1,padding:e.spacing(3)},toolbar:e.mixins.toolbar}}));function ue(){var e=me(),t=o.a.useState(1),a=Object(r.a)(t,2),n=a[0],s=a[1];return o.a.createElement("div",{className:e.root},o.a.createElement(R.a,null,o.a.createElement(u.a,null),o.a.createElement(m.a,{position:"fixed",className:e.appBar},o.a.createElement(g.a,null,o.a.createElement(p.a,{variant:"h6",noWrap:!0},"Walking Talking CMS"))),o.a.createElement(i.a,{className:e.drawer,variant:"permanent",classes:{paper:e.drawerPaper}},o.a.createElement("div",{className:e.toolbar}),o.a.createElement(h.a,null,o.a.createElement(d.a,{button:!0,selected:1===n,onClick:function(e){s(1)},component:R.b,to:"/teamlist"},o.a.createElement(E.a,null,o.a.createElement(k.a,null)),o.a.createElement(b.a,null,"\u7d44\u968a\u5217\u8868")),o.a.createElement(f.a,null),o.a.createElement(f.a,null))),o.a.createElement("main",{className:e.content},o.a.createElement("div",{className:e.toolbar}),o.a.createElement("div",null,o.a.createElement(ie.a,{exact:!0,path:"/",component:D}),o.a.createElement(ie.a,{path:"/teamlist",component:D}),o.a.createElement(ie.a,{path:"/teaminfo",component:ne}),o.a.createElement(ie.a,{path:"/notification",component:ce})))))}a(109);var ge=function(){return o.a.createElement(ue,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(ge,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},97:function(e,t,a){e.exports=a(110)}},[[97,1,2]]]);
//# sourceMappingURL=main.4a7819ea.chunk.js.map