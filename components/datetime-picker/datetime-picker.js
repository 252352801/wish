// components/datetime-picker.js
const dateTimePicker = require('./datetime-picker.lib.js');
const {datetimeFormat} = require('../../utils/util.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String | Date | Number,
      observer: function(newVal, oldVal) {
        //this.init(newVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    originDatetime:null,
    dateTimeArray: null,
    dateTime: null,
    startYear: 2000,
    endYear: 2050
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(datetime) {
      console.log(datetime)
      const args = [this.data.startYear, this.data.endYear]
      if (!this.data.dateTime&&datetime) {
        args.push(datetimeFormat(datetime, 'yyyy-MM-dd hh:mm:ss'))
      }
      var obj = dateTimePicker.dateTimePicker(...args);
      this.setData({
        originDatetime: [...obj.dateTime],
        dateTime: obj.dateTime,
        dateTimeArray: obj.dateTimeArray,
      });
    },
    createDatetime(){
      const dt = this.data.dateTime
      const datetime=new Date()
      console.log(dt)
      datetime.setFullYear(+('20'+dt[0]))
      datetime.setMonth(dt[1])
      datetime.setDate(dt[2]+1)
      datetime.setHours(dt[3])
      datetime.setMinutes(dt[4])
      datetime.setSeconds(dt[5])
      return datetimeFormat(datetime, 'yyyy-MM-dd hh:mm:ss')
    },
    changeDateTime(e) {
      console.log(e.detail.value)
      this.setData({
        dateTime: e.detail.value
      });
      this.triggerEvent("change", { value: this.createDatetime() })
    },
    cancel(e){
      this.setData({
        dateTime: [...this.data.originDatetime]
      });
    },
    changeDateTimeColumn(e) {
      var arr = this.data.dateTime,
        dateArr = this.data.dateTimeArray;
      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      this.setData({
        dateTimeArray: dateArr,
      //  dateTime: arr
      });
    }
  },
  ready: function() {
    console.log(this.data.value)
    this.init(this.data.value)
  }
})