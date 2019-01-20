const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 是否是金额
 * @param value 需校验的值
 */
function isCurrency(value) {
  var regexp = /^\d+(\.\d+)?$/;
  return regexp.test(value + '');
}

/**
 * 隐藏部分真实姓名
 * @param str <String> 真实姓名
 * return <String>
 */
function hideRealName(str) {
  if (typeof str === 'string') {
    var len = str.length;
    if (len <= 1) {
      return '*';
    } else if (len === 2) {
      return str.replace(/^(.{1})(.*)$/, '$1*');
    } else {
      return str.replace(/^(.{1})(.*)(.{1})$/, '$1*$3');
    }
  }
  return str;
}

/**
 * 隐藏部分身份证号
 * @param str <String> 身份证号
 * return <String>
 */
function hideIDCardNo(str) {
  if (typeof str === 'string') {
    return str.replace(/^(.{4})(.*)(.{4})$/, '$1**********$3');
  }
  return str;
}

/**
 * 隐藏部分手机号
 * @param str <String> 手机号
 * return <String>
 */
function hideCellphoneNo(str) {
  if (typeof str === 'string') {
    return str.replace(/^(.{3})(.*)(.{4})$/, '$1****$3');
  }
  return str;
}

/**
 * 隐藏部分银行卡号
 * @param str <String> 银行卡号
 * return <String>
 */
function hideBankCardNo(str) {
  if (typeof str === 'string') {
    return str.replace(/^(.*)(.{4})$/, '****$2');
  }
  return str;
}

/**
 * 隐藏部分公司名
 * @param str <String> 公司名
 * return <String>
 */
function hideCompanyName(str) {
  if (typeof str === 'string') {
    return str.replace(/^(.{2})(.*)(.{2})$/, '$1***$3');
  }
  return str;
}

/**
 * 加
 * @param val1加数1
 * @param val2加数2
 * @return Number
 */
function add(val1, val2) {
  if (typeof val1 === 'number' && typeof val2 === 'number') {
    var result = val1 + val2, //初始相加结果
      decimal1 = 0, //加数1小数位
      decimal2 = 0, //加数2小数位
      maxdec = 0, //相加可能的最大小数位
      decimalresult = 0; //结果的小数位
    if ((val1 + '').indexOf('.') >= 0) {
      decimal1 = (val1 + '').split('.')[1].length;
    }
    if ((val2 + '').indexOf('.') >= 0) {
      decimal2 = (val2 + '').split('.')[1].length;
    }
    maxdec = decimal1 > decimal2 ? decimal1 : decimal2;
    if ((result + '').indexOf('.' >= 0)) {
      decimalresult = (result + '').split('.')[1].length;
    }
    if (decimalresult > maxdec) {
      var times = Math.pow(10, maxdec);
      result = parseInt(result * times + '') / times;
    }
    return result;
  }
}

/**
 * 减
 * @param val1被减数
 * @param val2减数
 * @return Number
 */
function subtract(val1, val2) {
  if (typeof val1 === 'number' && typeof val2 === 'number') {
    var result = val1 - val2, //初始减结果
      decimal1 = 0, //被减数小数位
      decimal2 = 0, //减数小数位
      maxdec = 0, //相减可能的最大小数位
      decimalresult = 0; //结果的小数位
    if ((val1 + '').indexOf('.') >= 0) {
      decimal1 = (val1 + '').split('.')[1].length;
    }
    if ((val2 + '').indexOf('.') >= 0) {
      decimal2 = (val2 + '').split('.')[1].length;
    }
    maxdec = decimal1 > decimal2 ? decimal1 : decimal2;
    if ((result + '').indexOf('.') >= 0) {
      decimalresult = (result + '').split('.')[1].length;
    }
    if (decimalresult > maxdec) {
      var times = Math.pow(10, maxdec);
      result = parseInt(result * times + '') / times;
    }
    return result;
  }
}

/**
 * 乘 
 * @param val1乘数
 * @param val2乘数
 * @return Number
 */
const mul = (val1, val2) => {
  var decimal1 = 0;
  var decimal2 = 0;
  if ((val1 + '').indexOf('.') >= 0) {
    decimal1 = (val1 + '').split('.')[1].length;
  }
  if ((val2 + '').indexOf('.') >= 0) {
    decimal2 = (val2 + '').split('.')[1].length;
  }
  var m = decimal1 + decimal2;
  var res = val1 * val2 * Math.pow(10, m) + '';
  if (res.indexOf('.') >= 0) {
    let splits = res.split('.');
    let dec = splits[1];
    if (splits[1].length > m) {
      res = splits[0] + '.' + splits[1].substring(0, m + 1);
    }
  }
  return Math.round(+res) / Math.pow(10, m);
};

/**
 * 除
 * @param val1被除数
 * @param val2除数
 * @return Number
 */
function div(val1, val2) {
  var r1, r2;
  var decimal1 = 0;
  var decimal2 = 0;
  if ((val1 + '').indexOf('.') >= 0) {
    decimal1 = (val1 + '').split('.')[1].length;
  }
  if ((val2 + '').indexOf('.') >= 0) {
    decimal2 = (val2 + '').split('.')[1].length;
  }
  r1 = Number(val1.toString().replace(".", ""))
  r2 = Number(val2.toString().replace(".", ""))
  return mul((r1 / r2), Math.pow(10, decimal2 - decimal1));
}
module.exports = {
  formatTime: formatTime,
  isCurrency: isCurrency, //是否是金额
  hideRealName: hideRealName, //隐藏部分真实姓名
  hideIDCardNo: hideIDCardNo, //隐藏部分身份证号
  hideCellphoneNo: hideCellphoneNo, //隐藏部分身份证号
  hideBankCardNo: hideBankCardNo, //隐藏部分银行卡号
  hideCompanyName: hideCompanyName, //隐藏部分公司名
  add: add, //加
  mul: mul, //乘
  div: div, //除
}