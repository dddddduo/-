const $ = getApp().globalData
Page({
  data: {
    detail: {}
  },
  onLoad: function (e) {
    // console.log(e.id)
    const that = this
    const messageId = e.id
    wx.request({
      url: $.prod + '/msg/one',
      header: {
        "Auth-Token": wx.getStorageSync('token')
      },
      data: {messageId},
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {
          let str = res.data.data.msg.title.length > 11 ? res.data.data.msg.title.substring(0, 9) + '...' : res.data.data.msg.title
          wx.setNavigationBarTitle({title: str})
          that.setData({detail: {...res.data.data.msg}})
        }
      }
    })
  }
})
