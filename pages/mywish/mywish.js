// pages/mywish/mywish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      text: '待提醒愿望'
    }, {
      text: '已提醒愿望'
    }],
    tabIndex: 0,
    list: [{
      remindTime: '2019/04/01 12:00',
      title: '我的2019愿望',
      image: '',
      content: '我要脱单脱单脱单脱单啊啊啊啊啊啊啊啊',
      praise: 700
    }, {
      remindTime: '2019/04/01 12:00',
      image: '',
      title: '我的2019愿望',
      content: '我要脱单脱单脱单脱单啊啊啊啊啊啊啊啊',
      praise: 700
    }]
  },
  /**
   * tab切换
   */
  changeTabIndex(e) {
    console.log(e)
    console.log(+e.target.dataset.index)
    this.setData({
      tabIndex: +e.target.dataset.index
    })
  },

  /**
   * 前往详情页
   */
  goDetailPage() {
    wx.navigateTo({
      url: `/pages/wishdetails/wishdetails?origin=mine`,
    })
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