// components/navigation-bar/navigation-bar.js
const app = getApp()
Component({
  properties: {
    title: {
      type: String,
      value: 'Wechat'
    },
    back: {
      type: Boolean,
      value: false
    },
    home: {
      type: Boolean,
      value: false
    }
  },
  data: {},
  lifetimes: {
    attached() {
      this.setData(app.globalData.navBar)
    },
  },
  methods: {
    back() {
      wx.navigateBack({
        delta: 1
      })
    },
    home() {
      let pages = getCurrentPages()
      wx.navigateBack({
        delta: pages.length
      })
    },
  }
})