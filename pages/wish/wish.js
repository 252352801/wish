// pages/wish/wish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerUrl:'/assets/img/wish/banner.png',
    titleOptions: ['我的2019愿望', '彩票中奖', '12点上班', '美梦成真', '脱单'],
    titleIndex: 0,
    content: '',
    remindDatetime: '',
  },
  userInfoHandler(res) {
    console.log(res)
  },
  onTitlePickerChange(e){
    this.setData({
      titleIndex: e.detail.value
    })
  },
  setInputValue(e) {
    const newData = {};
    newData[e.target.dataset.key] = e.detail.value
    this.setData(newData)
  },
  setRemindDatetime(e){
    this.setData({
      remindDatetime:e.detail.value
    })
  },
  togglePase(e) {

  },
  toggleCoupon(e) {

  },
  pickBannerImg(){
    this.selectComponent('#cropper').chooseImage()
  },
  setWishBanner(e){
    console.log(e.detail.url)
    this.setData({
      bannerUrl: e.detail.url
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