export function wxPay({
  prepayId,
  success,
  fail,
  complete
}){
  wx.requestPayment({
    timeStamp: new Date().getTime()+'',
    nonceStr: '',
    package: 'prepay_id=' + prepay_id,
    signType: 'MD5',
    paySign: '',
    success,
    fail,
    complete
  })
}