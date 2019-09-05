// pages/loading/loading.js
import IMEventHandler from '../../utils/imeventhandler.js'
import SHA1 from '../../utils/sha1.js'

var app = getApp();
var TIME = 1000;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '登陆',
    title_bg: '#7647a0',
    showButton: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  onGetUserinfo: function() {
    wx.showLoading({
      title: '',
      mask: true,
    })
    var that = this;
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        app.globalData.userInfo = res.userInfo
        app.globalData.res = res
        that.wxLogin();
      }
    })
  },

  wxLogin: function() {
    var that = this;
    wx.login({
      success: info => {
        that.selfLogin(info);
      }
    })
  },

  selfLogin: function(info) {
    var that = this;
    wx.request({
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      url: 'https://weixin.ywkedu.com/index.php/App/code',
      data: {
        'code': info.code,
        'encryptedData': app.globalData.res.encryptedData,
        'iv': app.globalData.res.iv
      },
      success: function(result) {
        console.log(result);
        if (!result.data.openId) {
          console.log('iv:' + app.globalData.res.iv);
          console.log('encryptedData:' + app.globalData.res.encryptedData);
          console.log('code:' + info.code);
          wx.showToast({
            title: '登录失败,请重试',
          })
        } else {
          app.globalData.myUser = result.data;
          if (app.globalData.isLogin) {
            that.toMain();
          } else {
            that.registerIM()
          }

        }
      }
    });
  },



  toMain: function() {
    wx.hideLoading();
    // setTimeout(function () {
    //   wx.redirectTo({
    //     url: '../main/main2',
    //   })
    // }, TIME);
    wx.navigateBack({

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '分享',
      path: '/pages/loading/loading'
    }
  },

  cancel: function() {
    wx.navigateBack({

    })
  },

  back: function() {
    wx.navigateBack({

    })
  },

  registerIM: function() {
    wx.showLoading({
      title: '',
      mask: true
    })
    var CurTime = parseInt(new Date().getTime() / 1000);
    var Nonce = "4tgggergigwow323t23t";
    var AppKey = app.globalData.config.appkey;
    var CheckSum = SHA1.hex('353e761f0e3d' + Nonce + CurTime);

    wx.request({
      url: 'https://api.netease.im/nimserver/user/create.action',
      method: 'POST',
      header: {
        'AppKey': AppKey,
        'Nonce': Nonce,
        'CurTime': CurTime,
        'CheckSum': CheckSum,
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'accid': app.globalData.myUser.openId,
        'name': app.globalData.myUser.nickName,
        'token': 'ah123456',
      },
      success: function(e) {
        console.log(e);
        if (e.data.code == 414 || e.data.code == 200) {
          new IMEventHandler({
            token: 'ah123456',
            account: app.globalData.myUser.openId
          })
        } else {
          wx.showToast({
            title: '请重试',
          })
        }
      },
      fail: function(e) {
        console.log(e);
      },
    })
  },

})