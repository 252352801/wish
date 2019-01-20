// components/wallets-password/wallets-password.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {//标题
      type: String,
      value: '请输入密码',
    },
    urlText: {//url的文字
      type: String,
      value: '忘记密码',
    },
    visible: {//控制显示&隐藏
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if(newVal){
            this.open();
          }else{
            this.close();
          }
        }
      }
    },
    amount: {//显示的金额
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
      }
    },
    password: String,//密码
    passwordLength:{//密码长度
      type: Number,
      value: 6,
      observer: function (newVal, oldVal) {
      }
    },
    url:String, //忘记密码的url
  },

  /**
   * 组件的初始数据
   */
  data: {
    isFocus:false,
    inputGrids:[]//装载输入的格子
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focus:function(){
      this.setData({
        isFocus:true
      });
    },
    setPassword:function(e){
      this.setData({
        password: e.detail.value
      });
      if (this.data.password.length == 6) {//密码长度6位时
        this.close();
        setTimeout(() => {
          this.triggerEvent('output',{//输出
            data:this.data.password
          },{})
        }, 100);
      }
    },
    open:function(){//打开
      this.setData({
        password:'',
        inputGrids: this.createGrids(),
        isFocus: true,
        visible: true
      });
    },
    close:function() {//关闭
      this.setData({
        isFocus: false,//失去焦点
        visible: false//关闭
      });
    },
    createGrids:function(){//创建格子
      var grids=[];
      var len = parseInt(this.data.passwordLength);
      if (len){
        for(var i=0;i<len;i++){
          grids.push(i);
        }
      }
      return grids;
    }
  }
})
