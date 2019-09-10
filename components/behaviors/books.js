import KeyWordsModel from './../../models/keywords.js'
var keyModel = new KeyWordsModel()
var books = Behavior({
  data: {

  },
  properties: {
    
  },
  methods: {
    // 取消搜索
    onCancel() {
      this.triggerEvent('checkSeek', { type: 'cancel' })
    },
    // 数据复用
    repeatResult(value) {
      // 需要验证是否是进行组价第一个请求;
      if (!this.data.first && value === this.data.historys[0]) {
        this.searchStart(value)
        this.data.searchList.length === 0 ? this.showPrompt('搜索结果为空') : null
        return true
      } else {
        // 不是重复内容之后清除上次的内容
        this.setData({
          searchList: []
        })
        return false
      }
    },
    // 启用搜索模式
    searchStart(value) {
      this.setData({
        finished: true,
        query: value
      })
    },
    load_books(value, type) {
      if (type) var params =  this.isRepeatRequest(value)
      this.confirmLoad()
      keyModel.search(params ? params : {
        q: value
      })
        .then(rsp => {
          if (rsp.data.books.length !== 0) {
            if (type) {
              rsp.data.books.unshift(...this.data.searchList)
            }
            this.updateData(rsp)
          } else {
            this.showPrompt('结果为空')
          }
          wx.hideLoading()
        }, error => wx.hideLoading())
    },
    updateData (rsp ) {
      this.setData({
        searchList: rsp.data.books,
        first: false,
        total: rsp.data.total
      })
    },
     // 确认加载
    confirmLoad () { 
      wx.showLoading({
        title: '正在加载!',
        mask: true
      })
    },
    // 设置提示
    showPrompt (text) {
      wx.showToast({
        title: text,
        icon: 'none'
      })
    },
    // 是否为续载还是首次加载
    isRepeatRequest (value) {
      if (this.isFlow()) {
        return this.showPrompt('没有更多内容')
      }
      var params = {
        q: value,
        start: this.data.pageSize * this.data.count
      }
      return params
    },
    // 返回搜索列表
    backSearchBar() {
      this.setData({
        finished: false,
        historys: keyModel.getHistorys(),
        query: '',
        pageSize: 0
      })
    },
    isFlow(pageSize) {
      return (this.data.pageSize + 1) * this.data.count - this.data.total >= 20 ? true : false
    }
  }
})

export { books }