//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 自定义导航栏相关位置信息
    const navBar = {}
    const systemInfo = wx.getSystemInfoSync()
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
    // 状态栏高度
    navBar.statusBarHeight = systemInfo.statusBarHeight
    // 胶囊栏高度 = 胶囊按钮高度 + 胶囊上下margin
    navBar.menuBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height
    // 导航栏总高度 = 状态栏高度 +胶囊栏高度
    navBar.navBarHeight = navBar.statusBarHeight + navBar.menuBarHeight
    // 胶囊按钮尺寸位置信息
    navBar.menuBottom = menuButtonInfo.top - systemInfo.statusBarHeight
    navBar.menuRight = systemInfo.screenWidth - menuButtonInfo.right
    navBar.menuHeight = menuButtonInfo.height
    this.globalData.navBar = navBar
  },
  globalData: {
    token: '',
    user: {},
    service: 'http://192.168.188.23:8090/',
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
  uploadFile(param) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${this.globalData.service}${param.url}`,
        header: {
          'Authorization': this.globalData.token ? `Bearer ${this.globalData.token}` : '',
        },
        filePath: param.filePath,
        name: param.name || 'file',
        formData: param.formData || {},
        success (res){
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