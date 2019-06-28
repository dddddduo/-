// pages/others/flash/flash.js
Page({
  data: {
    slogan: '用科技 , 改变信贷'
  },
  onLoad: function (options) {
    setTimeout(() => {
      wx.getStorage({
        key: 'token',
        success: function (res) {
          console.log(res)
          getApp().globalData.token = res.data
          wx.switchTab({
            url: '/pages/index/index'
          })
        },
        fail: function (err) {
          wx.redirectTo({
            url: '/pages/others/login/login'
          })
        }
      })
    }, 3000)
  }
})