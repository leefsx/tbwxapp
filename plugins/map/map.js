import wech from '../widget.js';
const mapConfig = {
  data: {
    // 组件私有数据
    param: {},
    styles: '',
    markers: [{
      iconPath: "/common/marker.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 25,
      height: 39
    }]
  },
  events: {
    // 私有模版事件响应
  },
  methods: {
    parseStyle() {
      let config = this.data.param;
      ['width', 'height', 'margin-top','margin-left'].forEach((c) => {
        let nodestyle = "";
        let tmpobj = config[c] || {};
        if (typeof tmpobj == 'number')
          tmpobj = getApp().px2rpx(tmpobj);
        nodestyle += c + ": " + tmpobj + ";";
        if (nodestyle.length > 0) {
          let oldobj = this.data.styles;
          oldobj += nodestyle;
          this.setData({ styles: oldobj })
        }
      })

    }
  },
  onLoad(option) {
    this.parseStyle()
    let markers = this.data.markers
    markers[0].latitude = this.data.param.latitude
    markers[0].longitude = this.data.param.longitude
    this.setData({
      markers: markers
    })
  }
}

module.exports = wech(mapConfig);