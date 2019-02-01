// /**
//  * 生成随机字符串
//  */
// function createNonceStr() {
//   let text = ""
//   const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
//   for (var i = 0; i < 16; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length))
//   }
//   return text
// }

// /**
//  * 生成支付签名
//  * @param {string} appId      小程序ID
//  * @param {string} nonceStr   随机字符串
//  * @param {string} package    数据包
//  * @param {string} timeStamp  时间戳
//  * @param {string} apiKey     支付接口密钥
//  * https://mp.weixin.qq.com/wxopen/frame?t=wxpay/index_frame&iframe=/pay/mp_wxopen&token=48876454&lang=zh_CN
//  */
// function createPaySign(appId, nonceStr, package, timeStamp, apiKey) {
//   const stringA = 'appId=' + appId +
//     '&nonceStr=' + nonceStr +
//     '&package=' + package +
//     '&signType=MD5' +
//     '&timeStamp=' + timeStamp
//   const stringSignTemp = stringA + '&key=' + apiKey
//   const sign = md5(stringSignTemp).toUpperCase()
//   return sign
// }

// const appId = 'wxdc30f6d1f50682f2' //小程序ID
// const apiKey = '' // 在小程序后台页面申请微信支付后取得 https://mp.weixin.qq.com/wxopen/frame?t=wxpay/index_frame&iframe=/pay/mp_wxopen&token=48876454&lang=zh_CN
//                   // key设置路径：微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->密钥设置
// const prepayId='' //预支付单id 

// //小程序调起支付需要的5个参数
// const timeStamp = new Date().getTime() + ''
// const nonceStr = createNonceStr()
// const package = 'prepay_id=' + prepayId
// const signType = 'MD5'
// const paySign = createPaySign(appId, nonceStr, package, timeStamp, apiKey)
// module.exports = {
//   timeStamp,
//   nonceStr,
//   package,
//   signType,
//   paySign
// }

/**
 * 微信支付
 */
export function wxPay(options/*{
  timeStamp,
  nonceStr,
  package,
  signType,
  paySign,
  success,
  fail,
  complete
}*/) {
  wx.requestPayment({
    ...options
  })
}