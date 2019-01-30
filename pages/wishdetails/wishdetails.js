// pages/wishdetails/wishdetails.js
const http = require('../../utils/http.js');
const createUrl = http.createUrl
const createImageUrl = http.createImageUrl
const request = http.request
const splitTileAndContent = require('../../utils/util.js').splitTileAndContent
Page({

  /**
   * 页面的初始数据
   */
  data: {
    origin: '', //来源
    id:'',
    scene:'',
    wish:{
    },
    loading:false
  },
  go(e) {
    wx.navigateTo({
      url: e.target.dataset.link,
    })
  },
  formatData(data){
    let fdata={
      commentCount:0,
      couponCount:0,
      commentList:[]
    }
    if (data&&typeof data==='object'){
      fdata = Object.assign(fdata,{
        image: createImageUrl(data.wish_img),
        avatar: '',
        nickName: '',
        ...splitTileAndContent(data.wish_desc),
        remindTime: '',
      })
      if (data.fri_infos instanceof Array){
        data.fri_infos.forEach(ele=>{
          fdata.commentList.push({
            avatar: ele.fri_avatar,
            nickName: ele.fri_nick_name,
            comment: ele.fri_desc,
            coupon: ele.donate_flag
          })
        })
      }
    }
    return fdata
  },
  getDetail(){
    let body={
    }
    if(this.data.scene){
      body = Object.assign(body,{
        link_code: this.data.scene
      })
    }else{
      body = Object.assign(body, {
        wish_id: this.data.id
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    request({
      path: 'wish/select',
      data: body,
      method: 'POST',
      success: (res) => {
        if (res.ok ) {
         this.setData({
           wish: res.body
         })
        }
      },
      fail: function (err) {
      },
      complete: function (res) {
        wx.hideLoading()
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      wish: this.formatData({})
    })
    let origin='mine'
    if (options.origin!==undefined){
      origin = options.origin
    }
    if (options.scene){

    }
    this.setData({
      origin
    })
    this.getDetail()
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