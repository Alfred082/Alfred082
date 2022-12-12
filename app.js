let Api = require("./http/api.js");
let request = require("./http/request.js");
let config = require("./env/index.js")
let router = require("./utils/router.js")
let env = "Dev";
let mp = require("./http/mp.js")
App.version = "1.0.0";
App.config = config[env];  // 公共文件用的
App({
  config:config[env],   // 给视图用的
  Api,
  router,
  get:request.fetch,
  post:(url, data, option) =>{
    option.method = "post";
    return reuqest.fetch(url, data, option);
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          //获取到code
          wx.request({
            // url: this.globalData.requestUrl+'/wx/get-openid',
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxdc7b6dbdd67d61d9&secret=881f4d7f6be0f4d25fd714f6619b20be&js_code=${ res.code }&grant_type=authorization_code`,
            data:{
              code:res.code,
            },
            method:'get',
            success(res2){
              wx.setStorageSync('openId',res2.data.openid)
              console.log(res2.data)
            }
          })
        }else{
          wx.showToast({
            icon:'none',
            title: '微信登录失败，请重新进入小程序',
            duration:3000
          })
        }
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
