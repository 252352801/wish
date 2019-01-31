// pages/wish/wish.js
const http = require('../../utils/http.js');
const createUrl = http.createUrl
const createImageUrl = http.createImageUrl
const request = http.request
const formatResponse = http.formatResponse
const combineTitleAndContent = require('../../utils/util.js').combineTitleAndContent
const app = getApp(); //获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defautBanner: '/assets/img/wish/banner.png',
    bannerUrl: '',
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
      app.shouldUpdateUserInfo(res.detail.userInfo.nickName, res.detail.userInfo.avatarUrl)
        .then(() => {
          this.submit()
        }, () => {
          this.submit()
        })
    }
  },
  submit() {
    //已授权
    if (!this.data.content) {
      app.showMsg({
        title: '请输入你的愿望内容',
        content: '就差一小步了'
      })
    } else {
      const data = {
        img_url: this.data.bannerPath,
        is_donate: this.data.coupon ? '1' : '0',
        is_visible: this.data.public ? '1' : '0',
        wish_desc: combineTitleAndContent(this.data.titleOptions[this.data.titleIndex], this.data.content)
      }
      if (this.data.remindDatetime) {
        data['remind_time'] = this.data.remindDatetime
      }
      console.log(data)
      wx.showLoading({
        title: '正在许愿',
        mask: true
      })
      request({
        path: 'wish/insert',
        data,
        method: 'POST',
        success: (res) => {
          if (res.ok) {
            app.showMsg({
                title: '许愿成功！',
                content: '现在去看看吧',
                confirmText: '查看详情',
                cancelText: '继续许愿',
                showCancel: true,
              })
              .then((confirm) => {
                if (confirm) {
                  wx.navigateTo({
                    url: `/pages/wishdetails/wishdetails?origin=mine&id=` + res.body.wish_id,
                  })
                } else {
                  this.setData({
                    content: ''
                  })
                }
              })
          } else {
            app.showMsg({
              title: '许愿失败',
              content: res.msg
            })
          }
        },
        fail: (res) => {
          app.showMsg({
            title: '请求失败',
            content: '请稍后后重试'
          })
        },
        complete: function(res) {
          wx.hideLoading()
        },
      })
    }
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
  clearRemindDatetime() {
    this.setData({
      remindDatetime: ''
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
    // this.selectComponent('#cropper').chooseImage()
    wx.showActionSheet({
      itemList: ['使用默认图片', '上传自定义图片'],
      success: (res) => {
        console.log(res.tapIndex)
        const tapIndex = res.tapIndex
        if (tapIndex === 0) { //使用默认
          this.setData({
            bannerUrl: this.data.defautBanner
          })
        } else if (tapIndex === 1) { //上传自定义图片
          this.selectComponent('#cropper').chooseImage()
        }
      }
    })
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
          consloe.log(err)
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
    this.setData({
      bannerUrl: this.data.defautBanner
    })
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