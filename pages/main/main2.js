// pages/main/main2.js
import IMEventHandler from '../../utils/imeventhandler.js'
import SHA1 from '../../utils/sha1.js'

var app = getApp();
var TIME = 1000;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toTeacherMain: function () {
    var that = this;
    app.globalData.userType = 1;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: 'https://weixin.ywkedu.com/index.php/App/teacher_check',
      data: {
        openId: app.globalData.myUser.openId
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        if (res.data.msg == 1) {
          // wx.navigateTo({
          //   url: '../teacher/main',
          // })
          if (app.globalData.isLogin){
            wx.reLaunch({
              url: '../teacher/main',
            })
          }else{
            that.registerIM();
          }
        } else if (res.data.msg == 0) {
          wx.showToast({
            title: '账户审核中...',
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../teacher/user?enable=1',
            })
          }, 1000);

        } else if (res.data.msg == 2) {
          wx.showToast({
            title: '账户冻结中…',
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../teacher/user?enable=2',
            })
          }, 1000);

        } else {
          wx.navigateTo({
            url: '../teacher/regist',
          })

        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '请求失败',
        })
      },
    })
  },

  toStudentMain: function () {
    app.globalData.userType = 2;
    if (app.globalData.isLogin) {
      wx.switchTab({
        url: '../student/main',
      })
    } else {
      this.registerIM();
    }

  },

  initIM:function(e){
    app.globalData.userType = e.currentTarget.dataset.type;
    this.registerIM();
  },

  registerIM:function(){
    wx.showLoading({
      title: '',
      mask:true
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
      success: function (e) {
        console.log(e);
        if (e.data.code == 414 || e.data.code == 200){
          new IMEventHandler({
            token: 'ah123456',
            account: app.globalData.myUser.openId
          })
        }else{
          wx.showToast({
            title: '请重试',
          })
        }
      },
      fail: function (e) {
        console.log(e);
      },
    })
  },

})