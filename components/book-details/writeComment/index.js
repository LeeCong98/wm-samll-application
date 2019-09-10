import bookDetails from './../behavior/details-bev.js'
import { detailBehavior } from './../behavior/details-bev.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comments: {
      type: Array,
      value: []
    }
  },
  externalClasses: ['import-class'],
  behaviors: [detailBehavior],
  /**
   * 组件的初始数据
   */
  data: {
    typingVal: '',
    highIndex: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getTyping (event) {
      this.setData({
        typingVal: event.detail.value
      })
    },
    closeSill (event) {
      let type = event.detail.x > 100 ? 'confirm' : 'close'
      let value = this.data.typingVal.trim()
      if (type === 'confirm') {
        if (value.length < 1) return wx.showToast({
          title: '请输入评论文本',
          icon: 'none'
        })
        // 评论并先更新客户端数据，防止更新延迟
        this.triggerEvent('closewritesill', { type, value }, { bubbles: false, composed: true })
        this.triggerEvent('updateData')
      } else {
        this.triggerEvent('closewritesill', { type }, { bubbles: false, composed: true })
      }
      
      return this.setData({
        typingVal: '',
        highIndex: null
      })
    },
    selectHot (event) {
      this.setData({
        typingVal: this.properties.comments[event.offset].content,
        highIndex: event.offset
      })
    }
  }
})
