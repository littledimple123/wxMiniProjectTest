var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    array: [
      {
        id: 0,
        key: '北京',
      },
      {
        id: 1,
        key: '天津',
      },
    ],
    index: 0,
    multiArray: [
      [2018, 2019, 2020, 2021],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    ],
    multiIndex: [0, 0],
    date: '',
    switchChecked: false,
    startYear: 1970,
    endYear: 2100,
    dateTime1: null, // 当前年，月，日，时，分，秒  在dateTimeArray1中的下标
    dateTimeArray1: null,
  },
  onLoad: function () {
    var that = this;
    /**
     * 获取当前设备的宽高
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      },
    });
    var data = new Date();
    var Y = data.getFullYear();
    var M =
      data.getMonth() + 1 < 10
        ? '0' + (data.getMonth() + 1)
        : data.getMonth() + 1;

    var D = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    this.setData({
      date: Y + '-' + M + '-' + D,
    });
    // 下拉框中获取完整的年月日 时分秒，以及默认显示的数组
    var obj1 = dateTimePicker.dateTimePicker(
      this.data.startYear,
      this.data.endYear
    );
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
    });
    
  },
  //  tab切换逻辑
  swichNav: function (e) {
    // console.log(e)
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      });
    }
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  jump: function (e) {
    // console.log(e)
    wx.navigateTo({
      url: './ordersDetail/ordersDetail',
    });
  },
  // 单列选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e);
    this.setData({
      index: e.detail.value,
    });
  },
  // 多列选择器
  // select改变
  bindMultiPickerChange: function (e) {
    // console.log(e);
    this.setData({
      multiIndex: e.detail.value,
    });
  },
  // 日期
  bindDateChange: function (e) {
    // console.log(e);
    this.setData({
      date: e.detail.value,
    });
  },
  switchChange(e) {
    console.log(e);
  },
  // 日期时间选择器(精确到分) 下拉弹框的确定按钮
  changeDateTime1(e) {
    console.log('日期选择', e);
    this.setData({
      dateTime1: e.detail.value,
    });
  },
  dingwei() {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log(res);
        wx.chooseLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          success: (lb) => {
            console.log('lb', lb);
          },
        });
      },
    });
  },
  // 两个经纬度之间的距离
  juli (lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s
  },
  //转发
  onShareAppMessage() {},
});
