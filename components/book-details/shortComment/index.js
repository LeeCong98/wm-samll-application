import { BookModel } from './../../../models/book.js'
import { detailBehavior} from './../behavior/details-bev.js'
const bookrq = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [detailBehavior],
  properties: {
    bookIntro: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: true,
    value: null,
    isWrite: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    writeContainer () {  
      this.setData({
        isWrite: true
      })
    },
    closeWriteSill (event) {
      if (event.detail.type === 'confirm') {
        bookrq.putComment({
          book_id: this.properties.bookIntro.book_id,
          content: event.detail.value
        })
      }
      this.setData({
        isWrite: false
      })
    },
    updateData (event) {
      this.triggerEvent('update')
    }
  },
  changeLike (event) {
    this.triggerEvent('changeLikeStatus', {}, { bubbles: false, composed: true })
  },

})
