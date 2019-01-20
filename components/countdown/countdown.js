// components/countdown/countdown.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: {//起始文字
      type: String,
      value: ''
    },
    type: {//类型
      type: String,
      value: 'number' //number second minute hour datetime
    },
    format: String,//格式化
    startValue: Number,//起始值
    targetValue: {//目标值
      type: Number,
      value: 0
    },
    direction: null,//方向  默认0从高到底 1从低到高 
    onStart: null,//开始
    onCompelete: null,//完成
    onError: null//出错
  },

  /**
   * 组件的初始数据
   */
  data: {
    ready: true,//是否就绪,
    value: null,//当前值
  },

  /**
   * 组件的方法列表
   */
  methods: {
    run: function (e) {
      console.log('run...');
      console.log(this.properties);
      if (this.properties.type === 'number') {
        console.log(this.properties.startValue);
        if (this.properties.startValue > this.properties.targetValue) {
          console.log('countdown');
          this.setData({
            value: this.properties.startValue
          });
          var countdown =(current, target)=>{
            if (typeof current === 'number' && typeof target === 'number') {
              if (current > target) {
                var delay = 1000;//延时
                setTimeout(() => {
                  this.setData({
                    value: this.data.value - 1
                  });
                  countdown(this.data.value, this.properties.targetValue);
                }, 1000);
              } else {

              }
            }
          };
          countdown(this.data.value, this.properties.targetValue);
        }
      }
    }
  },
  ready: function () {
    this.setData({
      value: this.properties.label
    });
  }
})
