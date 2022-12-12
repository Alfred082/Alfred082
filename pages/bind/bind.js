// pages/bind/bind.js
import http from '../../utils/api.js';
import util from '../../utils/util.js'
let store = require('../../utils/store.js')
let router = require("../../utils/router.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    documentList: ["身份证", "普通护照", "港澳居民来往内地通行证", "台湾居民来往大陆通行证","外国人永久居留身份证"],
    regionList: [],
    genderList: ["男", "女"],
    disabled: true,
    openid: store.getItem("openId")
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  bindPickerDocument(e) {
    this.setData({
      document: this.data.documentList[Number(e.detail.value)]
    })
  },

  checkedTerms(e) {
    this.setData({
        disabled: !e.detail.value.length
    })
  },
  bindPickerGender(e) {
    this.setData({
        gender: this.data.genderList[Number(e.detail.value)]
    })
  },

  bindPickerRegion(e) {
    this.setData({
        regionList: `${e.detail.value[0]}${e.detail.value[1]}${e.detail.value[2]}`,
        region: `${e.detail.value[0]}${e.detail.value[1]}${e.detail.value[2]}`
    })
  },

  formSubmit: function(e) {
    console.log(e.detail.value)
    let {
        name,
        gender,
        age,
        card,
        phone,
        region,
        address
    } = e.detail.value;
    const verify = [{
        value: name,
        text: "请输入姓名"
    }, {
        value: gender,
        text: "请选择年龄"
    }, {
        value: age,
        text: "请输入手机号"
    }, {
        value: region.length,
        text: "请选择所在地"
    }, {
        value: card,
        text: "请输入证件号码"
    }, {
        value: phone,
        text: "请输入电话号码"
    }, {
        value: address,
        text: "请填写详细地址"
    }]
    let isValue = verify.findIndex(ele => !ele.value);
    if (isValue != -1) {
        wx.showToast({
            title: verify[isValue].text,
            icon: 'none'
        })
    } else {
        this.putUsers(e.detail.value);
        this.toIndex();
    }
  },

  putUsers(data) {
    // var region = data.regionList.toString();
    var dataTrs = {
      name: data.name,
      gender: data.gender,
      age: data.age,
      card: data.card,
      phone: data.phone,
      // region: `${this.data.regionList[0]}${this.data.regionList[1]}${this.data.regionList[2]}`,
      region: `${this.data.regionList}`,
      address: data.address
    }
   http.post(`citizen/bind`, Object.assign(dataTrs, {
      id: store.getItem("openId"),
      time: util.formatTime(new Date())
    })).then(ress => {
      if (ress.data.code == 0) {
        wx.showToast({
          title: ress.data.msg,
          icon: 'none'
        })
      }
    })
  },

  toIndex(){
    wx.reLaunch({
      url: '../index/index',
    })
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