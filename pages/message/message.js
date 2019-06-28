// pages/analyse/analyse.js
const $ = getApp().globalData
Page({
  data: {
    messageList: [],
    page: 1,
    more: false
  },
  onLoad: function () {
    this.handleAjax()
  },
  handleAjax () {
    const that = this
    wx.request({
      url: $.prod + '/msg/list',
      method: 'GET',
      header: {
        "Auth-Token": wx.getStorageSync('token')
      },
      data: {page: that.data.page},
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {
          that.setData({messageList: that.data.messageList.concat(res.data.data.msgs)})
          let page = that.data.page + 1
          that.setData({page, more: false, hasMore: res.data.data.length < 12 ? false : true})
        }
      }
    })
  },
  onReachBottom: function () {
    const that = this
    const {hasMore} = that.data
    if (hasMore) {
      that.setData({more: true})
      setTimeout(() => {
        that.handleAjax()
      }, 200)
    }
  },
  handleDetail (e) {
    // console.log(e)
    const _id = e.currentTarget.dataset.id
    // console.log(_id)
    wx.navigateTo({
      url: '/pages/others/messageDetail/message_detail?id=' + _id
    })
  }
})
