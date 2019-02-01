// pages/wallet/wallet.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:0,
    cashMin:0//提现最小金额
  },

  /**
   * 提现
   */
  cash() {
    app.showMsg({
      title: '提现功能暂未开放',
      content: `敬请期待`
    })
    return
    if (+this.data.balance===0){
      app.showMsg({
        title:'您的余额不足，无法提现',
        content: `余额大于${this.data.cashMin}可提现`
      })
    }else{

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.balance) {
      this.setData({
        balance: options.balance
      })
    }
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