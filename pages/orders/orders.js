Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    array: [
      {
        id: 0,
        key: '北京'
      },
      {
        id: 1,
        key: '天津'
      }
    ],
    index: 0,
    multiArray: [
      [2018, 2019, 2020, 2021],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    ],
    multiIndex: [0, 0],
    date: '',
    switchChecked: false
  },
  onLoad: function() {
    var that = this;
    /**
     * 获取当前设备的宽高
     */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    var data = new Date();
    var Y = data.getFullYear();
    var M =
      data.getMonth() + 1 < 10
        ? '0' + (data.getMonth() + 1)
        : data.getMonth() + 1;

    var D = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    this.setData({
      date: Y + '-' + M + '-' + D
    });
  },
  //  tab切换逻辑
  swichNav: function(e) {
    // console.log(e)
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
    }
  },
  bindChange: function(e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  jump: function(e) {
    // console.log(e)
    wx.navigateTo({
      url: './ordersDetail/ordersDetail'
    });
  },
  // 单列选择器
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e);
    this.setData({
      index: e.detail.value
    });
  },
  // 多列选择器
  // select改变
  bindMultiPickerChange: function(e) {
    // console.log(e);
    this.setData({
      multiIndex: e.detail.value
    });
  },
  // 日期
  bindDateChange: function(e) {
    // console.log(e);
    this.setData({
      date: e.detail.value
    });
  },
  switchChange(e) {
    console.log(e);
  },
  bindRegionChange (e) {
    console.log(e)
  }
});
