// pages/playground2/index.js
let innerAudioContext, windowHeight, busy = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen: true
  },

  onLoad(options) {
    innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: true
    })
    innerAudioContext.src = '/pages/playground2/button.mp3'
    innerAudioContext.onPlay(() => {
      this.setData({
        isOpen: !this.data.isOpen
      })
    })

    const res = wx.getSystemInfoSync()
    windowHeight = res.windowHeight
  },

  onUnload() {
    innerAudioContext.destroy()
    innerAudioContext = null
  },

  bindTap() {
    if(!innerAudioContext.paused) {
      innerAudioContext.stop()
    }
    innerAudioContext.play()
  },

  bindTouchMove(e) {
    if(busy) return
    busy = true
    const touchY = e.touches[0].pageY
    if(touchY < windowHeight / 2 - 10 && this.data.isOpen) {
      this.bindTap()
    } else if(touchY > windowHeight / 2 + 10 && !this.data.isOpen) {
      this.bindTap()
    }
    busy = false
  },
})