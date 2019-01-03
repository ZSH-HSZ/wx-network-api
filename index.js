let baseUrl = 'http://'

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];


export const [get, post, put, del, patch] = methods.map(action => {
  return (road, data, params) => {
    return request(road, data, action, params)
  }
})

const apis = {
  // road
  test: '/test/{id}'
}

const parseUrl = (url, params) => {
  return (
    url &&
    url.replace(/\{(\w+)\}/g, (m, n) => {
      return params[n];
    })
  )
}

const serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p) && obj[p]) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

const reqRoad = (road, data, method, params) => {
  if (method === 'GET' && params) {
    return baseUrl[path] + parseUrl(apis[road], data) + '?' + serialize(params)
  } else {
    return baseUrl[path] + parseUrl(apis[road], data)
  }
}

const request = function (road, data, action, params) {
  return new Promise((resolve, reject) => {
    console.log(road, data, action, params)
    wx.request({
      url: reqRoad(road, data, action, params),
      header: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: action !== 'GET' ? params : null,
      method: action, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        resolve(res.data)
      },
      fail: function (err) {
        reject(err)
        // fail
      },
      complete: function () {
        // complete
      }
    })
  })
}