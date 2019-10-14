Page({
  data: {
    lists: [
      {
        title: '标题一',
        content: '内容111111111'
      },
      {
        title: '标题二',
        content: '内容222222222'
      }
    ],
    selectedFlag: []
  },
  onLoad() {
    for (let i = 0; i < this.data.lists.length; i++) {
      this.data.selectedFlag.push(false);
    }
    wx.getUserInfo({
      success: function(res) {
        console.log(res.userInfo);
      }
    });
  },
  toggleList(e) {
    // console.log(e.target.id);
    let index = Number(e.target.id);
    // console.log(index);
    if (this.data.selectedFlag[index] === false) {
      this.data.selectedFlag[index] = true;
      // console.log(this.data.selectedFlag[index]);
    } else if (this.data.selectedFlag[index] === true) {
      this.data.selectedFlag[index] = false;
      // console.log(this.data.selectedFlag[index]);
    }
    this.setData({
      selectedFlag: this.data.selectedFlag
    });
    // console.log(this.data.selectedFlag);
  }
});
