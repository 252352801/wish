// pages/home/home.js
const http = require('../../utils/http.js');
const createImageUrl = http.createImageUrl
const request = http.request
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tops:[],
    tabs: ['获得祝福', '获得红包'],
    tabIndex: 0,
  },
  changeTab: function(e) {
    console.log(e)
    this.setData({
      tabIndex: +e.target.dataset.tab
    })
    this.getTopData()
  },
  formatData(data){
    const fdata=[]
    if(data instanceof Array){
      data.forEach(ele=>{
        fdata.push({
          avatar: createImageUrl(ele.avatar_url),
          nickName: ele.nick_name,
          commentCount: +ele.bless_sum,
          coupon: +ele.hb_sum
        })
      })
    }
    return fdata
  },
  getTopData(){
    wx.showLoading({
      title: '加载中'
    })
    const tanIndex = this.data.tabIndex
    request({
      path: 'user/toplist',
      data: {
        type: tanIndex + ''
      },
      method: 'POST',
      success: (res) => {
        if (res.ok) {
          this.tops[tanIndex] = this.formatData(res.body.user_list)
          this.setData({
            tops: this.tops
          })
        }else{

        }
      },
      complete: (res)=> {
        wx.hideLoading()
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getTopData()
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
  getPushData: function(options) {}
})