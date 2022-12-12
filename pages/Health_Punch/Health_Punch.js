import http from '../../utils/api.js';
import util from '../../utils/util.js'
let store = require("../../utils/store.js")
// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        total: 0,
        disabled: true,
        genderList: ["男", "女"],
        regionList: [],
        healList: [],
        statusList: ["是", "否"],
        symptomList: ["没有出现症状", "感冒样症状：乏力、咳嗽、发烧、肌肉痛、头痛", "喘憋、呼吸急促", "恶心呕吐、腹泻", "心慌、胸闷", "结膜炎（红眼病样表现：眼睛涩、红、分泌物）", "其他症状"],
        familyList: ["正常", "存在疑似病例", "存在确证病例"],
        communityList: ["正常", "存在疑似病例", "存在确证病例"],
        username: '',
        idCard: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      var name = store.getItem("name", "userInfo");
      var card = store.getItem("card", "userInfo");
      console.log(card)
      var hideName = name.substr(-1);
      var hideCard = card.substr(-4);
      console.log(hideCard)
      this.setData({
        username: hideName,
        idCard: hideCard
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        let modelInfo = wx.getSystemInfoSync();
        let menuInfo = wx.getMenuButtonBoundingClientRect();
        let top = menuInfo.top;
        let left = modelInfo.windowWidth - menuInfo.right;
        this.setData({
            header_style: 'margin-top:${top}px;height:${menuInfo.height}px'
        })
    },
  
    bindPickerGender(e) {
        this.setData({
            gender: this.data.genderList[Number(e.detail.value)]
        })
    },

    bindPickerRegion(e) {
        this.setData({
            regionList: e.detail.value,
            region: `${e.detail.value[0]}${e.detail.value[1]}${e.detail.value[2]}`
        })
    },

    radioStatusChange(e) {
        // console.log(e.detail.value)
    },

    checkedSymptom(e) {
        // console.log(e.detail.value)
    },

    bindPickerFamily(e) {
        this.setData({
            family: this.data.familyList[Number(e.detail.value)]
        })
    },

    bindPickerCommunity(e) {
        this.setData({
            community: this.data.communityList[Number(e.detail.value)]
        })
    },

    checkedTerms(e) {
        this.setData({
            disabled: !e.detail.value.length
        })
    },

    formSubmit: function(e) {
        console.log(e.detail.value)
        let {
          phone,
          region,
          diagnosis,
          high,
          status,
          temperature
        } = e.detail.value;
        const verify = [{
            value: phone,
            text: "请输入联系电话"
        }, {
            value: region.length,
            text: "请选择所在地区"
        }, {
            value: diagnosis,
            text: "请选择近7天您是否密接"
        }, {
            value: high,
            text: "请选择近7天您是否前往高风险地区"
        }, {
            value: status.length,
            text: "请选择健康状态"
        }, {
            value: temperature,
            text: "请输入当前体温"
        }]
        let isValue = verify.findIndex(ele => !ele.value);
        if (isValue != -1) {
            wx.showToast({
                title: verify[isValue].text,
                icon: 'none'
            })
        } else {
            this.putUsers(e.detail.value);
        }
    },

    putUsers(data) {
      var diagnosis1
      var high1
      if(data.diagnosis === "是"){
        diagnosis1 = 1
      }else{
        diagnosis1 = 0
      }
      if(data.high === "是"){
        high1 = 1
      }else{
        high1 = 0
      }
      var dataTrs = {
        temperature: data.temperature,
        status: data.status[0],
        diagnosis: diagnosis1,
        high: high1
      }
     http.post(`record/add`, Object.assign(dataTrs, {
        id: store.getItem("id","userInfo"),
      })).then(ress => {
        if (ress.data.code == 200) {
          wx.showToast({
            title: ress.data.description,
            icon: 'success'
          })
        }
      })
    },

    creatGroup() {
        wx.showToast({
            title: '正在开发中',
            icon: 'none'
        })
    },

    toDetails() {
        wx.navigateTo({
            url: `/pages/list/index`
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let userInfo = wx.getStorageSync("userInfo");
        let {
            gender
        } = userInfo;
        if (userInfo) {
            http.get(`details?query={"where":{"openid":"${userInfo.openid}"}}`).then(res => {
                this.setData({
                    userInfo,
                    gender,
                    total: res.data.total
                })
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: '全民健康打卡',
            path: `/pages/index/index`,
            imageUrl: '../../images/index.png'
        }
    }
})