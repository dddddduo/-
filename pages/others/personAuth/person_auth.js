const $ = getApp().globalData
Page({
  data: {
    startRecord: false,
    infoTip: '识别即将开始',
    canIAuth: false,
    showCamera: true,
    // 录制时长
    flag: 12,
    errInfo: '认证即将开始，请选择光源充足的地方进行。',
    errInfo1: '整个过程持续15秒左右。'
  },
  onLoad: function () {
    const that = this
    wx.request({
      url: $.prod + '/operator/getoperator',
      header: {'Auth-Token': wx.getStorageSync('token')},
      data: {personId: wx.getStorageSync('auth').id},
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data.code === 200) {
          if (res.data.data.operator.videoAuth === 1 || res.data.data.operator.videoAuth === 4) {
            that.setData({canIAuth: true})
          }
        }
      }
    })
  },
  handleRecord () {
    const that = this
    this.setData({startRecord: true})
    const ctx = wx.createCameraContext()
    ctx.startRecord({
      success: function (res) {
        // 处理录制逻辑
        // 开始录制
        that.setData({infoTip: '开始录制', showCamera: true})
        let flag = that.data.flag
        let timer = setInterval(() => {
          flag--
          if (flag === 9) {
            that.setData({infoTip: '请眨眼'})
          } else if (flag === 6) {
            that.setData({infoTip: '请张嘴'})
          } else if (flag === 0) {
            clearInterval(timer)
            // 停止录制
            ctx.stopRecord({
              success: function (res) {
                that.setData({showCamera: false, infoTip: ''})
                console.log(res)
                wx.showLoading({
                  title: '审核中'
                })
                let filePath = res.tempVideoPath
                wx.uploadFile({
                  url: $.prod + '/file/upload',
                  filePath,
                  responseText: 'JSON',
                  name: 'file',
                  header: {'Auth-Token': wx.getStorageSync('token')},
                  formData: {
                    type: '1',
                    timestamp: new Date().getTime(),
                    sign: ''
                  },
                  success: function (res2) {
                    let resJSON = JSON.parse(res2.data)
                    if (resJSON.code === 200) {
                      console.log(resJSON)
                      wx.request({
                        url: $.prod + '/operator/responsible/person/video?personId=' + wx.getStorageSync('token') + '&video=' + resJSON.data.fileUrl + '&sign=',
                        method: 'POST',
                        header: {'Auth-Token': wx.getStorageSync('token')},
                        data: {
                          personId: wx.getStorageSync('token'),
                          video: resJSON.data.fileUrl,
                          sign: ''
                        },
                        success: function (res1) {
                          if (res1.data.code !== 200) {
                            that.setData({startRecord: false, infoTip: '', errInfo: '认证失败', errInfo1: res1.data.message})
                          } else {
                            that.setData({canIAuth: false})
                          }
                        },
                        complete: function () {
                          wx.hideLoading()
                        }
                      })
                      // that.setData({canIAuth: false})
                    }
                  }
                })
              },
              fail: function (err) {
                console.log(err)
              }
            })
          }
        }, 1000)
      },
      fail: function (err) {
        console.log(err)
      }
    })

  }
})
