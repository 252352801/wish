// pages/generateshareimg/generateshareimg.js

// 封装了一个简单的方法
function circleImg(ctx, img, x, y, r) {
  ctx.save();
  var d = 2 * r;
  var cx = x + r;
  var cy = y + r;
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 3;
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.drawImage(img, x, y, d, d);
  ctx.stroke()
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取愿望详情
    // 获取二维码
    // 生成分享图
    const wish={
      image:'/assets/img/wish/banner.png',
      avatar:'/assets/img/avatar/avatar2.png',
      nickName:'下次我请',
      title:'我的2019愿望',
      content:'愿望内容愿望内容愿望内容愿望内容愿望愿望内容愿望内容愿望内容愿望内容愿望愿望内容愿望内容愿望内容愿望内容愿望愿望内容愿望内容愿望内容愿望内容愿望容愿望内容愿望容愿望内容愿望',
    }
    const qrcode ='/assets/img/qrcode.png';

    const sysInfo = wx.getSystemInfoSync()
    console.log(sysInfo)

    const ctx = wx.createCanvasContext('shareImg')
    console.log(ctx)

    //banner
    ctx.drawImage(wish.image, 0, 0, 288, 136)

    //头像
    circleImg(ctx, wish.avatar, 112.128, 104.128, 31.872)

    //昵称
    ctx.setTextAlign('center') // 文字居中
    ctx.setFillStyle('#666') // 文字颜色：黑色
    ctx.setFontSize(12) // 文字字号：22px
    ctx.fillText(wish.nickName, 144, 184)

    //内容背景
    ctx.drawImage('/assets/img/wishdetails/bg_l_t.png', 15, 216, 60, 40)
    ctx.drawImage('/assets/img/wishdetails/bg_r_t.png', 216, 216, 60, 40)
    ctx.drawImage('/assets/img/wishdetails/bg_l_b.png', 15, 280, 60, 40)
    ctx.drawImage('/assets/img/wishdetails/bg_r_b.png', 166, 280, 110, 40)

    //标题
    ctx.setTextAlign('center') // 文字居中
    ctx.setFillStyle('rgb(286,89,88)') // 文字颜色：黑色
    ctx.setFontSize(16)
    ctx.fillText(wish.title, 144, 220)

    //愿望内容
    ctx.setTextAlign('center') // 文字居中
    ctx.setFillStyle('rgb(51,51,51)') // 文字颜色：黑色
    ctx.setFontSize(12)
    let contentRows=[]
    const contentLen=wish.content.length
    const maxRow = 3 //最大3行
    const rowWidth =16 //每行最多18个字
    for (let i = 0; i < maxRow;i++){//最大3行
      const subStrStart = i * rowWidth
      const subStrEnd = subStrStart + rowWidth
      contentRows.push(wish.content.substr(subStrStart,rowWidth))
      if (subStrEnd >= contentLen){
        break
      }
    }
    console.log(contentRows)
    if (contentRows.length >= maxRow && contentRows[maxRow - 1].length >= rowWidth){
      //满三行 最后三个字用省略号代替
      contentRows[maxRow - 1] = contentRows[maxRow - 1].substr(0,rowWidth-3)+'...'

    }
    let rowY = 250 //愿望内容纵坐标起始位置
    for (const txt of contentRows){
      ctx.fillText(txt, 144, rowY)
      rowY+=22
    }

    //底部提示文字
    ctx.setTextAlign('center') // 文字居中
    ctx.setFillStyle('rgb(102,102,102)') // 文字颜色：黑色
    ctx.setFontSize(12  )
    ctx.fillText('请给我支持和祝福', 100, 380)
    ctx.fillText('「长按识别」参与祝福', 88,405)

    //二维码
    ctx.drawImage(qrcode, 170, 334, 100, 100)
    //绘制
    ctx.draw()

  
    setTimeout(()=>{
      wx.canvasToTempFilePath({
        canvasId: 'shareImg',
        x: 0,
        y: 0,
        width: 288,
        height: 445,
        destWidth: 288,
        destHeight: 445,
        success: function (res) {
          console.log(res)
          console.log(res.tempFilePath)
        }
      })
    },3000)
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