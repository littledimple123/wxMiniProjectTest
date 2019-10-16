function testPhoneNumber(val) {
  return val.match(
    /((((13[0-9])|(15[^4])|(18[0,1,2,3,5-9])|(17[0-8])|(147))\d{8})|((\d3,4|\d{3,4}-|\s)?\d{7,14}))?/g
  );
}
var content;
import detail from '../../../api/orderRequest';
Page({
  data: {
    text: '',
    phoneNumber: [],
    tempFilePaths: [],
    items: [],
    startX: 0, //开始坐标
    startY: 0
  },
  onLoad: function() {
    for (var i = 0; i < 10; i++) {
      this.data.items.push({
        content:
          i +
          ' 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦',

        isTouchMove: false //默认隐藏删除
      });
    }
    this.setData({
      text: 'test内容022-11111111,test内容13100002222,test内容400-88888888',
      items: this.data.items
    });
  },
  upload() {
    let that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        });
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          tempFilePaths: tempFilePaths
        });
        // 上传完成后把文件上传到服务器
        wx.uploadFile({
          url: '',
          filePath: ''
        });
      }
    });
  },
  callPhone(e) {
    // console.log(e.target.dataset.text);
    content = this.data.text;
    const phoneArr = [];
    const phoneList = testPhoneNumber(content);
    // console.log(phoneList);
    for (let item of phoneList) {
      if (item !== '') {
        // console.log(item);
        phoneArr.push(item);
      }
    }
    // console.log(phoneArr.length);
    if (phoneArr.length === 1) {
      wx.makePhoneCall({
        phoneNumber: phoneArr[0],
        success: function() {
          console.log('成功');
        },
        fail: function() {
          console.log('失败');
        }
      });
    } else {
      if (phoneArr.length != 0) {
        this.setData({
          phoneNumber: phoneArr,
          block: true
        });
      }
    }
  },
  hide_bg() {
    this.setData({
      block: false
    });
  },
  list_item(e) {
    // console.log(e.target.id);
    var list_item_phone = this.data.phoneNumber[e.target.id];
    wx.makePhoneCall({
      phoneNumber: list_item_phone
    });
    this.setData({
      block: false
    });
  },
  scanCode() {
    var that = this;
    wx.scanCode({
      //扫描API
      success(res) {
        //扫描成功
        console.log(res); //输出回调信息
        // that.setData({
        //   scanCodeMsg: res.result
        // });
        wx.showToast({
          title: '成功',
          duration: 1000
        });
      }
    });
  },
  //开始触摸时 重置所有删除
  touchstart(e) {
    // console.log(e);
    this.data.items.forEach((v, i) => {
      if (v.isTouchMove) {
        v.isTouchMove = false;
      }
    });
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    });
  },
  // 滑动事件
  touchmove(e) {
    // console.log(e)
    // debugger;
    var index = e.currentTarget.dataset.index, //当前索引
      startX = this.data.startX, //开始X坐标
      startY = this.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      angle = this.angle(
        { X: startX, Y: startY },
        { X: touchMoveX, Y: touchMoveY }
      );

    this.data.items.forEach((v, i) => {
      v.isTouchMove = false;
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i === index) {
        if (touchMoveX > startX) {
          //右滑
          v.isTouchMove = false;
        } else {
          //左滑
          v.isTouchMove = true;
        }
      }
    });
    this.setData({
      items: this.data.items
    });
  },
  angle(start, end) {
    // debugger;
    var _X = end.X - start.X,
      _Y = end.Y - start.Y;
    //返回角度 /Math.atan()返回数字的反正切值
    return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
  },
  del(e) {
    this.data.items.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      items: this.data.items
    });
  }
});
