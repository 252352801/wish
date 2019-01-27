/**===========
 * 登录拦截器
 ============*/

/**
 * 是否已登录
 */
function isSignIn() {
  return !!wx.getStorageSync('token');
}

/**
 * 未登录拦截
 * @param options 对应page方法的object
 */
function lostSigninIntercept(options) {
  var onloadFn = options.onLoad;
  options.onLoad = function(opts) {
    if (!isSignIn()) { //未登录处理
      console.log('未登录')
      setTimeout(() => {
        var pages = getCurrentPages();
        var currentpage = pages[pages.length - 1];
        onloadFn.call(currentpage, opts);
      }, 3000)
    } else {
      var pages = getCurrentPages();
      var currentpage = pages[pages.length - 1];
      onloadFn.call(currentpage, opts);
    }
  };
  return options;
}

module.exports = {
  lostSigninIntercept: lostSigninIntercept
};