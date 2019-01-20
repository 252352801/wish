// pages/home/home.js
var http = require('../../utils/http.js');
var request = http.request;
var filter = require('../../utils/filters.js');
//var lostSigninIntercept = require('../../utils/signin.interceptor.js').lostSigninIntercept;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      avatar: '/assets/img/background/home_banner.png',
      nickname: '下次我请',
      moments: 1000
    }, {
      avatar: '/assets/img/background/home_banner.png',
      nickname: '下次我请',
      moments: 1000
    }, {
      avatar: '/assets/img/background/home_banner.png',
      nickname: '下次我请',
      moments: 1000
    }, {
      avatar: '/assets/img/background/home_banner.png',
      nickname: '下次我请',
      moments: 1000
    }, {
      avatar: '/assets/img/background/home_banner.png',
      nickname: '下次我请',
      moments: 1000
    }, {
      avatar: '/assets/img/background/home_banner.png',
      nickname: '下次我请',
      moments: 1000
    }, {
      avatar: '/assets/img/background/home_banner.png',
      nickname: '下次我请',
      moments: 1000
    }, {
      avatar: '/assets/img/background/home_banner.png',
      nickname: '下次我请',
      moments: 1000
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    console.log('下拉刷新...');
    wx.showNavigationBarLoading();
    this.getPushData({
      before: () => {
        wx.showNavigationBarLoading();
      },
      complete: () => {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
      }
    });
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

  },

  /**
   * 获取推荐数据
   */
  getPushData: function(options) {

  }
})