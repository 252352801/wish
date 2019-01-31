// pages/friendswish/friendswish.js
const http = require('../../utils/http.js');
const createUrl = http.createUrl
const createImageUrl = http.createImageUrl
const request = http.request
const splitTitleAndContent = require('../../utils/util.js').splitTitleAndContent
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [{}],
    page: 1,
    pageSize: 5,
    loading: false,
    loadingMore: false,
    loadedAll: false
  },

  /**
   * 前往详情页
   */
  goDetailPage() {
    wx.navigateTo({
      url: `/pages/wishdetails/wishdetails?origin=friend`,
    })
  },

  formatData(originData) {
    const formattedData = []
    if (originData instanceof Array) {
      originData.forEach(ele => {
        if (ele && typeof ele === 'object') {
          formattedData.push({
            avatar: ele.fri_avatar,
            nickName: ele.fri_nick_name,
            commentsCount: ele.bless_sum,
            ...splitTitleAndContent(ele.fri_wish_desc),
            createTime: ele.create_time
          })
        }
      })
    }
    return formattedData
  },
  query({
    body,
    success,
    fail,
    complete
  }) {
    request({
      path: 'wish/fri/list',
      data: body,
      method: 'POST',
      success: (res) => {
        if (res.ok && res.body.wish_list instanceof Array) {
          success(this.formatData(res.body.fri_wish_list))
        }
      },
      fail: function(err) {
        fail(err)
      },
      complete: function(res) {
        complete(res)
      },
    })
  },
  getData() {
    const body = {
      page_num: 1
    }
    this.setData({
      loading: true
    })
    wx.showLoading({
      title: '加载中',
    })
    this.query({
      body,
      success: (data) => {
        console.log(data)
        this.setData({
          data:data
        })
      },
      fail: (res) => {},
      complete: (res) => {
        wx.hideLoading()
        this.setData({
          loading: false
        })
      },
    })
  },
  refresh() {
    this.setData({
      loadedAll: false
    })
    this.getData()
  },
  loadMore() {
    if (this.data.loading || this.data.loadingMore) {
      return
    }
    const body = {
      page_num: this.data.page + 1
    }
    this.setData({
      loadingMore: true
    })
    this.query({
      body,
      success: (data) => {
        const newData = this.data.concat(data)
        const newPage = this.data.page + 1
        let loadedAll=false
        if (this.data.length && data.length < this.data.pageSize) {
          loadedAll = true
        }
        this.setData({
          data: newData,
          page: newPage,
          loadedAll
        })
      },
      fail: (res) => {},
      complete: (res) => {
        this.setData({
          loadingMore: false
        })
      },
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
    this.getData()
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
    this.refresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})