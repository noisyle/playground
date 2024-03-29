// pages/playground1/index.js
const app = getApp()
const colorArr = ['#FFFFCC', '#CCFFFF', '#FFCCCC', '#FFFF99', '#CCCCFF'] // demo 用的背景色数组
let dataList = [], dataPage = 1, windowCursor = 0 // 窗口在列表中的起始位置指针
Page({

  data: {
    navBarHeight: app.globalData.navBar.navBarHeight,
    // 滑块窗口，长度为 3
    swiperWindow: [],
    // 屏幕在窗口中的位置指针
    swiperCursor: 0
  },

  onLoad() {
    dataList = [], dataPage = 1, windowCursor = 0
    this._loadData().then(res => {
      dataList = Array.prototype.concat.apply(dataList, res.data)
      const swiperWindow = dataList.slice(windowCursor, windowCursor + 3)
      this.setData({ swiperWindow: swiperWindow })
    })
  },

  bindSwiper(e) {
    const swiperCursor = e.detail.current
    if(swiperCursor === 0) {
      // 向上划动
      if(windowCursor > 0) {
        // 窗口上方还有数据，将窗口上移
        this._moveSwiperWindow(false)
      } else {
        // TODO 上划刷新？反向循环？
        wx.showToast({
          title: `回到顶部`,
          icon: 'none'
        })
        this.setData({
          swiperCursor: 0
        })
      }
    } else if(swiperCursor === 1) {
      // 从顶部向下划动，不移动窗口
        this.setData({
          swiperCursor: 1
        })
    } else if(swiperCursor === 2) {
      // 向下划动
      if(dataList.length - windowCursor > 3) {
        // 窗口下方还有数据，将窗口下移
        this._moveSwiperWindow(true)
      } else {
        // 窗口下方已无数据，尝试加载一页数据后再将窗口下移
        this._loadData().then(res => {
          if(res.data.length) {
            dataList = Array.prototype.concat.apply(dataList, res.data)
          }
          this._moveSwiperWindow(true)
        })
      }
    }
  },

  /**
   * 向指定方向移动窗口 1 格，并根据窗口范围内的数据更新 swiper
   * @param {boolean} moveDown true:向下移动 false:向上移动
   */
  _moveSwiperWindow(moveDown) {
    moveDown ? windowCursor++ : windowCursor--
    let swiperCursor = 1
    if(windowCursor + swiperCursor > dataList.length - 1) {
      windowCursor = swiperCursor = 0
      wx.showToast({
        title: `开始循环`,
        icon: 'none'
      })
    }
    if(dataList.length - windowCursor >= 3) {
      // 列表中剩余数据足够
      const swiperWindow = dataList.slice(windowCursor, windowCursor + 3)
      this.setData({ swiperWindow: swiperWindow, swiperCursor: swiperCursor })
    } else {
      // 列表中剩余数据不足窗口大小，从列表顶部截取数据填充窗口，实现循环显示的效果
      const part1 = dataList.slice(windowCursor, dataList.length), part2 = dataList.slice(0, 3 - part1.length)
      const swiperWindow = Array.prototype.concat.apply(part1, part2)
      this.setData({ swiperWindow: swiperWindow, swiperCursor: swiperCursor })
    }
  },

  // 请求后台加载数据
  _loadData() {
    return new Promise((resolve, reject) => {
      // demo 模拟 3 页数据
      if(dataPage > 3) {
        resolve({data: []})
        return
      }
      wx.showToast({
        title: `加载第 ${dataPage} 页`,
        icon: 'none'
      })
      const data = new Array(5).fill('').map((e, i) => {return {id: (dataPage - 1) * 5 + i + 1, color: colorArr[i]}})
      dataPage++

      resolve({data: data})
    })
  },
})