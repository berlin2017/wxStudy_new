// 配置
var envir = 'online',
  CONFIG = {},
  configMap = {
    test: {
      appkey: 'fe416640c8e8a72734219e1847ad2547',
      url: 'https://apptest.netease.im'
    },

    pre: {
      appkey: '45c6af3c98409b18a84451215d0bdd6e',
      url: 'http://preapp.netease.im:8184'
    },
    online: {
      appkey: '39d64a5a4a48b296c6858f590e434afc',
      url: 'https://app.netease.im'
    }
  };
CONFIG = configMap[envir];
// 是否开启订阅服务
CONFIG.openSubscription = true

module.exports = CONFIG