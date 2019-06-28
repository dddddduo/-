const $ = getApp().globalData
Page({
  data: {
    businessList: [],
    page: 3
  },
  onLoad () {
    wx.showLoading({
      title: '加载中...'
    })
    this.handleAjax()
  },
  handleAjax () {
    const that = this
    wx.request({
      url: $.prod + '/operator/getCompany',
      method: 'GET',
      header: {'Auth-Token': wx.getStorageSync('token')},
      data: {personId: wx.getStorageSync('auth').id, page: that.data.page},
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {
          let list = res.data.data.relation
          let businessList = that.data.businessList.concat(list)
          let page = that.data.page + 1
          that.setData({businessList, page})
          wx.hideLoading()
        }
      }
    })
  },
  onReachBottom () {
    this.handleAjax()
  },
  handleChange (e) {
    const ocId = e.target.dataset.id;
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    wx.request({
      url: $.prod + '/operator/getEmpower?ocId=' + ocId + '&sign=' + (e.detail.value ? '1' : '0'),
      method: 'PUT',
      header: {'Auth-token': wx.getStorageSync('token')},
      success: function (res) {
        // console.log(res)
        if (res.data.code === 200) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000
          })
        }
      },
      complete () {
        wx.hideLoading()
      }
    })
  }
})
