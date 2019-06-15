import  HTTP  from '../util/http.js'
class classicModel extends HTTP {
  constructor() {
    super()
  }

  getLatest (success) {
    this.request({
      url: 'classic/latest',
      success: (rsp) => {
        this._setLatestIndex(rsp.data.index)
        // ## 最新一期缓存
        if (!wx.getStorageSync(this._getKey(rsp.data.index))) {
          wx.setStorageSync(this._getKey(rsp.data.index), rsp.data)
        }
        success && success(rsp)
      }
    })
  }

  // 上一期的数据
  getPreviousOrNext (callback, index, nextOrPrvious) {
    // ## 确认缓存数据，并进行数据复用
    let key = nextOrPrvious === '/next' ? 
      this._getKey(index + 1) : this._getKey(index - 1)
    let classicData = wx.getStorageSync(key)

    // ## 确认缓存不存在，进行数据请求
    if (!classicData) {
      this.request({
        url: 'classic/' + index + nextOrPrvious,
        success: (rsp) => {
          // ##数据缓存
          wx.setStorageSync(this._getKey(rsp.data.index), rsp.data)
          callback && callback(rsp.data)
        }
      })
    } else {
      callback(classicData)
    }
    
  } 

  // 判断是否为第一期
  isFirst (index) { 
    return index === 1 ? true : false
  }

  // 判断是否为最新一期
  isLatest (index) { 
    let latest = this._getLatestIndex()
    return index === 8 ? true : false
  }

  // 设置最新一期的期刊index
  _setLatestIndex (index) {
    wx.setStorageSync('latest', index)
  }

  // 获取最新一期的期刊的index
  _getLatestIndex () {
    let index = wx.getStorageSync('latest')
    return index
  }

  // 获取缓存key 
  _getKey (index) {
    let key = 'classic-' + index
    return key
  }
}

export default classicModel