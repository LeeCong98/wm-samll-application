import { config } from './../config.js'

const noticeMessage = {
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: 'appkey开发者密钥无效',
  1006: '服务器内部错误',
  1007: '数据请求失败',
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  3000: '该期内容不存在',
  500: '网络出现异常'
}

class HTTP {
  request({url, data, method}) {
    return new Promise((resolved, reject) => {
      this._request(url, resolved, reject, data, method)
    })
  }
   _request(url, resolved, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      method: method || 'GET',
      data: data,
      header: {
        appkey: config.appkey
      },
      dataType:  'json',
      success: (rsp) => {
        let status = rsp.statusCode.toString()
        if (status.slice(0, 1) === '2') {
          resolved(rsp)
        } else {
          reject()
          this._show_error_info(rsp.data.error_code)
        }
      },
      fail: () => {
        reject()
        this._show_error_info(500)
      }
    })
  }
  _show_error_info(statusCode) {
    if (noticeMessage[statusCode]) {
      wx.showToast({
        title: noticeMessage[statusCode],
        duration: 1500,
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '抱歉，数据请求失败',
        duration: 1500,
        icon: 'none'
      })
    }
  }
}
export { HTTP }