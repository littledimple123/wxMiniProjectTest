const baseUrl = 'http://192.168.2.131:7080';
const http = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + params.url,
      data: params.data,
      header: params.header,
      method: params.method ,
      dataType: params.dataType,
      responseType: params.responseType,
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          errorToast()
        }
      },
      fail: function (e) {
        errorToast()
        reject(e)
      }
    });
  });
};
module.exports = {
  http:http
}