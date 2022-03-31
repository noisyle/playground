// pages/playground5/index.js
const app = getApp()
Page({

  data: {
  },

  registerOrLogin() {
    wx.login({
      success(res) {
        app.request({url: 'auth/login', data: {code: res.code}}).then(res => {
          console.log('登陆成功, %O', res.data.user)
          app.globalData.token = res.data.token
          app.globalData.user = res.data.user
          wx.showToast({
            title: `登陆成功`,
            icon: 'success',
            duration: 2000,
          })
        }).catch(err => {
          console.error('登录失败: %O', err)
        })
      },
      fail(err) {
        console.error('登录失败: %O', err)
      }
    })
  },

  me() {
    app.request({url: 'user/me'}).then(res => {
      console.log('获取个人信息成功: %O', res.data)
      wx.showToast({
        title: `您好, ${res.data.nickname}`,
        icon: 'success',
        duration: 2000,
      })
    }).catch(err => {
      console.error('获取个人信息失败: %O', err)
    })
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log(res.userInfo)
        app.request({url: 'auth/info', data: {
          encryptedData: res.encryptedData,
          iv: res.iv,
        }}).then(res => {
          console.log(`获取头像昵称成功，nickname: ${res.data.nickname}`)
          wx.showToast({
            title: `您好, ${res.data.nickname}`,
            icon: 'success',
            duration: 2000,
          })
        })
      }
    })
  },

  getPhoneNumber(e) {
    if(e.detail.errMsg === 'getPhoneNumber:ok') {
      app.request({url: 'auth/phone', data: {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      }}).then(res => {
        console.log(`获取手机号成功，telephone: ${res.data.telephone}`)
        wx.showModal({
          content: `您的手机号是 ${res.data.telephone}`,
          showCancel: false,
        })
      })
    }
  },
})
