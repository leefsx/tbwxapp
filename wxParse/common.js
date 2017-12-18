var app = getApp()

function get_cuser(obj){
  if (app.globalData.cuser.length){
    typeof obj.success == "function" && obj.success(app.globalData.cuser)
    return app.globalData.cuser
  }else{
    var openid = wx.getStorageSync('openid');
    console.log(openid)
    if (openid) {
      app.apiRequest('weixin', 'signin',{
        data: { openid: openid },
        success: function (res) {
          if (res.data.result == 'OK') {
            app.globalData.cuser = res.data
            app.globalData.hadlogin = true
            typeof obj.success == "function" && obj.success(res.data)
            return res.data
          } else {
            typeof obj.success == "function" && obj.success(false)
          }
        },
        fail: function () {
          typeof obj.success == "function" && obj.success(false)
        }
	  })
    }else{
      typeof obj.success == "function" && obj.success(false)
    }
  }
  
}

function get_now(){
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth();
  var day = myDate.getDate();
  var hour = myDate.getHours();
  var minute = myDate.getMinutes();
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}
/* 支付   */
function pay(param) {
  wx.requestPayment({
    timeStamp: param.timeStamp,
    nonceStr: param.nonceStr,
    package: param.package,
    signType: param.signType,
    paySign: param.paySign,
    success: function (res) {
      // success  
      app.apiRequest('order', 'getPayStatus',{
        data: { oid: param.oid },
        success: function (res) {
        },
        fail: function () {
        }
      })
       
    },
    fail: function (res) {
      // fail  
      console.log("支付失败")
    },
    complete: function () {
      // complete  
      wx.redirectTo({
        url: '../order_detail/order_detail?oid=' + param.oid,
      })
    }
  })
}

module.exports.get_cuser = get_cuser
module.exports.get_now = get_now
module.exports.pay = pay
