//app.js
const util = require('./utils/util.js')
App({
  onLaunch: function () {
    const that = this
    wx.getStorage({
      key: '_id',
      success: function (res) {
        that.globalData.token = res.data
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res)
            // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  console.log(res)
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      console.log(res)
                      // 可以将 res 发送给后台解码出 unionId
                      this.globalData.userInfo = res.userInfo
                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      console.log(this)
                      if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(res)
                      }
                    },
                    fail: function (res) {
                      console.log(res)
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: {},
    api: 'http://10.1.1.113',
    header: {'content-type': 'application/json'},
    host: 'https://dev.ninstarscf.com',
    prod: 'https://dev.ninstarscf.com/api/sw'
  },
  $utils: {
    ...util,
    axios: function (a) {
      return new Promise((resolve, reject) => {
        if (a > 3) {
          resolve('a > 3')
        } else {
          reject('a not gt 3')
        }
      })
    }
  }
})
