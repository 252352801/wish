// components/product-detail/product-detail.js
var request = require('../../utils/http.js').request;
var filter = require('../../utils/filters.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    productId: {
      type: String,
      observer: function (newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          this.getProductById(newVal)
            .then((product) => {
              this.triggerEvent('fetchsuccess', {//触发获取成功的事件
                data: product
              }, {});
              return this.getProductSubscribeDates(product.interestDelayType,product.interestDelay);
            })
            .then((data) => {
              this.setData({
                realSubscriptionTime: data.sysDate,//实际认购时间
                realInterestBeginTime: data.hoilday,//实际起息时间
                remainingTime: this.computeDuration(data.sysDate, this.data.product.actualShelfOff),
                lockedTime: this.computeDuration(data.hoilday, this.data.product.interestEnd)
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: false,//是否在加载
    product: {//产品数据
      /*"productId": "string,产品编码",
      "surplusAmount":"decimal" 剩余额度
      "productName": "string,产品名称",
      "productType": "integer,产品类型",
      "interestRate": "decimal,利率",
      "subscriptionBegin": "date,开始认购日",
      "planShelfOff": "date,计划下架日",
      "actualShelfOff": "date,实际下架日",
      "interestDelay":"date",//起息时长
      "interestDelayType":"date",//起息类型
      "interestEnd":"date",//结束计息日
      "quitDate": "date,退出日",
      "needmoneyTotal": "decimal,募资总额",
      "minAmount": "decimal,起步投资金额",
      "amountStep": "decimal,投资步进额",
      "nowAmount": "decimal,实时认购额",
      "productStatus": "integer,状态",
      "isHot": "integer,是否热门",
      "productPeriod": "string,项目周期（如：1个月或30天）"
      "buy":"boolean,是否可购买"*/

      /*以下为附加上的
       "sysDate":"date,系统日期 即用户认购日期"
       "hoilday":"date,通过起息时长计算后得出的起息日 即用户认购后的起息日"
       */

    },

    realSubscriptionTime: '0000-00-00',//实际认购时间
    realInterestBeginTime: '0000-00-00',//实际起息时间
    remainingTime: '0天',//剩余可投时间 ，单位天
    lockedTime: '' //锁定期  单位天
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 通过产品ID获取产品数据
     * @paranm productId <String> 产品ID
     */
    getProductById: function (productId) {
      this.setData({
        loading: true
      });
      this.triggerEvent('beforefetch', {}, {}); //触发获取之前的事件
      return new Promise((resolve, reject) => {
        request({
          path: '/product/getDatails',
          data: {
            productId: productId
          },
          method: 'POST',
          success: (res) => {
            var product = {};
            var response = filter.filterResponse(res);
            if (response.ok && response.body && typeof response.body === 'object') {
              product = response.body;
            }
            this.setData({
              product: product
            });
            resolve(product);
          },
          fail: function (res) {
            reject('获取产品失败');
          },
          complete: (res) => {
            this.setData({
              loading: false
            });
            this.triggerEvent('affterfetch', {}, {});//触发获取完成后的事件
          },
        });
      });
    },
    /**
     * 通过产品的起息时长获取产品的认购日期信息
     * param interestDelay <Number> 起息时长
     */
    getProductSubscribeDates: function (interestDelayType,interestDelay) {
      if (!interestDelay) {
        return Promise.resolve({
          sysDate: '',
          hoilday: ''
        });
      }
      return new Promise((resolve, reject) => {
        request({
          path: '/holidayInfo/getWorkDate',
          data: {
            interestDelayType: interestDelayType,
            interestDelay: interestDelay
          },
          method: 'POST',
          success: (res) => {
            var response = filter.filterResponse(res);
            if (response.ok && response.body && typeof response.body === 'object') {
              let sysdate = response.body.sysDate;
              let hoilday = response.body.hoilday;
              resolve({
                sysDate: sysdate,
                hoilday: hoilday
              });
            } else {
              reject('获取产品认购时间失败');
            }
          },
          fail: function (res) {
            reject('获取产品认购时间失败');
          },
          complete: (res) => {
          },
        });
      });
    },
    /**
     * 计算持续时间
     * @param startTime <String> 开始时间
     * @param endTime <String> 截止时间
     */
    computeDuration: function (startTime, endTime) {
      let res = 0;
      let st = new Date(startTime.replace(/-/g, '/'));
      let et = new Date(endTime.replace(/-/g, '/'));
      if (((st + '') != 'Invalid Date') && ((et + '') != 'Invalid Date')) {
        if (et > st) {
          let remaintime = (et.getTime() - st.getTime()) / 1000 / 60 / 60 / 24;//天
          res = Math.ceil(remaintime);
        }
      }
      return res + '天';
    }
  }
})
