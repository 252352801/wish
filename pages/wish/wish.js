// pages/wish/wish.js
const http = require('../../utils/http.js');
const createUrl = http.createUrl
const createImageUrl = http.createImageUrl
const request = http.request
const formatResponse = http.formatResponse
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerUrl: '/assets/img/wish/banner.png',
    bannerPath: '',
    titleOptions: ['我的2019愿望', '彩票中奖', '12点上班', '美梦成真', '脱单'],
    titleIndex: 0,
    content: '',
    remindDatetime: '',
    public: true,
    coupon: true
  },
  userInfoHandler(res) {
    console.log(res)
    if (res.detail.userInfo) {
      //已授权
      if (!this.data.content) {
        this.showErrMsg('请输入你的愿望内容', '就差一小步了')
      } else {
        const data = {
          img_url: this.data.bannerUrl,
          is_donate: this.data.coupon ? '1' : '0',
          is_visible: this.data.public ? '1' : '0',
          remind_time: this.data.remindDatetime,
          wish_desc: this.data.titleOptions[this.data.titleIndex] + '#' + this.data.content
        }
        console.log(data)
        wx.showLoading({
          title: '正在许愿',
          mask: true
        })
        wx.request({
          path: 'wish/insert',
          data,
          method: 'POST',
          success: function(res) {
            if (res.ok) {
              wx.navigateTo({
                url: `/pages/wishdetails/wishdetails?origin=mine&id=` + res.body.wish_id,
              })
            } else {
              wx.showErrMsg('许愿失败', res.msg)
            }
          },
          fail: function(res) {
            wx.showErrMsg('请求失败', '请检查您的网络设置')
          },
          complete: function(res) {
            wx.hideLoading()
          },
        })
      }
    }
  },
  showErrMsg(title, content) {
    wx.showModal({
      title: title,
      showCancel: false,
      confirmText: '好的',
      content: content,
      confirmColor: '#D7625D'
    })
  },
  onTitlePickerChange(e) {
    this.setData({
      titleIndex: e.detail.value
    })
  },
  setInputValue(e) {
    const newData = {};
    newData[e.target.dataset.key] = e.detail.value
    this.setData(newData)
  },
  setRemindDatetime(e) {
    this.setData({
      remindDatetime: e.detail.value
    })
  },
  togglePublic(e) {
    console.log(e)
    this.setData({
      public: e.detail.value
    })
  },
  toggleCoupon(e) {
    console.log(e)
    this.setData({
      coupon: e.detail.value
    })
  },
  pickBannerImg() {
    this.selectComponent('#cropper').chooseImage()
  },
  uploadImg(e) {
    wx.showLoading({
      title: '正在上传图片...',
      mask: true
    })
    wx.uploadFile({
      url: createUrl('file/upload'),
      filePath: e.detail.url,
      name: 'file',
      header: {
        token: wx.getStorageSync('token')
      },
      success: (res) => {
        console.log(res)
        try {
          const data = formatResponse(JSON.parse(res.data))
          console.log(data)
          if (data.ok) {
            this.setData({
              bannerPath: data.body.url,
              bannerUrl: createImageUrl(data.body.url)
            })
            console.log(this.data.bannerUrl)
          }
        } catch (err) {

        }
      },
      fail: (err) => {
        cosole.log(err)
      },
      complete: (res) => {
        //wx.hideLoading()
      }
    })
  },
  setWishBanner(e) {
    console.log(e.detail.url)
    this.setData({
      bannerUrl: e.detail.url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // setTimeout(()=>{
    //   request({
    //     path: 'user/info',
    //     method: 'POST',
    //     success: function(res) {
    //       console.log(res)
    //     },
    //     fail: function(res) {},
    //     complete: function(res) {},
    //   })
    // },1000)
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