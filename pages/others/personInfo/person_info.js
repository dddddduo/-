const $ = getApp().globalData
Page({
  data: {
    detail: {},
    showOrEdit: true,
    errInfo: ''
  },
  onLoad: function (e) {
    const that = this
    if (e.init) {
      that.setData({showOrEdit: false})
    } else {
      wx.request({
        url: $.prod + '/operator/getoperator',
        method: 'GET',
        header: {
          'Auth-Token': wx.getStorageSync('token')
        },
        data: {personId: wx.getStorageSync('auth').id, key: ''},
        success: function (res) {
          let detail = res.data.data.operator
          that.setData({detail})
        }
      })
    }
  },
  // 获取输入
  handleInput (e) {
    const key = e.currentTarget.dataset.key
    const {detail} = this.data
    detail[key] = e.detail.value
    this.setData({detail})
  },
  handleChange () {
    // this.setData({showOrEdit: !this.data.showOrEdit})
    const that = this
    const {detail, showOrEdit} = that.data
    that.setData({errInfo: ''})
    if (!showOrEdit) {
      wx.showLoading({
        title: '修改中'
      })
      let header = {
        "Auth-Token": wx.getStorageSync('token')
      }
      const data = {
        userName: wx.getStorageSync('userName'),
        name: detail.name,
        email: detail.email,
        officePhone: detail.office_phone,
        wechat: detail.wechat,
        qq: detail.qq,
        idNumber: detail.idNumber,
        role: '经办人',
        company: detail.company
      }
      let params = `personId=${wx.getStorageSync('auto').id}&phone=${detail.phone}&userName=${data.userName}&name=${detail.name}&email=${data.email|| ''}&officePhone=${data.officePhone || ''}&wechat=${data.wechat || ''}&qq=${data.qq || ''}&idNumber=${data.idNumber || ''}&role=经办人&company=${data.company || ''}`
      wx.request({
        url: $.prod + '/operator/responsible/person?' + params,
        method: 'PUT',
        header,
        // data: data,
        success: function (res) {
          wx.hideLoading()
          if (res.data.code === 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'success'
            })
            that.setData({showOrEdit: !showOrEdit})
          } else {
            that.setData({errInfo: res.data.message})
          }
        }
      })
    } else {
      wx.showLoading({
        title: '修改',
        success: function () {
          setTimeout(() => {
            wx.hideLoading()
            that.setData({showOrEdit: !showOrEdit})
          }, 300)
        }
      })
    }
  }
})
