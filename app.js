//app.js
let config = require("./static/config.js");
import { queue } from './wx-queue-request';
queue(5);

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var openid = wx.getStorageSync('openid');
    if (openid) {
      //console.log('oid:' + openid);
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            let param = {
              code: res.code,
              apitoken: config.apitoken
            }
            that.apiRequest('weixin', 'get_wxaopenid', {
              data: param,
              success(res) {
                if (!res.data.errcode) {
                  wx.setStorageSync('openid', res.data.openid);
                  wx.setStorageSync('session_key', res.data.session_key);
                }
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    cuser:[],
    carts:[],
    APISESSID:'',
	config,
  },
  sendRequest: function(param, customSiteUrl){

  },
  apiRequest: function(apiclass, apimethod, params){
	let host = this.globalData.config.domain || '';
	let apitoken = this.globalData.config.checkcode || '';
  params.data.APISESSID = this.globalData.APISESSID || ''
  if (typeof params != 'object') params = {};
  var that = this
	const requestTask = wx.request({
		url: host+'/wxappapi/'+apiclass+'/'+apimethod,
		header: params.header || {'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'},
		data: Object.assign(params.data || {}, {apitoken}),
		dataType: params.dataType || 'json',
		method: params.method || 'GET',
    success: function (res) {
      typeof params.success == "function" && params.success(res)
      if (!that.globalData.APISESSID && res.data.APISESSID) that.globalData.APISESSID = res.data.APISESSID;
    },
    //params.success || null,
		fail: params.fail || null
	});
	return requestTask
  },
  moduleBindTap: function(obj){
	if (typeof obj != 'object'
	|| JSON.stringify(obj) == '{}') return false;
	
	let ftype = obj.type || 'none';
	if (ftype == 'none') return false;
	let fvalue = obj.param.value || '';
	switch (ftype) {
		case 'func':
			if (obj.param.type == 'callto') {
				if (!/^\d+$/.test(fvalue)) return false;
				wx.makePhoneCall({
				  phoneNumber: fvalue
				})
			}
			break;
		case 'page':
			if (/^\d+$/.test(fvalue)) {
				let _url = 'page' + fvalue;
				this.turnToPage(_url + '/' + _url)
			}
			break;
	}
  },
turnToPage: function(url, isRedirect = false){
		let _url_ = '/pages/' + url;
		let tabPathArr=this.getTabPagePathArr();
		let isTabPage=false;
		for(let i=0;i<tabPathArr.length;i++){
			let curtabpage=tabPathArr[i];
			let tabpagepath='/pages/' + curtabpage+ '/' + curtabpage;
			if(_url_.indexOf(tabpagepath)===0){
				isTabPage=true;
				break;
			}
		}
		if(isTabPage){
			this.switchToTab(_url_);
		}else{
			if (isRedirect) wx.redirectTo({url: _url_})
			else wx.navigateTo({url: _url_})
		}
  },
  getTabPagePathArr: function(){
		return [];//this.globalData.config.tabBarPagePathArr;
  },
  switchToTab: function(url){
    wx.switchTab({
      url: url
    });
  },
  setPageTitle: function(title){
    wx.setNavigationBarTitle({
      title: title
    });
  },
  pageScrollTo : function( scrollTop ) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: scrollTop
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      });
    }
  },
  toLocalTime : function(time){
    let date = new Date();
	date.setTime(time * 1000);
	return date.toLocaleDateString()
  },
  px2rpx : function(num){
	return (num * 2) + 'rpx'
  }
})