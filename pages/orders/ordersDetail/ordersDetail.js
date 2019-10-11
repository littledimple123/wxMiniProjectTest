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
    phoneNumber: []
  },
  onLoad: function() {
    this.setData({
      text: 'test内容022-11111111,test内容13100002222,test内容400-88888888'
    });
    // const obj = {
    //   organizationId: '1177492780642078720'
    // };
    // console.log('1');
    // console.log(detail)
    // detail(obj).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  upload: function() {
    wx.chooseImage({
      success(res) {
        console.log(res);
        const tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            user: 'test'
          },
          success(res) {
            const data = res.data;
            console.log(data);
            //do something
          }
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
        console.log(item);
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
    console.log(e.target.id);
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
  }
});
