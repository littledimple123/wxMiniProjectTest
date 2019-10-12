// const app = getApp();
Page({
  data: {
    list: []
  },
  onLoad: function() {
    this.refreshScroll = this.selectComponent('#refreshScroll');
    for (let i = 0; i < 100; i++) {
      this.data.list.push(i);
    }
    this.setData({
      list: this.data.list
    });
  },
  onPageScroll(e) {
    this.refreshScroll.onPageScroll(e);
  },
  onReachBottom() {
    wx.showLoading({
      title: '加载中。。。'
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 1000);
  },
  refresh: function(e) {
    setTimeout(() => {
      this.refreshScroll.stopRefresh();
    }, 1000);
  }
})
