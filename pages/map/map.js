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

// 百度地图经纬度转换腾讯地图经纬度
function bMapTransqqMap(lng, lat) {
  let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  let x = lng - 0.0065;
  let y = lat - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  let lngs = z * Math.cos(theta);
  let lats = z * Math.sin(theta);
  return {
    longitude: lngs,
    latitude: lats,
  };
}

Page({
  data: {
    // 中心点的经纬度
    lng: 117.193909,
    lat: 39.086370,
    markers: [
      {
        iconPath: '/img/homeActive.png',
        id: 0,
        latitude: 39.08637,
        longitude: 117.193909,
        width: 18,
        height: 15,
      },
    ],
    circles: [
      {
        latitude: 39.08637,
        longitude: 117.193909,
        color: '#7cb5ec88',
        fillColor: '#7cb5ec88',
        radius: 800,
        strokeWidth: 2,
      },
    ],
  },
  onLoad: function (options) {
    this.getCrlcle();
    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        var latitude = res.latitude;
        var longitude = res.longitude;
        this.setData({
          latitude: latitude,
          longitude: longitude,
        });
        // console.log(latitude + '纬度');
        // console.log(longitude + '精度');
      },
    });
  },
  getCrlcle() {
    this.wxmap = wx.createMapContext('map');
    // 调取后台接口返回中心点的经纬度和半径，转化为腾旭地图的经纬度
    var lng = 117.125869;
    var lat = 39.11867;
    var obj = bMapTransqqMap(lng, lat);
    console.log(obj)
    this.wxmap.translateMarker({
      destination: {//新的坐标值
          latitude: obj.latitude,
          longitude: obj.longitude
      }
    })
  },
  // getCenterLocation() {
  //   this.wxmap = wx.createMapContext('map');
  //   var that = this;
  //   this.wxmap.getCenterLocation({
  //     success(res) {
  //       console.log(res.longitude);
  //       console.log(res.latitude);
  //       that.getCrlcle();
  //       that.setData({
  //         'circles[0].longitude': res.longitude,
  //         'circles[0].latitude': res.latitude,
  //       });
  //     },
  //   });
  // },
  // regionchange(e) {
  //   console.log(e.type);
  //   this.getCenterLocation();
  // },
  markertap(e) {
    console.log(e.markerId);
    console.log(e);
  },
});
