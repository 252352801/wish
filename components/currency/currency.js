// components/currency/currency.js
var util=require('../../utils/util.js');
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
    unit: String, // 单位 ￥xx  xx元  xx万元  共xx万元 /元  万元  等
    decimal: null,//小数位
    divisor: {//被除数
      type: Number,
      value: 1
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
      var times = Math.pow(10, s);
      // var des = num * times + 0.5;
      // console.log('des', des);
      // des = parseInt(des, 10) / times;
      // console.log('times', times);
      // console.log('des', des);
      var des = num * times;
      des = Math.round(des) / times;
      return des + '';
    },
    format() {
      var val = this.properties.value;//取值
      if (!(val || val === 0)) {
        return val;
      }
      //除
      var divisor = this.properties.divisor;//除数
      if (divisor > 0) {
        val = util.div(val, divisor);
      }
      var decimal = parseInt(this.properties.decimal);//小数位
      var valstr = val + '';//值的字符串形式
      //取小数位
      if (this.properties.decimal === 'default') {//默认
        if (valstr.indexOf('.') >= 0) {//有小数
        }
      } else {
        if (decimal > 0) {//如果有小数位
          valstr = this.toFixed(val, decimal);
        } else if (decimal === 0) {
          valstr = this.toFixed(val, 0);
        } else {
          valstr = this.toFixed(val, 2);
        }
      }

      var sign = valstr.replace(/[^\+\-]/g,'');//正负符号
      valstr = valstr.replace(/[^\d\.]/g, '');//去掉非数字和小数点
      //分割
      if (this.properties.separator && this.properties.separateLength) {
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
     if(sign){
       valstr = sign + valstr;
     }
      //输出
      this.setData({
        formattedValue: valstr
      });
      return valstr;
    }
  },
  ready: function () {
    this.format();
  }
})
