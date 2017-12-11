// pages/component/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 'all',
    prompt: {
      hidden: !0,
    },
    coupons: [
      {
        money:100,
        condition: 2000,
        title: '圣诞礼券',
        start_time: '2017.12.24',
        end_time: '2017.12.26',
        status: 'all',
        num: 2
      },
      {
        money: 100,
        condition: 2000,
        title: '圣诞礼券',
        start_time: '2017.12.24',
        end_time: '2017.12.26',
        status: 'overdue',
        num: 2
      },
      {
        money: 100,
        condition: 2000,
        title: '圣诞礼券',
        start_time: '2017.12.24',
        end_time: '2017.12.26',
        status: 'nouse',
        num: 5
      },
      {
        money: 100,
        condition: 2000,
        title: '圣诞礼券',
        start_time: '2017.12.24',
        end_time: '2017.12.26',
        status: 'hasuse',
        num: 2
      },
      {
        money: 100,
        condition: 2000,
        title: '圣诞礼券',
        start_time: '2017.12.24',
        end_time: '2017.12.26',
        status: 'all',
        num: 3
      }
    ]
  },
  changActive(e) {
    var that = this
    const id = e.currentTarget.dataset.id;
    that.setData({
      activeIndex: id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})