import wech from '../widget.js';
var WxParse = require('../../wxParse/wxParse.js');
var comm = require('../../wxParse/common.js');

const productDetailConfig = {
    data: {
        detail: {},
        styles: {},
        detailShow: false,
        digShow: false,
        tabIdx: 0,
        food: {
          "name": "",
          "good_ord": "0",
          "fir_ord": "0",
          "sec_ord": "1",
          "url": "",
          "old_price": "",
          "price": "",
          "dec": "",
          "total_count": "",
          "num": 1,
          "dec_detail": {}
        },
        currentState: false,
        carts: [],
        attr_data:[]
    },
    events: {
        changeDetailShow (){
            this.setData({tabIdx: 0,
                detailShow: !this.data.detailShow})
        },
        changeDigShow (){
            this.setData({digShow: !this.data.digShow})
        },
        changeTabIdx (e){
            let idx = e.target.dataset.tabindex;
            this.setData({tabIdx: idx})
        },
        changState() {
          this.setData({
            currentState: (!this.data.currentState)
          })
        },
        addCount() {
          let food = this.data.food;
          let num = food.num;
          let detail = this.data.detail
          const count = detail.num;
          num = num + 1;
          if (num > count) {
            num = count;
            wx.showToast({
              title: '数量超出范围~'
            })
          }
          food.num = num;
          this.setData({
            food: food
          });
        },
        minusCount() {
          let food = this.data.food;
          let num = food.num;
          if (num <= 1) {
            return false;
          }
          num = num - 1;
          food.num = num;
          this.setData({
            food: food
          });
        },
        toCart() {
          var that = this;
          var carts = that.data.carts
          var cart_index = carts.length
          var detail_data = that.data.detail
          var skulist = that.data.skulist
          var attr_data = that.data.attr_data;
          var hadInCart = false
          var propertys = this.data.propertys;
          var isFull = true
          var currentState = this.data.currentState
          var food = that.data.food
          var num = parseInt(food.num)
          let app = getApp()
          if (attr_data.length == 0) {
            isFull = false
          } else {
            for (var i = 0; i < attr_data.length; i++) {
              if (attr_data[i] == '' || attr_data[i] == undefined || attr_data.length < propertys.length) {
                isFull = false
                break
              }
              isFull = true
            }
          }
          if (skulist && Object.keys(skulist).length > 0 && !isFull) {
            if (currentState) {
              wx.showToast({
                title: '请选择商品属性'
              })
            } else {
              that.setData({
                currentState: (!that.data.currentState)
              })
            }
          } else {
            wx.showLoading({
              title: '请求中',
              mask: true
            })
            if (cart_index > 0) {
              for (var i = 0; i < cart_index; i++) {
                if (detail_data.skuid && carts[i].cid == detail_data.id && carts[i].skuid == detail_data.skuid) {
                  var cartNum = parseInt(carts[i].num)
                  carts[i].num = cartNum += num;
                  hadInCart = true
                } else if (!detail_data.skuid && carts[i].cid == detail_data.id) {
                  var cartNum = parseInt(carts[i].num)
                  carts[i].num = cartNum += num;
                  hadInCart = true
                }
              }

            }
            if (hadInCart == false) {
              var send_data = {
                cid: detail_data.id,
                title: detail_data.name,
                image: detail_data.feature_img,
                num: that.data.food.num,
                price: detail_data.price,
                sum: detail_data.price,
                selected: true,
                max_kc: detail_data.num,
                skuid: detail_data.skuid || 0
              }
              carts.push(send_data)
            }
            app.globalData.carts = carts
            wx.redirectTo({
              url: '../shopping_cart/shopping_cart',
            })
          }
        },
        toConfirm() {
          var that = this
          var detail_data = that.data.detail
          var skulist = that.data.skulist
          var attr_data = that.data.attr_data;
          var currentState = this.data.currentState
          var isFull = true
          var propertys = this.data.propertys;
          var isFull = true
          var food = that.data.food
          var num = parseInt(food.num)
          let app = getApp()
          if (attr_data.length == 0) {
            isFull = false
          } else {
            for (var i = 0; i < attr_data.length; i++) {
              if (attr_data[i] == '' || attr_data[i] == undefined || attr_data.length < propertys.length) {
                isFull = false
                break
              }
              isFull = true
            }
          }
          if (skulist && Object.keys(skulist).length > 0 && !isFull) {
            if (currentState) {
              wx.showToast({
                title: '请选择商品属性'
              })
            } else {
              that.setData({
                currentState: (!that.data.currentState)
              })
            }
          } else {
            wx.showLoading({
              title: '请求中',
              mask: true
            })
            var carts = [{
              cid: detail_data.id,
              title: detail_data.name,
              image: detail_data.feature_img,
              num: that.data.food.num,
              price: detail_data.price,
              sum: detail_data.price * that.data.food.num,
              selected: true,
              max_kc: detail_data.num,
              skuid: detail_data.skuid
            }]
            comm.get_cuser({
              success: function (cuser) {
                console.log('get_cusered')
                var that = this
                if (cuser == false) {
                  wx.hideLoading()
                  wx.showToast({
                    title: '请先登录'
                  })
                  wx.navigateTo({
                    url: '../login/login'
                  })
                } else {
                  app.globalData.dcarts = carts
                  wx.hideLoading()
                  wx.redirectTo({
                    url: '../order_confirm/order_confirm?fr=buy'
                  })
                }
              }
            })
          }
        },
        switchDetState(e) {
          let propertys = this.data.propertys;
          const idx = parseInt(e.currentTarget.dataset.index);
          const id = parseInt(e.currentTarget.dataset.id);
          const pid = parseInt(e.currentTarget.dataset.pid);
          const did = parseInt(e.currentTarget.dataset.did);
          var attr_data = this.data.attr_data;
          var skulist = this.data.skulist
          var detail_data = this.data.detail
          if (propertys[id].details[idx].detail_state != "disable" && propertys[id].details[idx].detail_state != "active") {
            propertys[id].details.forEach(function (e) {
              if (e.detail_state == "active") {
                e.detail_state = "";
              }
            })
            propertys[id].details[idx].detail_state = "active"
          }

          attr_data[id] = pid + ':' + did
          if (attr_data.length > 0 && attr_data.length == propertys.length) {
            var attr_str = attr_data.join(';')
            var skuid = skulist[attr_str]

            detail_data.price = skuid.price
            detail_data.num = skuid.quantity
            detail_data.skuid = skuid.id
          }
          this.setData({
            propertys: propertys,
            attr_data: attr_data,
            detail: detail_data
          })
        }
    },
    methods: {
        parseStyle (){
            let config = this.data.param;
            ['title','price','market_price','property'].forEach((c) => {
                let nodestyle = "";
                let tmpobj = config[c] || {};
                for (let ky in tmpobj) {
                    let val = tmpobj[ky];
                    if (typeof val == 'number')
                        val = getApp().px2rpx(val);
                    
                    nodestyle += ky + ": " + val + ";";
                }
                if (nodestyle.length > 0) {
                    let oldobj = this.data.styles;
                    oldobj[c] = nodestyle;
                    this.setData({styles: oldobj})
                }
            })
        }
    },
	onLoad (option){
    let app = getApp()
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      detail: {},
      carts: app.globalData.carts || [],
      displaydata: this.data.param.display
    })
    this.setData({
      showBar: this.$this.data.showBar
    })
		// Parse 'node-style'
        this.parseStyle();
        // Load 'product-detail'
        let that = this, product_id = 0;
        let dsval = that.data.param.data_source.value;
		if (/^[1-9]\d*$/.test(option.product_id || 0)) {
			product_id = option.product_id;
        } else if (Array.isArray(dsval) && dsval.length > 0)
            product_id = parseInt(dsval[0]);
    
        app.apiRequest('product_detail', 'index', {
            data: {product_id},
            success (res){
                let detail = res.data.data || {};
				if ('ERROR' == res.data.result || '') {
					that.setData({detail: {"errmsg": res.data.errmsg}});
					wx.hideLoading()
					return false
				}
        that.setData({
          detail: detail,
          propertys: res.data.newsku,
          skulist: res.data.skulist,
          tradeRate: res.data.tradeRate,
          salesRecords: res.data.salesRecords,
          productMessage: res.data.productMessage
        });
				WxParse.wxParse('prdintro', 'html', detail.introduction, that, 5);
                // for 'product-description'
                let desctitle = [], prdescobj = [];
                if (Array.isArray(detail.desc)){
                  prdescobj = detail.desc
                }else{
                  prdescobj = JSON.parse(detail.desc)
                }
                for (var i in prdescobj) {
                    let vobj = prdescobj[i];
                    desctitle.push({"title": vobj.title});
                    WxParse.wxParse('prdesc' + i, 'html', vobj.desc, that)
                }
                that.setData({desctitle});
				wx.hideLoading()
                WxParse.wxParseTemArray("prdescArr", 'prdesc', parseInt(i) + 1, that)
            },
            complete: function () {
              wx.hideLoading()
            },
            fail (){
                that.setData({
                    detail: {errmsg: '未找到匹配数据'}
                })
            }
        })
    }
}

module.exports = wech(productDetailConfig)