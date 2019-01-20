const key = 'personalInfo';//保存个人信息的key

/**
 * 获取用户个人信息
 * @param options <object> 可选参数,当options为空时为同步获取，否则为异步获取
 * @return null/personalinfo
 * options参数说明：
 * success 	  Function 	是 	接口调用成功的回调函数,success(res){},res=personalinfo[注1]
 * fail 	    Function 	否 	接口调用失败的回调函数
 * complete 	Function 	否 	接口调用结束的回调函数（调用成功、失败都会执行
 */
function getPersonalInfo(options){
  if (options && typeof options==='object'){//异步获取
    options.key=key;
    var successCB = options.success;
    options.success = function (res) {
      successCB.call(successCB, res.data);
    };
    wx.getStorage(options);
  }else{//同步获取
    return wx.getStorageSync(key);
  }

  
}

/**
 * 设置用户个人信息
 * @param options <object> 可选参数,当options为空时为同步设置，否则为异步设置
 * @return null
 * options参数说明：
 * success 	  Function 	是 	接口调用成功的回调函数
 * fail 	    Function 	否 	接口调用失败的回调函数
 * complete 	Function 	否 	接口调用结束的回调函数（调用成功、失败都会执行
 */
function setPersonalInfo(data,options) {
  if (options && typeof options === 'object') {//异步设置
    options.key = key;
    options.data = data;
    wx.setStorage(options);
  }else{//同步设置
    wx.setStorageSync(key, data);
  }
}

/**
 * 设置用户个人信息状态
 * @param options <object> 可选参数,当options为空时为同步设置，否则为异步设置
 * @return null/memberstatus[注2]
 * options参数说明：
 * success 	  Function 	是 	接口调用成功的回调函数，success(res){},res=memberstatus[注2]
 * fail 	    Function 	否 	接口调用失败的回调函数
 * complete 	Function 	否 	接口调用结束的回调函数（调用成功、失败都会执行
 */
function getPersonalInfoStatus(options) {
  var getMemberStatus=function(resData){
    var memberStatus = null;
    var data = resData;
    if (data && typeof data === 'object') {
      if (data.memberStatus !== undefined) {
        memberStatus = data.memberStatus;
      }
    }
    return memberStatus;
  };
  if (options && typeof options === 'object') {//异步获取
    options.key = key;
    var successCB = options.success;
    options.success=function(res){
      successCB.call(successCB, getMemberStatus(res.data));
    };
    wx.getStorage(options);
  } else {//同步获取
    return getMemberStatus(wx.getStorageSync(key));
  }
}

/**
 * 移除用户个人信息
 * @param options <object> 可选参数,当options为空时为同步删除，否则为异步删除
 * @return null
 * options参数说明：
 * success 	  Function 	是 	接口调用成功的回调函数
 * fail 	    Function 	否 	接口调用失败的回调函数
 * complete 	Function 	否 	接口调用结束的回调函数（调用成功、失败都会执行
 */
function removePersonalInfo(options){
  if (options && typeof options === 'object') {//异步删除
    options.key = key;
    wx.removeStorage(options);
  } else {//同步删除
    wx.removeStorageSync(key);
  }
}
//[注1]personalinfo
/*var personalinfo={
  "memberStatus": "integer,会员状态(0：未认证1：认证中2：已认证)",
  "phone": "string,手机号码",
  "realName": "string,真实姓名",
  "idcardNo": "string,身份证号码",
  "bankCards": [
    {
      "bankName": "string,银行名",
      "bankReservePhone": "string,银行预留手机",
      "cardId": "string,银行卡ID",
      "cardName": "string,开户名",
      "cardNo": "string,银行卡号"
    }
  ]
};*/
//[注2]memberstatus 会员状态(0：未认证1：认证中2：已认证)" null表示未找到


var request = require('./http.js').request;
var filter = require('./filters.js');

/**
 * 请求用户个人信息
 * @param saveType <Number> 请求成功后保存类型，不传此参数则默认不保存，0：异步保存 1：同步保存
 * @return Promise<personalinfo|any>
 */
function requestPersonalInfo(saveType) {
  return new Promise((resolve, reject) => {
    request({
      path: 'member/getPersonalInfo',
      method: 'POST',
      success: function (res) {
        var response = filter.filterResponse(res);
        if (response.ok && response.body && typeof response.body === 'object') {
          var newdata = response.body;
          if (saveType === 0) {//异步保存
            setPersonalInfo(newdata, {});
          } else if (saveType === 1) {//同步保存
            setPersonalInfo(newdata);
          }
          resolve(newdata);
        } else {
          reject(response.message || '获取用户信息失败');
        }
      },
      fail: function (res) {
        reject('获取用户信息失败');
      },
      complete: function (res) { },
    })
  });
}


module.exports = {
  getPersonalInfo: getPersonalInfo,
  setPersonalInfo: setPersonalInfo,
  removePersonalInfo: removePersonalInfo,
  getPersonalInfoStatus: getPersonalInfoStatus,
  requestPersonalInfo: requestPersonalInfo
};