!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";var e=io(),t=function(e){var t=document.getElementById("state-text"),n=document.getElementById("send-state"),o=document.getElementById("states"),l=document.getElementById("username"),a=document.getElementById("change-username"),i=document.getElementById("all-states"),d=document.getElementById("login"),c=document.getElementById("wall"),s=document.getElementById("user"),u=document.getElementById("password"),m=document.getElementById("do-login");c.style.display="none",n.addEventListener("click",(function(){console.log("sendState",t.value),t.value.length>0&&e.emit("sendState",t.value)})),m.addEventListener("click",(function(){s.value.length>0&&u.value.length>0&&e.emit("doLogin",{user:s.value,password:u.value})})),a.addEventListener("click",(function(){console.log(l.value),e.emit("change_username",{username:l.value})}));return{updateClientData:function(e){console.log(2,e)},sendLike:function(t){var n={message:t};e.emit("sendLike",n)},sendDelete:function(t,n){var o={id:t,text:n};console.log(o),e.emit("deleteMsg",o)},states:o,allStates:i,wall:c,loginForm:d}}(e);window.ui=t,function(e,t){e.on("broadcastState",(function(e){t.states.innerHTML="",e.forEach((function(e){t.states.innerHTML+="\n        <div>\n          <p>".concat(e.username," - ").concat(e.text,"</p>\n          <p>likes ").concat(e.likes,"</p>\n          <button onClick=\"window.ui.sendLike('").concat(e.text,"')\">Like</button>\n           <button onClick=\"window.ui.sendDelete('").concat(e.id,"', '").concat(e.text,"')\">Delete</button>\n        </div>\n      ")}))})),e.on("successLogin",(function(e){t.updateClientData(e),t.loginForm.style.display="none",t.wall.style.display="block"}))}(e,t)}));
