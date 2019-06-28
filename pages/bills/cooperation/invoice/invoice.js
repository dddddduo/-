const $ = getApp().globalData
Page({
  data: {
    invioList: [],
    typeList:  ['增值税普通发票', '增值税普通发票（卷式）', '增值税电子普通发票', '增值税专用发票', '通用机打发票', '增值税机动车发票', '二手车统一发票', '其他'],
    _url: $.host
  },
  onLoad: function (e) {
    const that = this
    wx.request({
      url: $.prod + '/operator/coconfirm/invoice/detail',
      data: {invoiceId: e.id, confirmId: e.confirmId},
      header: {'Auth-Token': wx.getStorageSync('token')},
      success: function (res) {
        // console.log(res)
        if (res.data.code === 200) {
          that.setData({invioList: res.data.data.items})
        }
      }
    })
  }
})
