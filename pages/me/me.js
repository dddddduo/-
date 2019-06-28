const $ = getApp().globalData;
Page({
  data: {
    userInfo: {
      name: '',
      avatar: '/assets/img/user_app/boss.png'
    },
    status: '0'
  },
  onLoad: function () {
    // 获取认证状态
    const that = this
    wx.request({
      url: $.prod + '/operator/getoperator',
      method: 'GET',
      header: {
        'Auth-Token': wx.getStorageSync('token')
      },
      data: {personId: wx.getStorageSync('auth').id, key: ''},
      success: function (res) {
        let userInfo = res.data.data.operator
        that.setData({userInfo})
      }
    })
  },
  onShow () {
    // 获取认证状态
    const that = this
    wx.request({
      url: $.prod + '/operator/getoperator',
      method: 'GET',
      header: {
        'Auth-Token': wx.getStorageSync('token')
      },
      data: {personId: wx.getStorageSync('auth').id, key: ''},
      success: function (res) {
        let userInfo = res.data.data.operator
        that.setData({userInfo})
      }
    })
  },
  handleDetail (e) {
    const i = e.currentTarget.dataset.index
    const urls = [
      '/pages/others/personInfo/person_info',
      '/pages/others/personCard/person_card',
      '/pages/others/personAuth/person_auth'
    ]
    wx.navigateTo({url: urls[i]})
  }
})
