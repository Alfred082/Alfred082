// pages/index/index.js
import drawQrcode from '../../utils/weapp.qrcode.esm.js'
import http from '../../utils/api.js';
const app = getApp()
let store = require("../../utils/store.js")
let router = require("../../utils/router.js")
let Api = app.Api
var util=require('../../utils/util'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:store.getItem("openId"),
    Time:'',
    qrTxt: 'https://www.bilibili.com/',
    operationList: [
      {id: 1, name: '我的健康信息详情', icon: '../../images/operation_icron1.png'},
      {id: 2, name: '每日健康打卡', icon: '../../images/operation_icron2.png'},
      {id: 3, name: '核酸检测登记', icon: '../../images/operation_icron3.png'},
    ],
    notice: [
      {id: 1, content: "您今天还未健康打卡...", time: "1天前"}
    ],
    servicesList: [
      {id: 1, name: '健康出入校园', icon: '../../images/services_icron1.png', more: '../../images/services_icron3.png'},
      {id: 2, name: '健康码申诉', icon: '../../images/services_icron2.png', more: '../../images/services_icron3.png'}
    ],
    userId: true,
    userName: '',
    userIdCard: '',
    hideUserName: '',
    hideUserIdCard:'',
    punchOrNot: true
    
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    setInterval(function(){
      that.setData({
          Time: util.formatTime(new Date())
      });    
    },1000);
    wx.request({
      url: 'https://www.mislaydream.com/citizen/find/',
      method: 'GET',
      data: {
        WXID: this.data.id
      },
      success:(res) => {
        console.log(res)
        console.log(res.data)
        this.setData({
          userName: res.data.data.name,
          userIdCard: res.data.data.card
        })
        wx.setStorageSync('userInfo',res.data.data)
        var name = res.data.data.name;
        var card = res.data.data.card;
        var hideName = name.substr(-1);
        var hideCard = card.substr(-4);
        this.setData({
          hideUserName: hideName,
          hideUserIdCard: hideCard
        })
      }
    });
    this.setData({
      punchOrNot: false
    });
  },

  // 获取当前时间
  getTime:function(e){
    var that = this;
    var currentTime = util.formatTime(new Date());
  },

  // 
  toHealthDetails() {
    wx.reLaunch({
      url: '../Health_Details/Health_Details',
    })
  },
  toHealthPunch() {
    wx.reLaunch({
      url: '../Health_Punch/Health_Punch',
    })
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})