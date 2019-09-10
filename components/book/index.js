import LikeModel from './../../models/like.js'
var likeRequest = new LikeModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bookItem: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap () {
      const bookId = this.properties.bookItem.id
      this.triggerEvent('toBookDetail', { bookId: bookId }, { })
    },
    likeBook (event) {
      var id = event.currentTarget.dataset['id']
      if (id) {
        likeRequest.changePro('like', 400, id)
      }
    }
  }
})
