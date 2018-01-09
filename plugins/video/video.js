import wech from '../widget.js';
const videoConfig={
    data: {
        // 组件私有数据
        param: {}
    },
    events: {
        // 私有模版事件响应
    },
    methods: {
      parseStyle() {
        let config = this.data.param;
        ['width', 'height', 'margin-top', 'margin-left'].forEach((c) => {
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
    }
}

module.exports = wech(videoConfig);