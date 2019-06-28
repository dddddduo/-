const $ = getApp().globalData
Page({
  data: {
    settlementList:[],
    _url: $.host
  },
  onLoad: function (e) {
    const that = this
    wx.request({
      url: $.prod + '/operator/coconfirm/settlement/detail',
      data: {settlementId: e.id, confirmId: e.confirmId},
      header: {'Auth-Token': wx.getStorageSync('token')},
      success: function (res) {
        // console.log(res)
        if (res.data.code === 200) {
          that.setData({settlementList: res.data.data.items})
        }
      }
    })
  }
})
