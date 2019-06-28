const $ = getApp().globalData
Page({
  data: {
    pic: {},
    picPath: {},
    canISubmit: false,
    userInfo: {},
    errInfo: ''
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
        if (res.data.code === 200) {
          let userInfo = res.data.data.operator
          if (userInfo.idcardFront && userInfo.idcardBack) {
            const pic = {
              idcardFront: $.host + userInfo.idcardFront,
              idcardBack: $.host + userInfo.idcardBack
            }
            const picPath = {
              idcardFront: userInfo.idcardFront,
              idcardBack: userInfo.idcardBack
            }
            that.setData({pic, picPath})
          } else {
            that.setData({canISubmit: true})
          }
          that.setData({userInfo})
        }
      }
    })
  },
  handleUpload (e) {
    const that = this
    let { pic, picPath, canISubmit } = that.data
    if (canISubmit) {
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: function (res) {
          wx.showLoading({
            title: '上传中',
            mask: true
          })
          const filePath = res.tempFilePaths[0]
          wx.uploadFile({
            url: $.prod + '/file/upload',
            dataType: 'json',
            filePath,
            formData: {
              timestamp: new Date().getTime(),
              sign: '',
              type: '1'
            },
            name: 'file',
            header: {'Auth-token': wx.getStorageSync('token')},
            success: function (res) {
              wx.hideLoading()
              let resJSON = JSON.parse(res.data)
              console.log(resJSON)
              pic[e.currentTarget.dataset.key] = $.host + resJSON.data.fileUrl
              picPath[e.currentTarget.dataset.key] = resJSON.data.fileUrl
              that.setData({pic, picPath})
            }
          })
        }
      })
    }
  },
  handleSubmit () {
    const that = this
    const {picPath, userInfo} = that.data
    that.setData({errInfo: ''})
    if (picPath.idcardFront && picPath.idcardBack) {
      wx.showLoading({title: '审核中', mask: true})
      let str = `?userName=${userInfo.phone}&personId=${userInfo.id}&idcardFront=${picPath.idcardFront}&idcardBack=${picPath.idcardBack}&sign=''`
      wx.request({
        url: $.prod + '/operator/responsible/person/card' + str,
        method: 'PUT',
        header: {'Auth-Token': wx.getStorageSync('token')},
        success: function (res) {
          wx.hideLoading()
          console.log(res)
          if (res.data.code === 200) {
            that.setData({canISubmit: false})
          } else {
            that.setData({errInfo: res.data.message})
          }
        }
      })
    }
  }
})
