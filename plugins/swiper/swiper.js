import wech from '../widget.js';
const swiperConfig={
    data: {
        // 组件私有数据
        param: {}
    },
    events: {
        // 私有模版事件响应
		redirectTo (e){
			let lnkobj = {};
			lnkobj['param'] = {};lnkobj['type'] = 'page';
			lnkobj['param']['value'] = e.target.dataset.url;
			getApp().moduleBindTap(lnkobj)
		}
    }
}

module.exports = wech(swiperConfig);