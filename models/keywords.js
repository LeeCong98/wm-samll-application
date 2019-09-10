import { HTTP } from './../util/http-p.js'
// 需要限制数据长度
class KeyWordsModel extends HTTP {
  maxlength = 10
  setHistory(data, type = 'historysKey') {
    var historys = this.getHistorys()
    const exist = historys.indexOf(data)
    if (exist !== -1) {
      historys.splice(exist, 1) 
    } 
    historys.length === this.maxlength ? historys.pop() : null
    historys.unshift(data)
    wx.setStorageSync(type, historys)
  }
  getHistorys(type = 'historysKey') {
    const history = wx.getStorageSync(type)
    if (!history) return []
    return history
  }
  // hot热词来自
  setHotKey(type = "hotsKey") {
   
  }
  getHots(type = "hotsKey") {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  search({ q, start = 0, count = 20,summary = 0, }) {
    return this.request({
      url: '/book/search',
      data: {
        q,
        start,
        count,
        summary
      }
    })
  }
}
export default KeyWordsModel