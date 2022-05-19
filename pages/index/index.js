//index.js
const app = getApp()
Page({
  data: {
    navBarHeight: app.globalData.navBar.navBarHeight,
    menu: [
      { url: '/pages/playground1/index', name: '仿抖音翻页' },
      { url: '/pages/playground2/index', name: '开关按钮' },
      { url: '/pages/playground3/index', name: '抽奖转盘' },
      { url: '/pages/playground4/index', name: '彩票选号' },
      { url: '/pages/playground5/index', name: '微信API' },
    ]
  },
})
