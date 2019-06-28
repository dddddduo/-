const $ = getApp().globalData
Page({
  data: {
    accepList: [],
    _url: $.host
  },
  onLoad: function (e) {
    const that = this
    wx.request({
      url: $.prod + '/operator/coconfirm/acceptance/detail',
      header: {
        'Auth-Token': wx.getStorageSync('token')
      },
      data: {acceptanceId: e.id, confirmId: e.confirmId},
      success: function (res) {
        // console.log(res)
        if (res.data.code === 200) {
          that.setData({accepList: res.data.data.items})
        }
      }
    })
  }
})
