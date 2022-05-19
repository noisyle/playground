// pages/playground5/index.js
const { formatTime } = require('../../utils/util')
const app = getApp()
Page({
  data: {
    navBarHeight: app.globalData.navBar.navBarHeight,
    date: formatTime(new Date(), 'MM月dd日 EEE'),
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
            duration: 1000,
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
        title: res.data.nickname ? `您好, ${res.data.nickname}` : '尚未授权头像昵称',
        icon: res.data.nickname ? 'success' : 'error',
        duration: 1000,
      })
    }).catch(err => {
      console.error('获取个人信息失败: %O', err)
      wx.showToast({
        title: '尚未登录',
        icon: 'error',
        duration: 1000,
      })
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
            duration: 1000,
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

  compressVideo(e) {
    new Promise((resolve, reject) => {
      wx.chooseMedia({
        count: 1,
        mediaType: ['video'],
        sourceType: ['album', 'camera'],
        maxDuration: 10,
        camera: 'back',
        success(res) {
          console.log('选择视频', res.tempFiles[0])
          resolve(res.tempFiles[0])
        },
        fail(err) {
          reject(err)
        }
      })
    }).then(res => {
      const {tempFilePath, size, ...origin} = res
      return new Promise((resolve, reject) => {
        wx.compressVideo({
          src: res.tempFilePath,
          quality: 'medium',
          success(res) {
            const result = {
              ...origin,
              ...res
            }
            console.log('压缩视频', result)
            resolve(result)
          },
          fail(err) {
            reject(err)
          }
        })
      })
    }).then(res => {
      return app.uploadFile({
        url: 'upload/video',
        filePath: res.tempFilePath,
        name: 'file',
        formData: res
      })
    }).then(res => {
      console.log('上传视频', res)
    }).catch(err => {
      console.error(err)
    })
  },
})
