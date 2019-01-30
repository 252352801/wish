//app.js
var request = require('./utils/http.js').request;
import {user} from './utils/user.js'
App({
  onLaunch: function() {
    this.testIsLogin()
  },
  onShow: function() {
  },
  listeners: [
    /*{
      name:'',//事件名
      handler:function(e){//处理函数
        
      }
    }*/
  ],
  addListener: function(eventName, handler) {
    if (!typeof handler === 'function') {
      return;
    }
    var listeners = this.listeners;
    var exist = false;
    if (listeners instanceof Array) {
      for (let o of listeners) {
        if (o && typeof o === 'object' && o.name === eventName) {
          exist = true;
          if (!(o.handler instanceof Array)) {
            o.handler = [];
          }
          o.handler.push(handler);
        }
      }
    } else {
      this.listeners = [];
    }
    if (!exist) {
      this.listeners.push({
        name: eventName,
        handler: [handler]
      });
    }
  },
  trigger: function(eventName, ...arg) {
    var listeners = this.listeners;
    if (listeners instanceof Array) {
      for (let o of listeners) {
        if (o && typeof o === 'object' && o.name === eventName) {
          if (o.handler instanceof Array) {
            for (let fn of o.handler) {
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

  testIsLogin: function() {
    wx.checkSession({
      success: res => {
        //session有效单无token
        if (!wx.getStorageSync('token')){
          user.login(request)
        }
      },
      fail: res => {
        console.log(12)
       //session无效
        user.login(request)
      }  
    })
  }
})