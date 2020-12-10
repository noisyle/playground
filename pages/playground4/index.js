// pages/playground4/index.js
const app = getApp()
Page({
  data: {
    lotterys: [{
        "code": "dlt",
        "name": "大乐透"
      },
      {
        "code": "ssq",
        "name": "双色球"
      },
      {
        "code": "fc3d",
        "name": "福彩3D"
      },
      {
        "code": "pl3",
        "name": "排列三"
      },
      {
        "code": "pl5",
        "name": "排列五"
      },
      {
        "code": "qxc",
        "name": "七星彩"
      },
      {
        "code": "qlc",
        "name": "七乐彩"
      }
    ],
    pickerType: '',
    pickerHeight: 0,
    pickerTop: 9999
  },

  onLoad: function (options) {
    const res = wx.getSystemInfoSync()
    this.setData({
      pickerHeight: res.windowHeight,
      pickerTop: res.windowHeight
    })
  },

  bindTap(e) {
    this.setData({
      pickerType: e.currentTarget.dataset.value,
      pickerTop: 0
    })
  },

  bindSubmit(e) {
    this.setData({
      pickerTop: this.data.pickerHeight
    })
    wx.showToast({
      title: JSON.stringify(e.detail.value),
      icon: 'none'
    })
  }
})