const $ = getApp().globalData
Page({
  data: {
    depositList: [],
    _url: $.host
  },
  onLoad: function (e) {
    const that = this
    wx.request({
      url: $.prod + '/operator/coconfirm/payment/detail',
      data: {paymentId: e.id, confirmId: e.confirmId},
      header: {'Auth-Token': wx.getStorageSync('token')},
      success: function (res) {
        // console.log(res)
        if (res.data.code === 200) {
          that.setData({depositList: res.data.data.items})
        }
      }
    })
  }
})
