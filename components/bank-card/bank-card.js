// components/bank-card/bank-card.js
var request = require('../../utils/http.js').request;
var filter = require('../../utils/filters.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    loading:true,//是否在加载
    officialBankCard: {//官方银行卡
      /* "realName": "string,真实姓名",
          "memberId": "string,会员ID",
          "cardId": "string,银行卡ID",
          "cardNo": "string,银行卡号",
          "cardName": "string,开户名",
          "bankReservePhone": "date,银行预留手机号码",
          "bankName": "date,银行名",
          "subbankName": "decimal,支行名",
          "lineNo": "decimal,联行号",
          "cardType": "decimal,业务类型(0：只提现1：只入账2：可提现可入账)",
          "authStatus": "decimal,认证状态(0：未认证1：已认证)",
          "availableBalance": "string,可用余额-记账余额"*/
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
       * 获取官方银行卡
       */
    getOfficialBankCard: function () {
      wx.showLoading({
        title: '正在加载',
      });
      request({
        path: 'bankCard/getOfficialBankCard?isNeedToken=false',
        method: 'POST',
        success: (res) => {
          console.log(res);
          var response = filter.filterResponse(res);
          if (response.ok && response.body && typeof response.body === 'object' && response.body.records instanceof Array) {
            var bankcard = response.body.records[0];
            if (bankcard && typeof bankcard === 'object') {
              bankcard.cardNo = this.formatBankCardNo(bankcard.cardNo);
            }
            this.setData({
              officialBankCard: bankcard,
              loading:false
            });
          }
        },
        fail: function (res) { },
        complete: function (res) {
          wx.hideLoading();
        },
      })
    },
    /**
     * 银行卡号格式化
     * @param carNo <String> 银行卡号
     * @return String
     */
    formatBankCardNo: function (carNo) {
      var str = carNo;
      if (str && typeof (str + '') === 'string') {
        var strsplits = str.split('');
        for (let i = 0, len = strsplits.length; i < len; i += 5) {
          strsplits.splice(i, 0, ' ');
          len++;
        }
        str = strsplits.join('');
      }
      return str;
    },

    /**
     * 复制银行卡号
     */
    copyCardNo: function () {
      wx.setClipboardData({
        data: this.data.officialBankCard.cardNo,
        success: function () {
          wx.showToast({
            title: '卡号已复制到剪贴板！',
            icon: 'none',
            duration: 3000
          });
        }
      })
    }
  },
  ready: function () {
    this.getOfficialBankCard();
  }
})
