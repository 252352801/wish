/**
 *环境
 */
const env = {
  dev: false,
  test: false,
  prod: true
};  
/**
 * 接口地址
 */
const host = {
  dev: 'http://192.168.10.10:8082/ifmp-api/',
  //dev: 'http://192.168.10.24:8080/ifmp-api/',
  test: 'http://192.168.10.10:9082/ifmp-api/',
  prod: 'https://moneyapi.husha56.com/ifmp/'
};
/**
 * 根据当前环境拼接url
 * @param <string> path 路径
 */
function createUrl(path) {
  if (env.prod) {
    return host.prod + path;
  } else if (env.test) {
    return host.test + path;
  } else if (env.dev) {
    return host.dev + path;
  }
}

/**
 * 请求（比wx.request多了path参数）
 * options <object> 请求参数对象
 */
function request(options) {
  /*var options = {
    url: '',//url
    path:'',//路径 传path时将使用createUrl拼接url
    data: null,//发送的数据
    header: {},
    method: GET,
    dataType: json,
    responseType: text,
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { }
  };*/
  if (options && typeof options === 'object' && options.path) {//拼接
    options.url = createUrl(options.path);
  }
  if (!(options.header && typeof options.header === 'object')) {
    options.header = {};
  }
  options.header['Content-Type'] = 'application/x-www-form-urlencoded';//Content-Type
  options.header.token = wx.getStorageSync('token')||'';//token头
  let orgSuccessCB = options.success;//初始的成功回调
  let filterSuccessCB=function(res){//带过滤的回调函数
    //if (res.statusCode==411){
    if (res.statusCode == 200 && res.data && typeof res.data === 'object' && res.data.status==411) {
      //登陆过期处理
      console.log('过期了...');
      // wx.redirectTo({
      //   url: '/pages/signin/signin'
      // });
    } else {
      orgSuccessCB.call(options, res);
    }
  };
  options.success = filterSuccessCB;
  return wx.request(options);
}




module.exports = {
  createUrl: createUrl,//根据当前环境拼接url
  request: request  //请求
};