// API
export const getBannerData = () => {
  return new Promise((resolve, reject)=>{
     wx.request({
       url: ``,
       success: function (res) {
         resolve(res.data)
       },
       fail: function (err) {
         reject(err)
       }
     })
  })
}