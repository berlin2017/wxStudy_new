//app.js
var config = require('./utils/config.js')
var subscriber = require('./utils/event.js')

App({

  onHide:function(){
    console.log("app进入后台");
  },

  onShow: function () {
    console.log("app进入前台");
  },
  
  
  onLaunch: function () {
    // 展示本地存储能力
    // qcloud.setLoginUrl(config.url + 'getwxinfo');
    // qcloud.setLoginUrl(config.url + 'login');
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        
      }
    })  
  },


  globalData: {
    myUser:null,
    res:null,
    userInfo: null,
    userType:2,

    isLogin: false, // 当前是否是登录状态
    currentChatTo: '', // 记录当前聊天对象account，用于标记聊天时禁止更新最近会话unread
    loginUser: {},//当前登录用户信息
    friends: [],//好友列表，
    friendsWithCard: {}, // 带有名片信息的好友列表（转发时使用）
    friendsCard: {},//带有名片信息的好友列表
    onlineList: {},//在线人员名单 account: status
    blackList: {},//黑名单列表
    config,//存储appkey信息
    nim: {},//nim连接实例
    subscriber, //消息订阅器
    notificationList: [], // 通知列表
    recentChatList: {},//最近会话列表
    rawMessageList: {}, //原生的所有消息列表(包含的字段特别多)
    messageList: {},//处理过的所有的消息列表
    isInChatPage:false,
  }  

})