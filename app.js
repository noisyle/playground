//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 自定义导航栏相关
    const navBar = {}
    const systemInfo = wx.getSystemInfoSync()
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    navBar.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight
    navBar.menuBottom = menuButtonInfo.top - systemInfo.statusBarHeight
    navBar.menuRight = systemInfo.screenWidth - menuButtonInfo.right
    navBar.menuHeight = menuButtonInfo.height
    this.globalData.navBar = navBar
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