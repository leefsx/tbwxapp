import swiper from '../../plugins/swiper/swiper.js';
import product_list from '../../plugins/product_list/product_list.js';
import map from '../../plugins/map/map.js';
var app = getApp();
var modrel={'swiper':swiper,'product_list':product_list,'map':map};
var plugins = { "layerDFE829E6767E5B0B7C36C8C86B59888A": { "id": "layerDFE829E6767E5B0B7C36C8C86B59888A", "pid": "1", "father_id": "", "type": "map", "left": 0, "top": 0, "width": 100, "height": "auto", "zindex": 0, "pageid": "1", "globalstyle": { "background-image": "none", "background-color": "transparent", "background-repeat": "repeat", "background-position": "top left", "border-color": "transparent", "border-style": "none", "border-width": 0, "border-radius": 0 }, "childprop": { "addr": "东方明珠", "latitude": 31.23969, "longitude": 121.49972, "width": 375, "height": 280,"marginTop":10,"items":[{"src":"http:\/\/pmt9f7c4b.pic33.websiteonline.cn\/upload\/RCmx5.jpg","url":""},{"src":"http:\/\/pmt9f7c4b.pic33.websiteonline.cn\/upload\/RCrqpk.jpg","url":""},{"src":"http:\/\/pmt9f7c4b.pic33.websiteonline.cn\/upload\/RCnv200.jpg","url":"#"}],"autoplay":true,"interval":1800,"indicator-dots":true,"indicator-color":"rgba(0, 0, 0, .3)","indicator-active-color":"#000","height":115}},"layer2A0819494465FFE535217DD9EB4687DA":{"id":"layer2A0819494465FFE535217DD9EB4687DA","pid":"1","father_id":"","type":"product_list","left":0,"top":0,"width":100,"height":"auto","zindex":2,"pageid":"1","globalstyle":{"background-image":"none","background-color":"transparent","background-repeat":"repeat","background-position":"top left","border-color":"transparent","border-style":"none","border-width":0,"border-radius":0},"childprop":{"data_source":{"type":"category","value":"All","limit":4},"linkto":"2","sortby":{"type":"default","value":"desc"},"display":{"title":true,"desc":true,"price":true,"market_price":true,"search":true},"search":{"color":"#88bd79"},"title":{"color":"#313131","font-size":12,"font-weight":"normal","font-style":"normal","line-height":20,"text-decoration":"none","text-align":"left","margin-top":0},"price":{"color":"#88bd79","font-size":12,"font-weight":"normal","font-style":"normal","line-height":20,"text-decoration":"none","text-align":"left","margin-top":0},"market_price":{"color":"#666560","font-size":12,"font-weight":"normal","font-style":"normal","line-height":20,"text-decoration":"line-through","text-align":"left","margin-top":0},"li_box":{"margin-bottom":5,"margin-right":0,"border-color":"#dddee1","border-style":"solid","border-width":1},"thumb":{"height":110},"desc":{"margin-top":0}}}};
var pageconf={
  data: {
    plugins:plugins,
	pageid: 'page1/page1',
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


