const $ = getApp().globalData
Page({
  data: {
    _url: $.host,
    orderList: []
  },
  onLoad: function (e) {
    const that = this
    wx.request({
      url: $.prod + '/operator/coconfirm/order/detail',
      data: {orderId: e.id, confirmId: e.confirmId},
      header: {'Auth-Token': wx.getStorageSync('token')},
      success: function (res) {
        // console.log(res)
        if (res.data.code === 200) {
          that.setData({orderList: res.data.data.items})
        }
      }
    })
  }
})
