const $ = getApp().globalData
Page({
  data: {
    payList: [],
    _url: $.host
  },
  onLoad: function (e) {
    const that = this
    wx.request({
      url: $.prod + '/operator/coconfirm/settlementpay/detail',
      data: {paymentId: e.id, confirmId: e.confirmId},
      header: {'Auth-Token': wx.getStorageSync('token')},
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {
          that.setData({payList: res.data.data.items})
        }
      }
    })
  }
})
