// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 0,
      observer (newVal, oldVal, changePath) {
        let useVal = newVal < 10 ? '0' + newVal : newVal 
        this.setData({
          _index: useVal
        })
      }
    }
  },
  // 事件过滤
  attached () {
    let time = new Date()
    let year = time.getFullYear()
    let monthIndex = time.getMonth()
    this.setData({
      year: year,
      month: this.data.months[monthIndex]
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    year: '',
    month: '',
    _index: '',
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _timeFilter () {
      
    }
  }
})
