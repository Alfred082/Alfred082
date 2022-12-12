/**
 * 网络请求的公共方法
 *  1.基本请求
 *  2.为后续获取数据方便，promise处理：fetch axios 基于promise
 *  3.对获取数据的状态处理：loading toast
 *  4.对请求头的处理：机型、大小、系统、屏幕 
 */
let store = require("../utils/store.js")
let system = store.getSystemInfo();
const clientInfo = {
  "clientType":"mp",
  "appnm":"Chrish",
  "model":system.model,
  "os":system.system,
  "screen":system.screenWidth + "*" + system.screenHeight,
  "version":App.version,
  "chennel":"miniprogram"
}
module.exports = {
  fetch:(url, data={}, option={}) => {
    let{ loading  = true, toast = true, method = 'get'} = option;
    return new Promise((resolve, reject) =>{
      if(loading){
        wx.showLoading({
          title: '加载中...',
          mask:true
        })
      }
      let env = App.config.baseApi;
      wx.request({
        url: env + url,
        data,
        method,
        header:{
          "clientInfo":JSON.stringify(clientInfo)
        },
        success:function(result){
          let res = result.data;    // {code:0,data:"",message:""}
          console.log(res)
          if(res.code == 0){
            if(loading){
              wx.hideLoading();
            }
            resolve(res.data)
          }else{
            if(toast){
              wx.showToast({
                mask:true,
                title: res.message,
                icon:"none"
              })
            }else{
              wx.hideLoading();
            }
          }
        },
        fail:function(e = { code:-1, msg:errMsg, errMsg }){
          let msg = e.errMsg;
          if(msg == "rquest:fail timeout"){
            msg = '请求超时，请稍后处理'
          }
          wx.showToast({
            title: msg,
            icon:"none"
          })
          reject(e);
        }
      })
    })
  }
}