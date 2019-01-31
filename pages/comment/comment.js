// pages/comment/comment.js
const http = require('../../utils/http.js');
const createUrl = http.createUrl
const createImageUrl = http.createImageUrl
const request = http.request
const splitTitleAndContent = require('../../utils/util.js').splitTitleAndContent
const app = getApp()
import {wxPay} from '../../utils/payment.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wishId:'',
    wish:{},
    comment:'',
    coupon:''
  },
  setInputValue(e) {
    const newData = {};
    newData[e.target.dataset.key] = e.detail.value
    this.setData(newData)
  },

  formatData(data) {
    let fdata = {
      commentCount: 0
    }
    if (data && typeof data === 'object') {
      fdata = Object.assign(fdata, {
        image: createImageUrl(data.wish_img),
        avatar: '',
        nickName: '',
        ...splitTitleAndContent(data.wish_desc),
        remindTime: '',
      })
      if (data.fri_infos instanceof Array) {
        fdata.commentCount = data.fri_infos.length
      }
    }
    return fdata
  },
  getDetail() {
    let body = {
      wish_id: this.data.wishId
    }
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      loading: true
    })
    request({
      path: 'wish/select',
      data: body,
      method: 'POST',
      success: (res) => {
        if (res.ok) {
          this.setData({
            wish: res.body
          })
        }
      },
      fail: function (err) {
      },
      complete: (res)=>{
        wx.hideLoading()
        this.setData({
          loading: false
        })
      },
    })
  },
  onGetUserInfo(res){
    if (res.detail.userInfo) {
      app.shoulUpdateUserInfo(res.detail.userInfo.nickName, res.detail.userInfo.avatarUrl)
      .then(()=>{
        this.submit()
      })
    }
  },
  submit(es){
    if (!this.data.comment) {
      app.showMsg({
        title: '不能发送空的祝福哦',
        content: '说点什么吧'
      })
    } else {
      let data = {
        wish_id: this.data.wishId,
        bless_desc: this.data.comment,
      }
      if (this.data.coupon) {
        data['money'] = this.data.coupon
      }
      console.log(data)
      wx.showLoading({
        title: '正在发送祝福',
        mask: true
      })
      wx.request({
        path: 'bless/send',
        data,
        method: 'POST',
        success: (res)=> {
          if (res.ok) {
            // wx.navigateTo({
            //   url: `/pages/wishdetails/wishdetails?origin=friend&id=` + res.body.wish_id,
            // })
            if (res.body.perpay_id){//选择了红包祝福，调起支付
              wxPay({
                prepayId: perpay_id,
                success:()=>{
                  this.handleSuccess()
                },
                fail:()=>{
                  //
                }
              })
            }else{
              this.handleSuccess()
            }
          } else {
            app.showMsg({
              title: '发送祝福失败',
              content: res.msg
            })
          }
        },
        fail: function (res) {
          app.showMsg({
            title: '请求失败',
            content: '请检查您的网络设置'
          })
        },
        complete: function (res) {
          wx.hideLoading()
        },
      })
    }
  },

  handleSuccess(){
    app.showMsg({
      title:'已成功发送祝福',
      content:'真棒'
    })
    .then(()=>{
      //前往详情页
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(options.wishId){
        this.setData({
          wishId: options.wishId
        })
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})