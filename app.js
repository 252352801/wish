//app.js
var request = require('./utils/http.js').request;
var filter=require('./utils/filters.js');
App({
  onLaunch: function () {
  },
  onShow: function () {
    
  },
  listeners: [
    /*{
      name:'',//事件名
      handler:function(e){//处理函数
        
      }
    }*/
  ],
  addListener: function (eventName, handler) {
    if (! typeof handler==='function'){
      return;
    }
    var listeners = this.listeners;
    var exist=false;
    if (listeners instanceof Array) {
      for (let o of listeners) {
        if (o && typeof o === 'object' && o.name === eventName) {
          exist=true;
          if (!(o.handler instanceof Array)) {
            o.handler = [];
          }
          o.handler.push(handler);
        }
      }
    }else{
      this.listeners=[];
    }
    if (!exist){
      this.listeners.push({
        name: eventName,
        handler: [handler]
      });
    }
  },
  trigger: function (eventName,...arg) {
    var listeners = this.listeners;
    if (listeners instanceof Array) {
      for (let o of listeners) {
        if (o && typeof o === 'object' && o.name === eventName) {
          if (o.handler instanceof Array) {
            for (let fn of o.handler){
              fn.call(fn, ...arg);
            }
          }
        }
      }
    }
  },
  globalData: {
    userInfo: null
  },

 /**
 * 检测是否是新用户
 */
  checkIsNewUser:function(){
      return new Promise((resolve,reject)=>{
        request({
          path:'member/isNew',
          method: 'POST',
          success: (res)=>{
          var isnewuser=false;
           var response = filter.filterResponse(res);
           console.log('checkIsNewUser',response);
           if (response.ok && response.body && typeof response.body === 'object' && response.body.isNew){
             isnewuser=true;
           }
           resolve(isnewuser);
          },
          fail: (res)=> {
            reject(res);
          }
        })
      })
  }
})