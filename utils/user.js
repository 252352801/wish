class User{
  nickName=''
  avatar=''
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
              while (this.loginHandlers.length) {
                const fn = this.loginHandlers.shift()
                if (typeof fn === 'function') {
                  fn()
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