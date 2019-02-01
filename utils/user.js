let nickName=wx.getStorageSync('nickName')
let avatar = wx.getStorageSync('avatar')
class User{
  get nickName(){
    return nickName
  }
  get avatar(){
    return avatar
  }
  set nickName(val){
    nickName=val
    wx.setStorageSync('nickName', val)
  }
  set avatar(val){
    avatar = val
    wx.setStorageSync('avatar', val)
  }
  loginHandlers = []
  isLogining = false
  onLogin(fn) {
    this.loginHandlers.push(fn)
  }
  login(request) {
    this.isLogining = true
    wx.login({
      success: res => {
        if (res.code) {
          request({
            path: 'user/login',
            data: {
              code: res.code,
            },
            method: 'POST',
            success: (res) => {
              console.log(res)
              if(res.ok){
                wx.setStorageSync('token', res.body.token)
                while (this.loginHandlers.length) {
                  const fn = this.loginHandlers.shift()
                  if (typeof fn === 'function') {
                    fn()
                  }
                }
              }
            },
            fail: (res) => {
              //登录失败处理
            },
            complete: (res) => {
              this.isLogining = false
            },
          })
        }
      }
    })
  }
}
export const user=new User()