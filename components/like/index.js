Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false   
    },
    count: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 9,
    star: 'images/like.png',
    nostar: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // ## 点赞状态改变
    onLike (event) {
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({ count: count, like: !like })
      // 激活事件
      let behavior = this.properties.like ? 'like' : 'cancel' 
      this.triggerEvent('changeLike', { behavior: behavior, type: 100, art_id: this.fn }, { bubbles: false })
    },
    fn () {
    }
  }
})
