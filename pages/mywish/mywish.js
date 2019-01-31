// pages/mywish/mywish.js
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
    tabs: [{
      text: '待提醒愿望',
      value: '1',
      data: [],
      page: 1,
      loading: false,
      loadingMore: false,
      loadedAll: false
    }, {
      text: '已提醒愿望',
      value: '2',
      data: [],
      page: 1,
      loading: false,
      loadingMore: false,
      loadedAll: false
    }],
    pageSize: 5,
    tabIndex: 0
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
    const tab = this.data.tabs[this.data.tabIndex]
    if (tab.data.length === 0) {
      this.getData(this.data.tabIndex)
    }
  },
  formatData(originData) {
    const formattedData = []
    if (originData instanceof Array) {
      originData.forEach(ele => {
        if (ele && typeof ele === 'object') {
          formattedData.push({
            remindTime: ele.remind_time,
            commentsCount: ele.bless_sum,
            ...splitTitleAndContent(ele.wish_desc),
            imgUrl: createImageUrl(ele.wish_img)
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
      path: 'wish/list',
      data: body,
      method: 'POST',
      success: (res) => {
        if (res.ok && res.body.wish_list instanceof Array) {
          success(this.formatData(res.body.wish_list))
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
  getData(tabIndex = this.data.tabIndex) {
    console.log(tabIndex)
    const tabs = this.data.tabs
    const tab = tabs[tabIndex]
    const body = {
      type_code: this.data.tabs[tabIndex].value,
      page_num: 1 //this.data.tabs[tabIndex].page
    }
    tab.loading = true
    wx.showLoading({
      title: '加载中',
    })
    this.query({
      body,
      success: (data) => {
        console.log(data)
        tab.data = data
      },
      fail: (res) => {},
      complete: (res) => {
        wx.hideLoading()
        tab.loading = false
      },
    })
  },
  refresh() {
    const tabs=this.data.tabs
    const tab = tabs[this.data.tabIndex]
    tab.loadedAll=false
    this.setData({
      tabs: tabs
    })
    this.getData()
  },
  loadMore() {
    const tab = this.data.tabs[tabIndex]
    if (tab.loading||tab.loadingMore){
      return
    }
    const body = {
      type_code: tab.value,
      page_num: tab.page + 1
    }
    tab.loadingMore = true
    this.query({
      body,
      success: (data) => {
        tab.data = tab.data.concat(data)
        tab.page++
        if (tab.data.length&&data.length<this.data.pageSize){
          tab.loadedAll=true
        }
      },
      fail: (res) => {},
      complete: (res) => {
        tab.loadingMore = false
      },
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