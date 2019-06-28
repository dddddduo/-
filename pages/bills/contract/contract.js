const $ = getApp().globalData
Page({
  data: {
    _url: $.host,
    contract: {
      agents: [],
      attas: []
    }
  },
  onLoad: function (e) {
    const that = this
    wx.request({
      url: $.prod + '/operator/contract',
      data: {contractId: e.id, confirmId: e.confirmId},
      header: {'Auth-Token': wx.getStorageSync('token')},
      success: function (res) {
        // console.log(res)
        if (res.data.code === 200) {
          that.setData({contract: res.data.data.items[0]})
        }
      }
    })
  },
  handlePreview (e) {
    const that = this
    wx.previewImage({
      urls: that.data.contract.attas.filter(val => val.extend !== 'pdf').map(val => val.url),
      current: e.currentTarget.dataset.index
    })
  }
})
