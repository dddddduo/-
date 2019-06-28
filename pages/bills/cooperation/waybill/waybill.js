const $ = getApp().globalData
Page({
  data: {
    waybillList: [],
    _url: $.host
  },
  onLoad: function (e) {
    const that = this
    wx.request({
      url: $.prod + '/operator/coconfirm/transport/detail',
      header: {
        'Auth-Token': wx.getStorageSync('token')
      },
      data: {transportId: e.id, confirmId: e.confirmId},
      success: function (res) {
        // console.log(res)
        if (res.data.code === 200) {
          that.setData({waybillList: res.data.data.items})
        }
      }
    })
  }
})
