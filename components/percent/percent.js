// components/percent/percent.js
var util = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: { // 值
      type: Number,
      observer: function (newVal, oldVal) {
        this.format();
      }
    },
    unit: {//单位
      type: String,
      value: '%'
    },
    decimal: {//小数位
      type: Number,
      value:null
    },
    separator: {//分割符
      type: String,
      value: ','
    },
    separateLength: {//分割长度
      type: Number,
      value: 3
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    formattedValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toFixed(num, s) {
      var times = Math.pow(10, s)
      var des = num * times + 0.5
      des = parseInt(des, 10) / times
      return des + '';
    },
    format() {
      var val = this.properties.value;//取值
      //乘
      val = util.mul(val,100);
      //取小数位
      var decimal = parseInt(this.properties.decimal);//小数位
      var valstr = val + '';//值的字符串形式
      if (decimal > 0) {//如果有小数位
        valstr = this.toFixed(val,decimal);
      } else if (decimal === 0) {
        valstr = Math.round(val) + '';
      }else{
        valstr = this.toFixed(val,2);
      }
      //分割
      if (this.properties.separator) {
        let separator = this.properties.separator;//分割符
        let separatelen = this.properties.separateLength;//分隔长度
        var valsplits = valstr.split('.');//分割值的字符串
        var valint = valsplits[0];//整数部分
        var valdecimal = valsplits[1];//小数部分
        var valintarr = valint.split('');//整数部分转换成数组
        for (let i = valintarr.length - separatelen; i > 0; i = i - separatelen) {
          valintarr.splice(i, 0, separator);
        }
        valint = valintarr.join('');//重新拼接成字符串
        valstr = valint + (valdecimal ? '.' + valdecimal : '');//重新拼接小数部分
      }
      //加上单位
      if (this.properties.unit) {
        if (this.properties.unit.indexOf('xx') >= 0) {
          valstr = this.properties.unit.replace('xx', valstr);//xx代表数值占位符
        } else {
          valstr = valstr + this.properties.unit;
        }
      }
      //输出
      this.setData({
        formattedValue: valstr
      });
      return valstr;
    }
  },
  ready: function () {
  }
})

