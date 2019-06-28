const $ = getApp().globalData
Page({
  data: {
    deliveryList: [],
    _url: $.host
  },
  onLoad: function (e) {
    const that = this
    wx.request({
      url: $.prod + '/operator/coconfirm/warehouse/detail',
      header: {
        'Auth-Token': wx.getStorageSync('token')
      },
      data: {warehouseId: e.id, confirmId: e.confirmId},
      success: function (res) {
        // console.log(res)
        if (res.data.code === 200) {
          that.setData({deliveryList: res.data.data.items})
        }
      }
    })
  }
})
