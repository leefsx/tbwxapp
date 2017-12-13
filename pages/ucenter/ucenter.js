// page/component/new-pages/user/user.js
var comm = require('../../wxParse/common.js');
let config = require("../../static/config.js");
var app = getApp();
Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{},
    order_pro_rel:[],
    userInfo: [],
    cuserInfo: [],
    cartleng: 0,
    pageid: 'ucenter/ucenter'
  },
  goToCart(){
    wx.navigateTo({
      url: "../cart/cart",
    })
  },
  onLoad(){
  },
  onShow() {
    var self = this;
    var openid = wx.getStorageSync('openid');
    if (openid) {
      var uinfo = self.data.userInfo
      app.apiRequest('weixin', 'signin',{
        data: {
          openid: openid,
          nickName: uinfo.nickName || '',
          avatarUrl: uinfo.avatarUrl || ''
        },
        method: 'GET',
        success: function (res) {
          if (res.data.result == 'OK') {
            self.setData({cuserInfo:res.data})
            app.globalData.cuser = res.data
            if (app.globalData.userInfo) {
              self.setData({
                userInfo: app.globalData.userInfo
              })
            } else {
              app.getUserInfo(function (userInfo) {
                self.setData({
                  userInfo: userInfo
                })
              })
            }
            app.apiRequest('user', 'order_list',{
              data: [],
              success: function (res) {
                console.log(res.data.order_num_state)
                if (res.data.result == 'OK') {
                  self.setData({
                    cartleng: app.globalData.carts.length,
                    order_num_state: res.data.order_num_state
                  })
                }
              }
              

            })
          } else {
            wx.navigateTo({
              url: '../login/login'
            })
          } 
        }
      })
      let curpage = this.data.pageid;
      let tabs = getApp().globalData.config.tabBar || {};
      if (tabs.list) {
        this.setData({ tabs });
        let _has_ = tabs.list.findIndex((c) => {
          return c.pagePath == curpage
        });
        this.setData({
          showBar: _has_ > -1 ? true : false
        })
      }
    } else {
      wx.navigateTo({
        url: '../login/login'
      })
    }
   },
  /**
   * 发起支付请求
   */
  payOrders(opt) {
    wx.showToast({
      title: '请求中...',
      icon: 'loading',
      duration: 5000
    })
    var oid = opt.target.dataset.oid
    if(oid){
      wx.navigateTo({
        url: '../order_confirm/order_confirm?fr=u&oid='+oid,
      })
      /*
      app.request({
        url: comm.parseToURL('order', 'dopayment'),
        data: {
          oid: oid
        },
        method: 'POST',
        success: function (res) {
          if (res.data.result == 'OK') {
            
            wx.showToast({
              title: '支付成功'
            })
            wx.switchTab({
              url: '../user/user',
            })
          } else {
            wx.showToast({
              title: '支付失败'
            })
          }
          
        }
      })
      */

    }else{
      wx.showToast({
        title: '请求失败',
        icon: 'loading',
        duration: 5000
      })
    }

  },
  onPullDownRefresh: function () {
    this.onShow()
    wx.stopPullDownRefresh()
  },
  toCart(e){
    wx.navigateTo({
      url: '../shopping_cart/shopping_cart',
    })
  },
  switchTab: function (e) {
    let url = e.currentTarget.dataset.url;
    getApp().turnToPage(url, true)
  }
})