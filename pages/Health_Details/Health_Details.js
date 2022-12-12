// pages/Health_Details/Health_Details.js
let store = require("../../utils/store.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    punchOrNot: true,
    hsTime: '',
    region: '',
    hsHigh: '',
    hsDiagnosis: '',
    hsStatus: '',
    hsTemper: '',
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var id = store.getItem("id", "userInfo");
    wx.request({
      url: `https://www.mislaydream.com/record/ownNew?citizenId=${id}`,
      method: 'GET',
      data: {
        WXID: this.data.id
      },
      success:(res) => {
        console.log(res)
        console.log(res.data)
        if(res.data.data.hsHigh == 1){
          var high = '是'
        }else{
          var high = '否'
        }
        if(res.data.data.hsDiagnosis == 1){
          var Diagnosis = '是'
        }else{
          var Diagnosis = '否'
        }
        this.setData({
          hsTime: res.data.data.hsTime,
          region: store.getItem("region", "userInfo"),
          hsHigh: high,
          hsDiagnosis: Diagnosis,
          hsStatus: res.data.data.hsStatus,
          hsTemper: res.data.data.hsTemper,
          phone: store.getItem("phone", "userInfo")
        })
      }
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
    wx.redirectTo({
      url: '../index/index',
    })
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