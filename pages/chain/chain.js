const $ = getApp().globalData
Page({
  data: {
    list: [],
    types: [
      {title: '全部', key: 0},
      {title: '采购记账', key: 1},
      {title: '销售记账', key: 2}
    ],
    selIndex: 0,
    selType: 0,
    page: 1
  },
  onLoad: function () {
    this.handleAjax(this.data.selIndex, this.data.selType, this.data.page)
  },
  handleAjax (status, contractType) {
    const that = this
    wx.request({
      url: $.prod + '/operator/responsible/person/Contract',
      method: 'GET',
      header: {
        "Auth-Token": wx.getStorageSync('token')
      },
      data: {personId: wx.getStorageSync('auth').id, status, contractType: (contractType === 0) ? '' : contractType, page: that.data.page},
      success: function (res) {
        that.setData({list: res.data.data.contracts, page: that.data.page + 1})
      }
    })
  },
  handleIndex (e) {
    const type = e.currentTarget.dataset.index
    this.setData({selIndex: Number(type), page: 1})
    this.handleAjax(type, this.data.selType, this.data.page)
  },
  handleType (e) {
    console.log(e)
    const contractType = e.currentTarget.dataset.type
    this.setData({selType: Number(contractType), page: 1})
    this.handleAjax(this.data.selIndex, contractType, this.data.page)
  },
  handleDetail (e) {
    const {id, title} = e.currentTarget.dataset
    console.log(id)
    wx.navigateTo({
      url: `/pages/others/chainDetail/chain_detail?id=${id}&title=${title}`
    })
  },
  onReachBottom: function () {
    this.handleAjax(this.data.selIndex, this.data.selType, this.data.page)
  },
})
