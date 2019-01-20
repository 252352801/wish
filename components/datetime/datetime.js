// components/datetime/datetime.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: { // 值
      type:null,
      observer: function (newVal, oldVal) {
        if (newVal !== oldVal){
          this.formatDatetime();
        }
      }
    },
    format: {//格式
      type: String,
      value: 'yyyy-MM-dd'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    formattedValue:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

    createDate:function(dateStr){
      let date = new Date(dateStr);
      if (date + '' === 'Invalid Date') {
        date = new Date(dateStr.replace(/-/g, '/').replace(/\.\d+$/, ''));
        if (date + '' === 'Invalid Date') {
          return null;
        }
      }
      return date;
    },

    formatDatetime:function(){
      let value=this.data.value,
        fmt = this.data.format,
        formattedValue = value;
      if (value) {
        let date;
        if (value instanceof Date) {
          date = value;
        } else if (typeof value === 'string') {
          date = this.createDate(value);
        }
        if (!date) {
          return value;
        }
        let o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          "q+": Math.floor((date.getMonth() + 3) / 3), //季度
          "S": date.getMilliseconds() //毫秒
        };
        if (!fmt) {
          fmt = this.format;
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        formattedValue=fmt;
      }
      this.setData({
        formattedValue: formattedValue
      });
    }
  }
})
