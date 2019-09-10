import Like from '../../models/like.js'
let like = new Like()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    likeItem: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached () {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      let behavior = this.properties.likeItem.like_status === 1 ? 'like/cancel' : 'like' 
      like.changePro(behavior, this.properties.likeItem.type, this.properties.likeItem.id)
      this.setData({
        likeStatus: behavior === 'like' ? 1 : 0
      })
      if (behavior === 'like/cancel') {
        this.triggerEvent('removeItem')
      }
    }
  }
})
