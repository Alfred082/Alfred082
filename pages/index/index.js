// pages/index/index.js
import drawQrcode from '../../utils/weapp.qrcode.esm.js'
var util=require('../../utils/util'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    ]
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
  },

  // 获取当前时间
  getTime:function(e){
    var that = this;
    var currentTime = util.formatTime(new Date());
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