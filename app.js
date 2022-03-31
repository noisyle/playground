//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  },
  globalData: {
    token: '',
    user: {},
    service: 'http://127.0.0.1:8090/',
    // service: 'https://tm.teweikeji.net/',
  },
  request(param) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.globalData.service}${param.url}`,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': this.globalData.token ? `Bearer ${this.globalData.token}` : '',
        },
        data: param.data || {},
        success(res) {
          if (res.statusCode === 200) {
            resolve(res)
          } else {
            reject(res)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
})