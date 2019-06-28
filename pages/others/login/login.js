const $ = getApp().globalData;
Page({
  data: {
    phone: '',
    conutNum: '获取验证码',
    code: '',
    infoTip: ''
  },
  // 获取输入
  handleInput (e) {
    if (e.target.dataset.key === 'phone') {
      this.setData({phone: e.detail.value})
    } else if (e.target.dataset.key === 'code') {
      this.setData({code: e.detail.value})
    }
  },
  // 获取验证码
  handleCode () {
    const that = this
    that.setData({ infoTip: '' })
    if (that.data.conutNum === '获取验证码') {
      const phone = that.data.phone
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        that.setData({ infoTip: '请输入正确的手机号' })
      } else {
        wx.showLoading({title: '获取中'})
        // 获取验证码
        wx.request({
          url: $.prod + '/login/validatecode',
          method: 'GET',
          data: {userName: phone},
          success: (code) => {
            console.log(code)
            if (code.data.code === 200) {
              that.handleCount()
              wx.hideLoading()
            } else {
              wx.hideLoading()
              that.setData({ infoTip: code.data.message })
            }
          },
          fail: () => {
            wx.hideLoading()
            that.setData({ infoTip: res.data.message })
          }
        })
        // wx.request({
        //   url: $.api + '/',
        //   method: 'GET',
        //   data: { phone },
        //   success: function (res) {
        //     // console.log(res)
        //     if (res.data.code === 200) {
        //       that.handleCount()
        //     } else {
        //       that.setData({ infoTip: res.data.message })
        //     }
        //   },
        //   complete (res) {
        //     wx.hideLoading()
        //   }
        // })
      }
    }
  },
  handleCount (num) {
    const that = this
    let n = num || 120
    that.setData({conutNum: `${n}s`})
    var timer = setInterval(() => {
      if (n === 0) {
        that.setData({conutNum: '获取验证码'})
        clearInterval(timer)
      } else {
        n--
        that.setData({conutNum: n + 's'})
      }
    }, 1000)
  },
  handleLogin () {
    const that = this
    that.setData({ infoTip: '' })
    const { phone, code } = this.data
    if (!phone) {
      that.setData({ infoTip: '手机号格式错误' })
    } else if (!code) {
      that.setData({ infoTip: '请填写验证码' })
    } else {
        wx.showLoading({title: '登录中'})
        wx.request({
        url: $.prod + `/login/RapidLanding?userName=${phone}&phoneCode=${code}`,
        method: 'POST',
        header: $.header,
        success: (res) => {
          console.log(res)
          if (res.data.code === 200) {
            for (let item in res.data.data) {
              wx.setStorageSync(item, res.data.data[item])
            }
            $.token = res.data.data.token
            if (res.data.data.auth.iDnumber) {
              wx.switchTab({
                url: '/pages/index/index'
              })
            } else {
              wx.redirect({
                utl: '/pages/others/add_info/add_info'
              })
            }
          } else {
            wx.hideLoading()
            that.setData({ infoTip: res.data.message })
          }
        },
        fail: (err) => {}
      })
      // wx.request({
      //   url: $.api + '/login',
      //   method: 'GET',
      //   data: {phone, code},
      //   success: function (res) {
      //     // console.log(res)
      //     if (res.data.code === 200) {
      //       console.log(res)
      //       wx.clearStorage({
      //         success: function () {
      //           wx.setStorageSync('_id', res.data.data._id)
      //           wx.setStorageSync('id', res.data.data.id)
      //           $.token = res.data.data._id
      //           wx.switchTab({
      //             url: '/pages/index/index'
      //           })
      //         }
      //       })
      //     } else {
      //       that.setData({ infoTip: res.data.message })
      //     }
      //   }
      // })
    }
  }
})
