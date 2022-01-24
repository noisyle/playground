// pages/playground5/index.js
const app = getApp()
Page({

  data: {

  },

  registerOrLogin() {
    new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    }).then(res => {
      app.request({url: 'auth/login', data: {code: res.code}}).then(res => {
        console.log(`登陆成功，openid: ${res.data.openid}`)
        const {userid, token, user} = res.data
        app.globalData.userid = userid
        app.globalData.token = token
        app.globalData.user = user
      })
    })
  },

  me() {
    app.request({url: 'user/me'}).then(res => {
      console.log(res)
    })
  },

  getPhoneNumber(e) {
    if(e.detail.errMsg === 'getPhoneNumber:ok') {
      app.request({url: 'auth/phone', data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      }}).then(res => {
        console.log(`获取手机号成功，telephone: ${res.data.telephone}`)
      })
    }
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        app.request({url: 'auth/info', data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        }}).then(res => {
          console.log(`获取手机号成功，telephone: ${res.data.telephone}`)
        })
      }
    })
  },
})