import product_detail from '../../plugins/product_detail/product_detail.js';
var app = getApp();
var modrel={'product_detail':product_detail};
var plugins={"layerDE8DDE05AE679CC2FB4498509DCE407A":{"id":"layerDE8DDE05AE679CC2FB4498509DCE407A","pid":"2","father_id":"","type":"product_detail","left":0,"top":0,"width":100,"height":"auto","zindex":0,"childprop":{"data_source":{"title":"","value":[]},"display":{"title":true,"intro":true,"price":true,"market_price":true,"attr":true,"detail":true},"title":{"color":"#535353","font-size":14,"font-weight":"bold","font-style":"normal","text-decoration":"none","text-align":"left","line-height":30},"price":{"color":"#88bd79","font-size":18,"font-weight":"normal","font-style":"normal","text-decoration":"none"},"market_price":{"color":"#c9c9c9","font-size":12,"font-weight":"normal","font-style":"normal","text-decoration":"none"},"property":{"color":"#666560","font-size":14,"font-weight":"normal","font-style":"normal","text-decoration":"none","text-align":"left","line-height":50}}}};
var pageconf={
  data: {
    plugins:plugins,
	pageid: 'page2/page2',
	showBar: false,
	tabs: {}
  },
  onLoad: function(o){
    let curpage = this.data.pageid;
    let tabs = getApp().globalData.config.tabBar || {};
    if (tabs.list) {
      this.setData({tabs});
      let _has_ = tabs.list.findIndex((c) => {
        return c.pagePath == curpage
      });
      this.setData({
        showBar: _has_ > -1 ? true : false
      })
    }
  },
  viewtap: function(e){
    var layerid=e.currentTarget.dataset.layerid;
    var plugindata=this.data.plugins[layerid];
    if(plugindata){
      var modclick=plugindata.childprop.modclick;
      app.moduleBindTap(modclick);
    }
  },
  switchTab: function(e){
	let url = e.currentTarget.dataset.url;
	getApp().turnToPage(url, true)
  },
	onShareAppMessage: function(res){}
}
for(var modid in plugins){
  (function(){
    var moddata=plugins[modid];
    var cls=modrel[moddata.type];
	if(cls){
		cls().install(pageconf, {scope:modid,
		static:{
		  param:moddata.childprop,
		  layerid: modid
		}
		})
	}
  })(modid)
}
Page(pageconf)


