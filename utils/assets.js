var http = require('./http.js');
var filter = require('./filters.js');
/**
 * 获取会员资产总揽
 * @return Promise<Object> 会员资产总揽
 */
function getAssets() {
  return new Promise((resolve, reject) => {
    http.request({
      path: 'member/getAssetsOverview',
      method: 'POST',
      success: (res) => {
        var response = filter.filterResponse(res);
        if (response.ok && response.body && typeof response.body === 'object') {
          resolve(response.body);
        } else {
          reject(response.message);
        }
      },
      fail: (res) => {
        reject(res);
      }
    });
  });
}

module.exports = {
  getAssets: getAssets//获取资产 <Promise>
}