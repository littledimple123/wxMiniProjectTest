import http from '../utils/http';

const url = {
  detail: '/disposal/organization-info/selectById'
};
module.exports = {
  detail(data) {
    return http.http({
      url: url.detail,
      data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post'
    });
  }
};
