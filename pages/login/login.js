
//获取应用实例
var comm = require('../../wxParse/common.js');
var app = getApp()
Page({
  data: {
    motto: '用户登录',
    userInfo: {},
    userName: '',
    userPassword: '',
    boo: false
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  backHome(){
    wx.redirectTo({
      url: '/pages/page1/page1'
    })
  },
  logIn: function () {
    var that = this
    var openid = wx.getStorageSync('openid');
    if (openid.length > 1) {
      app.apiRequest('weixin', 'dologin', {
        data: {
          username: this.data.userName,
          password: this.data.userPassword,
          openid: openid
        },
        success: function (res) {
          if (res.data.result == 'OK') {
            app.globalData.APISESSID = res.data.APISESSID;
            app.globalData.hadlogin = true
            wx.navigateBack({
              delta: 1
            })
          } else {
            wx.showModal({
              title: '帐号或密码错误！',
              content: '',
            })
          }

        }
      })
    }else{
      wx.showModal({
        title: '获取用户信息失败！',
        content: '',
      })
    }

  },
  auto_registered: function(opt){
    var that = this
    var openid = wx.getStorageSync('openid');
    if (openid.length > 1) {
      app.apiRequest('weixin', 'auto_registered',{
        data: {
          openid: openid,
          headphoto: that.data.userInfo.avatarUrl,
          nickName: that.data.userInfo.nickName
        },
        success: function(res){
          if(res.data.result=='OK'){
            app.globalData.APISESSID = res.data.APISESSID
            app.globalData.hadlogin = true
            wx.showToast({
              title: '注册成功'
            })
            wx.navigateBack({
              delta: 1
            })
          }else{
            let errmsg = res.data.errmsg || '请求失败！'
            wx.showModal({
              title: errmsg,
              content: '',
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '自动注册失败！',
        content: '',
      })
    }
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var openid = wx.getStorageSync('openid');
    if (openid.length < 1) {
      wx.showModal({
        title: '获取用户信息失败！',
        content: '',
      })
    }
  },
  onShow: function () {
    var self = this;
    var openid = wx.getStorageSync('openid');
    app.globalData.hadInLoginPage = true
    if (openid) {
      var uinfo = self.data.userInfo
      app.apiRequest('weixin', 'signin',{
        data: {
          openid: openid,
          nickName: uinfo.nickName || '',
          avatarUrl: uinfo.avatarUrl || ''
        },
        success: function (res) {
          if (res.data.result == 'OK') {
            app.globalData.cuser = res.data
            wx.navigateBack()
          }
        }
      })
    }
  },
  shuaxin: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  onReady: function () {
    console.log('indx is on ready')
  },
  onHide: function () {
    console.log('index is on hide')
  },
  onUnload: function () {
    console.log('indx is on unload')
  },
  boo: function () {
    this.setData({
      boo: !this.data.boo
    });
  }


})