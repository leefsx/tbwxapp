import wech from '../widget.js';

const buttonsConfig = {
  data: {
    // 组件私有数据
    param: {},
    styles: '',
    styles2: ''
  },
  events: {

  },
  methods: {
    parseStyle() {
      let config = this.data.param.style;
      let config2 = this.data.param.pstyle;
      for(var c in config){
        let nodestyle = "";
        let tmpobj = config[c] || '';
        if (typeof c == 'undefined' || tmpobj == '') continue;
        if (typeof tmpobj == 'number' && c != 'line-height')
          tmpobj = getApp().px2rpx(tmpobj);
        nodestyle += c + ": " + tmpobj + ";";
        if (nodestyle.length > 0 || nodestyle2.length > 0) {
          let oldobj = this.data.styles;
          oldobj += nodestyle;
          this.setData({ styles: oldobj })
        }
      }
      for (var s in config2){
        let nodestyle2 = "";
        let tmpobj = config2[s] || '';
        if (typeof s == 'undefined' || tmpobj == '') continue;
        if (typeof tmpobj == 'number' && s != 'line-height'){
          tmpobj = getApp().px2rpx(tmpobj);
        }
        nodestyle2 += s + ": " + tmpobj + ";";
        if (nodestyle2.length > 0) {
          let oldobj2 = this.data.styles2;
          oldobj2 += nodestyle2;
          this.setData({ styles2: oldobj2 })
        }
      }
    }
  },
  onLoad(option) {
    this.parseStyle()
  }
}

module.exports = wech(buttonsConfig)