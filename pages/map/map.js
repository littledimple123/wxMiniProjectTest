var EARTH_RADIUS = 6378.137; //地球半径

function rad(d) {
  return (d * Math.PI) / 180.0;
}
function getDistance(lng1, lat1, lng2, lat2) {
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lng1) - rad(lng2);
  var s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s; //返回数值单位：公里
}

Page({
  data: {
    markers: [
      {
        iconPath: '/img/homeActive.png',
        id: 0,
        latitude: 23.099994,
        longitude: 113.32452,
        width: 18,
        height: 15,
      },
    ],
    circles: [
      {
        latitude: '23.099994',
        longitude: '113.324520',
        color: '#7cb5ec88',
        fillColor: '#7cb5ec88',
        radius: 200,
        strokeWidth: 2,
      },
    ]
  },
  onLoad: function (options) {
    this.getCrlcle();
  },
  getCrlcle() {
    this.wxmap = wx.createMapContext('map');
    this.wxmap.getRegion({
      success: (res) => {
        console.log(res, 'get');
        let lng1 = res.northeast.longitude;
        let lat1 = res.northeast.latitude;
        let lng2 = res.southwest.longitude;
        let lat2 = res.southwest.latitude;

        let longitude = lng1 - lng2;
        let latitude = lat1 - lat2;
        let flag = longitude > latitude ? true : false;
        let radius = 0;
        //计算得到短边，然后再通过*1000转变为m，除2得到半径，*0.8优化显示，让圈圈只占界面的80%
        if (flag) {
          radius = ((getDistance(lng1, lat1, lng1, lat2) * 1000) / 2) * 0.5;
        } else {
          radius = ((getDistance(lng1, lat1, lng2, lat1) * 1000) / 2) * 0.5;
        }
        this.setData({
          'circles[0].radius': radius,
        });
      },
    });
  },
  getCenterLocation() {
    this.wxmap = wx.createMapContext('map');
    var that = this;
    this.wxmap.getCenterLocation({
      success(res) {
        console.log(res.longitude);
        console.log(res.latitude);
        that.getCrlcle();
        that.setData({
          'circles[0].longitude': res.longitude,
          'circles[0].latitude': res.latitude,
        });
      },
    });
  },
  regionchange(e) {
    console.log(e.type);
    this.getCenterLocation();
  },
  markertap(e) {
    console.log(e.markerId);
    console.log(e);
  },
  controltap(e) {
    console.log(e.controlId);
  },
});
