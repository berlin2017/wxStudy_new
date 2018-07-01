import { generateFingerGuessImageFile, generateBigEmojiImageFile, generateRichTextNode, generateImageNode, calcTimeHeader } from 'util.js'
import { deepClone, clickLogoJumpToCard } from 'util.js'
var app = getApp();

function handlerMsg(newMessage){
  if (app.globalData.isInChatPage) {
    return;
  }
  if (newMessage.type === 'text' && newMessage.text === '发起视频通话') {
    console.log('发起视频通话');
    if (newMessage.custom) {
      let orderId = JSON.parse(newMessage.custom).orderId;
      wx.navigateTo({
        url: '../test/chating' + '?id=' + data.messages[0].content.from_id + '&type=' + app.globalData.userType + '&orderId=' + data.messages[index].content.msg_body.extras.orderId + '&call_type=1',
      })
    }

  } else if (newMessage.type === 'text' && newMessage.text === '发起语音通话') {
    console.log('发起语音通话');
    if (newMessage.custom) {
      let orderId = JSON.parse(newMessage.custom).orderId;
      wx.navigateTo({
        url: '../test/chating' + '?id=' + data.messages[0].content.from_id + '&type=' + app.globalData.userType + '&orderId=' + data.messages[index].content.msg_body.extras.orderId + '&call_type=0',
      })
    }
  } else {
    wx.showModal({
      title: '新消息',
      content: '你有新的消息是否查看',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          if (newMessage.custom) {
            let orderId = JSON.parse(newMessage.custom).orderId;
            wx.navigateTo({
              url: '../test/chating' + '?id=' + newMessage.from + '&type=' + app.globalData.userType + '&orderId=' + orderId,
            })
          }

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  
  let loginUserAccount = app.globalData['loginUser']['account']
  // 添加全局数据中 消息时间头，同时存储到最近会话列表中
  let loginMessageList = app.globalData.messageList[loginUserAccount]
  let recentChatList = app.globalData.recentChatList
  let chatToAccount = null
  if (!loginMessageList[self.data.chatTo]) {
    loginMessageList[self.data.chatTo] = {} //开始未收到任何消息
    recentChatList[self.data.chatTo] = {} //存储到最近会话列表中
  }
}

module.exports = {
  handlerMsg,
}