const $ = getApp().globalData
Page({
  data: {
    info: {},
    errInfo: ''
  },
  handleInput (e) {
    let info = this.data.info
    // console.log(this)
    info[e.currentTarget.dataset.key] = e.detail.value
    this.setData({info})
  },
  handleBack () {
    wx.clearStorage({key: 'auth'})
    wx.clearStorage({key: 'token'})
    wx.redirectTo({url: '/pages/others/login/login'})
  },
  // 实名认证
  handleAuth () {
    const that = this
    that.setData({errInfo: ''})
    let info = that.data.info
    if (!info.name) {
      that.setData({errInfo: '请输入真实姓名'})
    } else {
      if (!info.iDnumber) {
        that.setData({errInfo: '请输入身份证号码'})
      } else {
        wx.request({
          url: $.prod + `/operator/register/person?personId=${info.id}&name=${info.name}&idNumber=${info.iDnumber}&phone=${info.phone}`,
          method: 'PUT',
          success: function (res) {
            if (res.data.code === 200) {
              let auth = wx.getStorageSync('auth')
              auth.iDnumber = info.iDnumber
              auth.name = info.name
              wx.setStorage({
                key: 'auth',
                data: auth,
                success: function () {
                  wx.switchTab({
                    url: '/pages/index/index'
                  })
                }
              })
            } else {
              that.setData({errInfo: res.data.message})
            }
          }
        })
      }
    }

  }
})
