//app.js
var request = require('./utils/http.js').request;
import {
  user
} from './utils/user.js'
App({
  onLaunch: function() {
    this.testIsLogin()
  },
  onShow: function() {},
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
        if (!wx.getStorageSync('token')) {
          user.login(request)
        }
      },
      fail: res => {
        console.log(12)
        //session无效
        user.login(request)
      }
    })
  },
  shouldUpdateUserInfo(nickName, avatar) {
    //如果当前用户头像和昵称和参获取的不一样，更新头像和昵称
    //继续往下操作
    return new Promise((resolve, reject) => {
      if (user.avatar !== avatar || user.nickName !== nickName) {
        request({
          path: 'user/upload',
          data: {
            avatar_url: avatar,
            nick_name: nickName
          },
          method: 'POSt',
          success: function(res) {
            if (res.ok) {
              user.nickName = nickName
              user.avatar = avatar
              resolve()
            } else {
              reject('更新用户信息失败！')
            }
          },
          fail: function(res) {
            reject('更新用户信息失败！')
          }
        })
      } else {
        resolve()
      }
    })
  },
  showMsg({
    title,
    content,
    showCancel,
    confirmText,
    cancelText
  }) {
    return new Promise((resolve, reject) => {
      const opt = {
        title,
        showCancel: showCancel || false,
        confirmText: confirmText || '好的',
        cancelText: cancelText || '取消',
        content,
        confirmColor: '#D7625D',
        success: (res) => {
          if (res.confirm) {
            resolve(true)
          } else if (res.cancel) {
            resolve(false)
          }
        }
      }
      wx.showModal(opt)
   })
  },
})