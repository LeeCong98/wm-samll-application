import KeyWordsModel from './../../models/keywords.js'
import { books as booksBehavior } from './../behaviors/books.js'
var keyModel = new KeyWordsModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      observer (value) {
        if (!this.data.first) {
          this.setData({
            pageSize: this.data.pageSize + 1
          })
          this.load_books(this.data.query, 'more')
        }
      },
      type: Number
    }
  },
  behaviors: [booksBehavior],
  /**
   * 组件的初始数据
   */
  data: {
    historys: [],
    hots: [],
    searchList: [],
    finished: false,
    query: '',
    pageSize: 0,
    count: 20,
    first: true,
    total: 0
  },
  attached () {
    var historys = keyModel.getHistorys()
    keyModel.getHots()
      .then((rsp) => {
        if (rsp.data.hot.length !== undefined && historys.length !== undefined) {
          this.setData({
            historys: historys,
            hots: rsp.data.hot
          })
        }
      })
  },
  deattached () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm (event, type) {
      var value = type ? event.currentTarget.dataset['key'] : event.detail.value
      // 是否属于重复搜索
      if (this.repeatResult(value)) {
        return 
      }
      // 清键入空白并判断是否启用搜索
      if (typeof value === 'string' && value.trim() !== "") {
        this.searchStart(value)
        keyModel.setHistory(value.trim())
        this.load_books(value)
      } else {
        this.showTPrompt('请填写搜索内容')
      }
    },
    tapHistoryKeyword (event) {
      this.onConfirm(event, true)
    },
    tapHotKeyword (event) {
      this.onConfirm(event, true)
    },
    toDetail (event) {
      var id = event.currentTarget.dataset['id']
      if (id) {
        wx.navigateTo({
          url: '/pages/book-detail/index?id=' + id
        })
      } else {
        this.showPrompt('系统出了点问题，尝试刷新下!')
      }
    }
  }
})
