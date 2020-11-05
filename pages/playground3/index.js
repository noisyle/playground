// pages/playground3/index.js
const colorArr = ['#FFFFCC', '#CCFFFF', '#FFCCCC', '#FFFF99', '#CCCCFF'] // demo用的背景色数组
let running = false, timer = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rewards: [],
    rotate: 0,
  },

  onReady() {
    this._lottery(new Array(6).fill('').map((e, i) => `奖品${i+1}`))
  },

  onUnload() {
    if(timer) {
      clearTimeout(timer)
      timer = null
      running = false
    }
  },

  _lottery(rewards) {
    // 计算每个奖项在圆盘中所占的角度
    const angle = (360 / rewards.length).toFixed(1)
    rewards = rewards.map((e, i) => {return {
      idx: i,
      name: e,
      offset: angle * i,
      translate: {x: 40 * Math.sin(Math.PI/2 - Math.PI * 2 /rewards.length), y: 150 * Math.sin(Math.PI/2 - Math.PI * 2 / rewards.length)},
      angle: i === rewards.length - 1 ? 360 - (angle * i).toFixed(1) : angle,
      color: i === rewards.length - 1 && colorArr[i % colorArr.length] === colorArr[0] ? colorArr[1] : colorArr[i % colorArr.length] // 防止首尾颜色相同
    }})
    this.setData({
      rewards: rewards,
    })
  },

  rotate() {
    if(running) return
    running = true
    let rotate = this.data.rotate + Math.floor(360 * (10 + Math.random()))
    this.setData({
      rotate: rotate
    })
    timer = setTimeout(() => {
      running = false
      rotate = rotate % 360
      const reward = this.data.rewards.filter(e => e.offset <= rotate && e.offset+e.angle > rotate)[0]
      wx.showToast({
        title: '恭喜获得' + reward.name,
        icon: 'none'
      })
      clearTimeout(timer)
      timer = null
    }, 5100)
  },

  decrease() {
    this._lottery(new Array(this.data.rewards.length <= 4 ? 4 : this.data.rewards.length - 1).fill('').map((e, i) => `奖品${i+1}`))
  },

  increase() {
    this._lottery(new Array(this.data.rewards.length + 1).fill('').map((e, i) => `奖品${i+1}`))
  },
})