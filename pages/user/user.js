// pages/user/user.js
const http = require('../../utils/http.js');
const createUrl = http.createUrl
const request = http.request 
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:0,
    userInfo: {

    }
  },

  go(e) {
    wx.navigateTo({
      url: e.target.dataset.link,
    })
  },
  userInfoHandler(res){
    if (res.detail.userInfo){
      app.shouldUpdateUserInfo()
      this.setData({
        userInfo: res.detail.userInfo
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
        if (res.userInfo) {
          this.setData({
            userInfo: res.userInfo
          })
        }
      },
      fail: (res) => {
        console.log(res)
      }
    })
    request({
      path: 'user/info',
      method: 'POST',
      success: (res)=> {
        console.log(res)
        if(res.ok){
          this.setData({
            balance: res.body.money
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})