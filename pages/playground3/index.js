// pages/playground3/index.js
const colorArr = ['#FFFFCC', '#CCFFFF', '#FFCCCC', '#FFFF99', '#CCCCFF'] // demo用的背景色数组
let running = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rewards: [],
    rotate: 0,
  },

  onReady() {
    let rewards = ['奖品1', '奖品2', '奖品3', '奖品4', '奖品5', '奖品6', '奖品7', '奖品8']
    rewards = rewards.map((e, i) => {return {
      idx: i,
      name: e,
      angle: (i === rewards.length - 1) ? 360 - Math.round(360 / rewards.length) * (rewards.length - 1) : Math.round(360 / rewards.length),
      color: colorArr[i % colorArr.length]
    }})
    this.setData({
      rewards: rewards,
    })
  },

  rotate () {
    if(running) return
    running = true
    this.setData({
      rotate: this.data.rotate + Math.round(360 * (5 + Math.random()))
    })
    setTimeout(() => {running = false}, 5100)
  },
})